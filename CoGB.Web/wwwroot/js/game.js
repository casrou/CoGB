"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/hubGame").build();

var fps = 12;
var ready = true;

connection.start().then(function () {
    beginRefresh();
}).catch(function (err) {
    return console.error(err.toString());
});

function beginRefresh() {
    if (ready) {
        connection.invoke("GetData");
        ready = false;
    }
    setTimeout(function () {
        beginRefresh();
    }, FPSToMilliseconds(fps));
}

function FPSToMilliseconds(fps) {
    return Math.floor(1000 / fps);
}

const canvas = document.getElementById('gameCanvas');
canvas.width = 160;
canvas.height = 144;
const ctx = canvas.getContext('2d', { alpha: false });

//const buttons = document.getElementById('buttons');
const gameboy = document.getElementById('gameboy');

//gameboy.style.height = window.innerHeight - 20 + 'px';
//gameboy.style.top = 10 + 'px';
//gameboy.style.width = window.innerWidth - 20 + 'px';
//gameboy.style.left = 10 + 'px';

var scaleX = (gameboy.clientWidth - 60) / canvas.clientWidth;

var scaleToFit = Math.min(scaleX, 3);
//var scaleCustom = 3;

//canvas.style.transformOrigin = '50% 0'; //scale from top left
canvas.style.transform = 'scale(' + scaleToFit + ') ';

//buttons.style.marginTop = 80 * scaleY + 'px';
buttons.style.top = 40 /* canvas margin top */ + 100 /* custom */ + scaleToFit * canvas.clientHeight + 'px';

gameboy.style.height = 40 /* canvas margin top */ + 100 /* custom */ + scaleToFit * canvas.clientHeight + buttons.clientHeight + 50 /* custom */ + 'px';

//buttons.style.position = 'absolute';
//buttons.style.top = canvas.width * scaleCustom + 'px';
//buttons.style.marginLeft = (canvas.width / 2) - (buttons.style.width) + 'px';

//gameboy.style.width = canvas.width * scaleCustom + 'px';
//gameboy.style.height = canvas.height * scaleCustom + buttons.style.height + 'px';

var latest = [];
//var notskip = 0;

//setInterval(function () {
//    console.log(notskip);
//}, 2000);

connection.on("SetData", function (data) {
    var i;
    var j;

    for (i = 0; i < 144; i++) {
        for (j = 0; j < 160; j++) {
            var color = data[i * 160 + j];
            if (latest && latest[i * 160 + j] === color) continue;
            switch (color) {
                case 0:
                    ctx.fillStyle = "#e6f8da";
                    break;
                case 1:
                    ctx.fillStyle = "#99c886";
                    break;
                case 2:
                    ctx.fillStyle = "#99c886";
                    break;
                case 3:
                    ctx.fillStyle = "#051f2a";
                    break;
                default:
                    ctx.fillStyle = "#e051f2a";
                    break;
            }
            
            ctx.fillRect(j, i, 1, 1);
            //notskip++;
        }
    }

    latest = data;
    ready = true;
});

// Button navigation

document.querySelectorAll(".btnGame").forEach(function (element) {
    element.onmousedown = pressButton;
    element.onmouseup = releaseButton;
    element.onmouseleave = releaseButton;

    element.ontouchstart = pressButton;
    element.ontouchend = releaseButton;
});

function pressButton(event) {
    var button = buttonNumberFromId(event.target.id);
    if (button === 99) return;
    connection.invoke("KeyPressed", button).catch(function (err) {
        return console.error(err.toString());
    });
    //event.preventDefault();
}

function releaseButton(event) {
    var button = buttonNumberFromId(event.target.id);
    if (button === 99) return;
    connection.invoke("KeyReleased", button).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
}

function buttonNumberFromId(id) {
    var button = 0;
    switch (id) {
        case "btnUp":
            button = 0;
            break;
        case "btnRight":
            button = 1;
            break;
        case "btnDown":
            button = 2;
            break;
        case "btnLeft":
            button = 3;
            break;
        case "btnA":
            button = 4;
            break;
        case "btnB":
            button = 5;
            break;
        case "btnStart":
            button = 6;
            break;
        case "btnSelect":
            button = 7;
            break;
        default:
            button = 99;
            break;
    }
    return button;
}

// Keyboard navigation

document.onkeydown = function (event) {
    var button = buttonNumberFromKey(event.code);
    if (button === 99) return;
    pressKey(button);
};

document.onkeyup = function (event) {
    var button = buttonNumberFromKey(event.code);
    if (button === 99) return;
    releaseKey(button);
};

function pressKey(button) {
    connection.invoke("KeyPressed", button).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
}

function releaseKey(button) {
    connection.invoke("KeyReleased", button).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
}

function buttonNumberFromKey(key) {
    var button = 0;
    switch (key) {
        case "KeyW":
        case "ArrowUp":
            button = buttonNumberFromId("btnUp");
            break;
        case "KeyD":
        case "ArrowRight":
            button = buttonNumberFromId("btnRight");
            break;
        case "KeyS":
        case "ArrowDown":
            button = buttonNumberFromId("btnDown");
            break;
        case "KeyA":
        case "ArrowLeft":
            button = buttonNumberFromId("btnLeft");
            break;
        case "KeyX":
        case "Period":
            button = buttonNumberFromId("btnA");
            break;
        case "KeyZ":
        case "Comma":
            button = buttonNumberFromId("btnB");
            break;
        case "Enter":
            button = buttonNumberFromId("btnStart");
            break;
        case "Backspace":
            button = buttonNumberFromId("btnSelect");
            break;
        default:
            button = 99;
            break;
    }
    return button;
}

const btnFps = document.getElementById("btnFps"); 

btnFps.onclick = function (e) {
    switch (fps) {
        case 8:
            fps = 12;
            btnFps.value = "12";
            break;
        case 12:
            fps = 18;
            btnFps.value = "18";
            break;
        case 18:
            fps = 24;
            btnFps.value = "24";
            break;
        case 24:
            fps = 30;
            btnFps.value = "30";
            break;
        case 30:
            fps = 48;
            btnFps.value = "48";
            break;
        case 48:
            fps = 60;
            btnFps.value = "60";
            break;
        case 60:
            fps = 8;
            btnFps.value = "8";
            break;
    }
};

//connection.on("SetFps", function () {
//    fps = 12;
//    btnFps.value = "12";
//});