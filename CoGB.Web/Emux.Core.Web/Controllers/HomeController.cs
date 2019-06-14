using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Emux.Core.Web.Models;
//using Emux.NAudio;
//using NAudio.Wave;

namespace Emux.Core.Web.Controllers
{
    public class HomeController : Controller/*, IVideoOutput*/
    {
        //private readonly IHubContext<GameHub> _hubContext;
        //private Game _game;
        //private Timer _timer;
        //private byte[] _latest;

        //public HomeController(IHubContext<GameHub> hubContext, Game game)
        //{
        //    _hubContext = hubContext;
        //    _game = game;

        //    //24 fps
        //    //1000 ms / 24 frames = 41 ms
        //    _timer = new Timer(164);
        //    _timer.Elapsed += RefreshCanvas;
        //    _timer.AutoReset = true;
        //    _timer.Enabled = true;
        //}

        //private void RefreshCanvas(object sender, ElapsedEventArgs e)
        //{
        //    if (_latest == null) return;

        //    int[] temp = new int[160*144*3];
        //    for (int i = 0; i < _latest.Length; i++)
        //    {
        //        temp[i] = _latest[i];
        //    }
        //    _hubContext.Clients.All.SendAsync("SetData", temp);
        //}

        public IActionResult Index()
        {
            //Task.Run(async () => {
            //    await Task.Delay(2000);
            //    _game.SetVideoOutput(this);
            //});
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        //public void RenderFrame(byte[] pixelData)
        //{
        //    //var rawData = new byte[160 * 144 * sizeof(int)];

        //    //for (int i = 0, j = 0; j < pixelData.Length; i += 4, j += 3)
        //    //{
        //    //    rawData[i] = pixelData[j];
        //    //    rawData[i + 1] = pixelData[j + 1];
        //    //    rawData[i + 2] = pixelData[j + 2];
        //    //    rawData[i + 3] = 1;
        //    //}
        //    //int[] test = new int[rawData.Length];
        //    //for (int i = 0; i < rawData.Length; i++)
        //    //{
        //    //    test[i] = (int)rawData[i];
        //    //}

        //    _latest = pixelData;
        //}
    }
}
