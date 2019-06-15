using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
//using Emux.NAudio;
//using NAudio.Wave;

namespace Emux.Core.Web.Hubs
{
    public class GameHub : Hub
    {
        private static string hostConnId;
        private static sbyte[] _latest = new sbyte[160*144];
        //private static int _stress = 0;

        public void Test(string test)
        {
            Console.WriteLine($"--- TEST: {test} ---");
        }

        // We use sbyte, because bytes in Java are signed
        public void SetData(sbyte[] data)
        {            
            //if (_stress > 8)
            //{
            //    Clients.AllExcept(hostConnId).SendAsync("SetFps");
            //}
            //_stress = 0;
            hostConnId = Context.ConnectionId;
            _latest = data;
        }

        public async Task GetData()
        {
            //_stress++;
            await Clients.Caller.SendAsync("SetData", _latest);
        }

        public async Task KeyPressed(int button)
        {
            if (hostConnId == null) return;
            await Clients.Client(hostConnId).SendAsync("KeyPressed", button);
        }

        public async Task KeyReleased(int button)
        {
            if (hostConnId == null) return;
            await Clients.Client(hostConnId).SendAsync("KeyReleased", button);
        }
    }
}
