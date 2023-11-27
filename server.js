let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let fs = require("fs");
const Grass = require('./grass');
const GrassEater = require('./grassEater');
const Predator = require('./predator');
const Tuyn = require('./tuyn');
const Hakatuyn = require('./hakatuyn');


app.use(express.static("../client"));

app.get('/', function (req, res) {
        res.redirect('index.html');
});
server.listen(3000, () => {
        console.log('connected');
});

function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, tuynCount, hakatuynCount) {
        let matrix = [];
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([]);
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0);
                }
        }
        //grass
        for (let i = 0; i < grassCount; i++) {
                let x = Math.floor(Math.random() * matrixSize);
                let y = Math.floor(Math.random() * matrixSize);
                matrix[y][x] = 1
        }

        //grasEater
        for (let i = 0; i < grassEaterCount; i++) {
                let x = Math.floor(Math.random() * matrixSize);
                let y = Math.floor(Math.random() * matrixSize);
                matrix[y][x] = 2
        }

        //predator
        for (let i = 0; i < predatorCount; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }

        //tuyn
        for (let i = 0; i < tuynCount; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }

        for (let i = 0; i < hakatuynCount; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }

        return matrix;
}

matrix = matrixGenerator(25, 70, 4, 2, 2, 8);

io.sockets.emit('send matrix', matrix)

grassArray = [];
grassEaterArr = [];
predatorArr = [];
tuynArr = [];
hakatuynArr = [];

function createObject(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[0].length; x++) {
                        //Grass
                        if (matrix[y][x] == 1) {
                                let gr = new Grass(x, y);
                                grassArray.push(gr);
                        }
                        //GrassEater
                        else if (matrix[y][x] == 2) {
                                let gre = new GrassEater(x, y);
                                grassEaterArr.push(gre);
                        }
                        //Preadator
                        else if (matrix[y][x] == 3) {
                                let pred = new Predator(x, y);
                                predatorArr.push(pred);
                        }
                        //tuyn
                        else if (matrix[y][x] == 4) {
                                let tu = new Tuyn(x, y);
                                tuynArr.push(tu);
                        }
                        //hakatuyn
                        else if (matrix[y][x] == 5) {
                                let ha = new Hakatuyn(x, y);
                                hakatuynArr.push(ha);
                        }
                }
        }

        io.sockets.emit('send matrix', matrix);

}


function game() {
        for (var i in grassArray) {
                grassArray[i].mul()
        }
        for (var i in grassEaterArr) {
                grassEaterArr[i].eat();
        }
        for (var i in predatorArr) {
                predatorArr[i].eat()
        }
        for (var i in tuynArr) {
                tuynArr[i].eat();
        }
        for (var i in hakatuynArr) {
                hakatuynArr[i].eat();
        }
        io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)

io.on('connection', function (socket) {
        createObject(matrix)

        socket.on('Summer',() =>{
                console.log('Summer========>>>>>>>');
        });
        socket.on('Winter',() => {
                console.log('Winter========>>>>>>>');
        });
        socket.on('Spring',() => {
                console.log('Spring========>>>>>>>');
        });
        socket.on('Autumn',() => {
                console.log('Autumn========>>>>>>>');
        });
})



let statistics = {
        grassCount: 0,
        grassEaterCount: 0,
        predatorCount: 0,
        tuyn: 0,
        hakatuyn: 0
}

setInterval(function () {
        statistics.grassCount = grassArray.length;
        statistics.grassEaterCount = grassEaterArr.length;
        statistics.predatorCount = predatorArr.length;
        statistics.tuynCount = tuynArr.length;
        statistics.hakatuynCount = hakatuynArr.length;

        fs.writeFile("./statistics.json", JSON.stringify(statistics), function () {
                console.log('write');
        })
}, 1000)
