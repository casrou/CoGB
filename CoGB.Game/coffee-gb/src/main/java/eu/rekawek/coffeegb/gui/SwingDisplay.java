package eu.rekawek.coffeegb.gui;

import com.microsoft.signalr.HubConnection;
import com.microsoft.signalr.HubConnectionBuilder;
import eu.rekawek.coffeegb.gpu.Display;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.concurrent.atomic.AtomicBoolean;

public class SwingDisplay extends JPanel implements Display, Runnable {

    public static final int DISPLAY_WIDTH = 160;

    public static final int DISPLAY_HEIGHT = 144;

    //private final BufferedImage img;

    public static final int[] COLORS = new int[]{0xe6f8da, 0x99c886, 0x437969, 0x051f2a};

    //private final int[] rgb;
    private final byte[] srgb;

    //private boolean enabled;

    //private int scale;

    private boolean doStop;

    private boolean doRefresh;

    private int i;

    private HubConnection hubConnection;

    public SwingDisplay(int scale, HubConnection hubConnection) {
        super();

        this.hubConnection = hubConnection;
        /*GraphicsConfiguration gfxConfig = GraphicsEnvironment.
                getLocalGraphicsEnvironment().getDefaultScreenDevice().
                getDefaultConfiguration();
        img = gfxConfig.createCompatibleImage(DISPLAY_WIDTH, DISPLAY_HEIGHT);*/
        //rgb = new int[DISPLAY_WIDTH * DISPLAY_HEIGHT];
        srgb = new byte[DISPLAY_WIDTH * DISPLAY_HEIGHT/2];
        //this.scale = scale;
    }

    @Override
    public void putDmgPixel(int color) {

        byte bcolor;
        if(i > srgb.length){
            bcolor = (byte) color;
        } else {
            bcolor = makeDoublePixelByte(color);
        }

        srgb[i] = bcolor;
        i++;

        //srgb[i++] = (byte)color;
        //rgb[i++] = COLORS[color];



        //hubConnection.send("SetPixel", i, color);
        i = i % srgb.length;
    }

    private byte makeDoublePixelByte(int color){
        int newByte = (srgb[i] << 4) | color;
        return (byte) newByte;
    }

    @Override
    public void putColorPixel(int gbcRgb) {
        //rgb[i++] = translateGbcRgb(gbcRgb);
    }

    public static int translateGbcRgb(int gbcRgb) {
        int r = (gbcRgb >> 0) & 0x1f;
        int g = (gbcRgb >> 5) & 0x1f;
        int b = (gbcRgb >> 10) & 0x1f;
        int result = (r * 8) << 16;
        result |= (g * 8) << 8;
        result |= (b * 8) << 0;
        return result;
    }

    @Override
    public synchronized void requestRefresh() {
        doRefresh = true;

        hubConnection.send("SetData", srgb);
        //notifyAll();
    }

    @Override
    public synchronized void waitForRefresh() {
        while (doRefresh) {
            try {
                wait(1);
            } catch (InterruptedException e) {
                break;
            }
        }
    }

    @Override
    public void enableLcd() {
        //enabled = true;
    }

    @Override
    public void disableLcd() {
        //enabled = false;
    }

    @Override
    protected void paintComponent(Graphics g) {
        /*super.paintComponent(g);

        Graphics2D g2d = (Graphics2D) g.create();
        if (enabled) {
            //g2d.drawImage(img, 0, 0, DISPLAY_WIDTH * scale, DISPLAY_HEIGHT * scale, null);
        } else {
            g2d.setColor(new Color(COLORS[0]));
            g2d.drawRect(0, 0, DISPLAY_WIDTH * scale, DISPLAY_HEIGHT * scale);
        }
        g2d.dispose();*/
    }

    @Override
    public void run() {
        doStop = false;
        doRefresh = false;
        //enabled = true;
        while (!doStop) {
            synchronized (this) {
                try {
                    wait(1);
                } catch (InterruptedException e) {
                    break;
                }
            }

            if (doRefresh) {
                //img.setRGB(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT, rgb, 0, DISPLAY_WIDTH);
                //validate();
                //repaint();

                synchronized (this) {
                    i = 0;
                    doRefresh = false;
                    //notifyAll();
                }
            }
        }
    }

    public void stop() {
        doStop = true;
    }
}