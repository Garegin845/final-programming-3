var socket = io();
let side = 25;
let weather = "spring";


function setup() {
        frameRate(20);
        createCanvas(25 * side, 25 * side);
}

function paint(matrix) {
        for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[y].length; x++) {
                    var toBot = side - side * 0.3;
                    textSize(toBot);
                    if (matrix[y][x] == 1) {
                        if(weather == "spring"){
                            fill("green");
                            rect(x * side, y * side, side, side);
                            text('☘️', x * side, y * side + toBot);
                        }else if(weather == "summer"){
                            fill("yellow");
                            rect(x * side, y * side, side, side);
                            text('🌼', x * side, y * side + toBot);
                        }else if(weather == "winter"){
                            fill("#00BDFF");
                            rect(x * side, y * side, side, side);
                            text('❄️', x * side, y * side + toBot);
                        }else if(weather == "autumn"){
                            fill("#FFBF00");
                            rect(x * side, y * side, side, side);
                            text('🍁', x * side, y * side + toBot);
                        }
              
                    }
                    else if (matrix[y][x] == 2) {
                        if(weather == "spring"){
                            fill("yellow");
                            rect(x * side, y * side, side, side);
                            text('🍂', x * side, y * side + toBot);
                        }else if(weather == "summer"){
                            fill("BlanchedAlmond");
                            rect(x * side, y * side, side, side);
                            text('🥀', x * side, y * side + toBot);
                        }else if(weather == "winter"){
                            fill("RoyalBlue");
                            rect(x * side, y * side, side, side);
                            text('🌾', x * side, y * side + toBot);
                        }else if(weather == "autumn"){
                            fill("Brown");
                            rect(x * side, y * side, side, side);
                            text('🕸', x * side, y * side + toBot);
                        }
                    }
                    else if (matrix[y][x] == 3) {
                        if(weather == "spring"){
                            fill("red");
                            rect(x * side, y * side, side, side);
                            text('💥', x * side, y * side + toBot);
                        }else if(weather == "summer"){
                            fill("darkred");
                            rect(x * side, y * side, side, side);
                            text('🔥', x * side, y * side + toBot);
                        }else if(weather == "winter"){
                            fill("Crimson");
                            rect(x * side, y * side, side, side);
                            text('☄️', x * side, y * side + toBot);
                        }else if(weather == "autumn"){
                            fill("DarkKhaki");
                            rect(x * side, y * side, side, side);
                            text('⚡️', x * side, y * side + toBot);
                        }
                    }else if(matrix[y][x] == 4){
                        if(weather == "spring"){
                            fill("purple");
                            rect(x * side, y * side, side, side);
                            text('🍇', x * side, y * side + toBot);
                        }else if(weather == "summer"){
                            fill("DarkMagenta");
                            rect(x * side, y * side, side, side);
                            text('🌺', x * side, y * side + toBot);
                        }else if(weather == "winter"){
                            fill("DarkSlateBlue");
                            rect(x * side, y * side, side, side);
                            text('☂️', x * side, y * side + toBot);
                        }else if(weather == "autumn"){
                            fill("DeepPink");
                            rect(x * side, y * side, side, side);
                            text('👾', x * side, y * side + toBot);
                        }
                    }
                    else if(matrix[y][x] == 5){
                        if(weather == "spring"){
                            fill("aqua");
                            rect(x * side, y * side, side, side);
                            text('🌪', x * side, y * side + toBot);
                        }else if(weather == "summer"){
                            fill("LightBlue");
                            rect(x * side, y * side, side, side);
                            text('☁️', x * side, y * side + toBot);
                        }else if(weather == "winter"){
                            fill("LightCyan");
                            rect(x * side, y * side, side, side);
                            text('💨', x * side, y * side + toBot);
                        }else if(weather == "autumn"){
                            fill("LightSlateGrey");
                            rect(x * side, y * side, side, side);
                            text('🌧', x * side, y * side + toBot);
                        }
                    }
                    
                    else {
                        fill("Teal")
                        rect(x * side, y * side, side, side)
                    }
                }
            }
                

}

setInterval(
        function () {
        socket.on('send matrix', paint)
        },1000
    )

const summer = document.querySelector('#summerid');
const winter = document.querySelector('#winterid');
const spring = document.querySelector('#springid');
const autumn = document.querySelector('#autumnid');


summer.addEventListener('click', () => {
    weather = "summer";
    socket.emit('Summer')
});

winter.addEventListener('click', () => {
    weather = "winter";
    socket.emit('Winter')
});

spring.addEventListener('click', () => {
    weather = "spring";
    socket.emit('Spring')
});

autumn.addEventListener('click', () => {
    weather = "autumn";
    socket.emit('Autumn')
});

