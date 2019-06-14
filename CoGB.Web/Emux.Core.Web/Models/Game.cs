//using Emux.GameBoy.Cartridge;
//using Emux.GameBoy.Graphics;
//using Emux.MonoGame;
////using Emux.NAudio;
//using Microsoft.AspNetCore.Hosting;
////using NAudio.Wave;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Runtime.InteropServices;
//using System.Threading.Tasks;

//namespace Emux.Core.Web.Models
//{
//    public class Game
//    {
//        private GameBoy.GameBoy _device;
//        private EmuxHost _host;
//        private FileStream _saveFs;
//        private EmulatedCartridge _cartridge;
//        //private DirectSoundOut _player;
//        //private GameBoyNAudioMixer _mixer;
//        private string _webRootPath;

//        public Game(string webRootPath)
//        {
//            _webRootPath = webRootPath;
//            Task.Run(() => Start());
//        }

//        private void Start()
//        {
//            string romFile = Path.Combine(_webRootPath, "PokemonRed.gb");
//            string saveFile = Path.ChangeExtension(romFile, "sav");

//            Settings settings = new Settings()
//            {
                
//            };
//            _host = new EmuxHost(settings);
//            _saveFs = File.Open(saveFile, FileMode.OpenOrCreate);

//            _cartridge = new EmulatedCartridge(File.ReadAllBytes(romFile), new StreamedExternalMemory(_saveFs));
//            _device = new GameBoy.GameBoy(_cartridge, _host, false);
//            _host.GameBoy = _device;

//            //_mixer = new GameBoyNAudioMixer();
//            //_mixer.Connect(_device.Spu);
//            //_player = new DirectSoundOut();
//            //_player.Init(_mixer);
//            //_player.Play();

//            _host.Run();
//        }

//        public void SetVideoOutput(IVideoOutput videoOutput)
//        {
//            _device.Gpu.VideoOutput = videoOutput;
//        }
//    }
//}
