
//! Requiring modules  --  START
var Grass = require("./characters/grass");
var GrassEater = require("./characters/grasseater");
let random = require('./characters/random');
var Gishatich = require("./characters/gishatich");
var Bomb = require("./characters/bomb");
var Fire = require("./characters/Fire");
var Strong = require("./characters/Strong");
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
gishatichArr = [];
bombArr = [];
fireArr = [];
strongArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
gishatichHashiv = 0;
bombHashiv = 0;
fireHashiv = 0;
strongHashiv = 0;
weather = "";
count = 0;
// kerparHashiv = 0;
// kerparHashiv = 0;

//! Setting global arrays  -- END




//! Creating MATRIX -- START   piti lini evs 2 element
function matrixGenerator(matrixSize, grass, grassEater, gishatich, bomb, Fire, Strong ) {   
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < bomb; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < Fire; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < Strong; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }


  

}
matrixGenerator(20, 15, 7, 15, 1, 6, 7);
//! Creating MATRIX -- END // avelacnel evs 2 kerpari hamar



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass_ = new Grass(x, y);
                grassArr.push(grass_);
                grassHashiv++;
            } else if (matrix[y][x] == 2) {
                var grassEater_ = new GrassEater(x, y);
                grassEaterArr.push(grassEater_);
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var gishatich_ = new Gishatich(x, y);
                gishatichArr.push(gishatich_);
                gishatichHashiv++
            }
            else if (matrix[y][x] == 4) {
                var bomb_ = new Bomb(x,y);
                bombArr.push(bomb_);
                bombHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var fire_ = new Fire(x,y);
                fireArr.push(fire_);
                fireHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var strong_ = new Strong(x,y);
                strongArr.push(strong_);
                strongHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {

    
    count++;
    if (count > 0 && count < 10) {
        weather = "spring";
    } else if( count >= 10 && count < 20){
        weather = "summer";
    } 
    else if( count >= 20 && count < 30){
        weather = "autumn";
    } 
    else if( count >= 30 && count < 40){
        weather = "winter";
    } 
    else {
        count = 0;
    }

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat();
        }
    }
    if (bombArr[0] !== undefined) {
        for (var i in bombArr) {
            bombArr[i].eat();
            bombArr[i].move();
        }    
    }
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].eat();
        }
    }
    if (strongArr[0] !== undefined) {
        for (var i in strongArr) {
            strongArr[i].eat();
        }
    }
    
    


    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        gishatichCounter: gishatichHashiv,
        bombCounter: bombHashiv,
        fireCounter: fireHashiv,
        strongCounter: strongHashiv,
        weather: weather  

    }
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000);