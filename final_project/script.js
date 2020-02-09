
function setup() {
    var matrix = [];

    var rowCount = 50;
    var columnCount = 50;
    var socket = io();
    noStroke();
    var side = 30;


    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let gishatichCountElement = document.getElementById('gishatichCount');
    let bombCountElement = document.getElementById('bombCount');
    let fireCountElement = document.getElementById('fireCount');
    let strongCountElement = document.getElementById('strongCount');
    let weatherelement = document.getElementById('weather');




    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weatherelement.innerText = data.weather;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        gishatichCountElement.innerText = data.gishatichCounter;
        bombCountElement.innerText = data.bombCounter;
        fireCountElement.innerText = data.fireCounter;
        strongCountElement.innerText = data.strongCounter;





        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {

                if (matrix[i][j] == 1) {

                    if (weather.innerText == "spring") {
                        fill('#ddff99');
                    }
                    else if (weather.innerText == "summer") {
                        fill('#99e600');
                    }
                    else if (weather.innerText == "autumn") {
                        fill('#669900');
                    }
                    else if (weather.innerText == "winter") {
                        fill('#008000');
                    }
                    rect(j * side, i * side, side, side);
                }

                else if (matrix[i][j] == 0) {
                    fill("grey");
                    rect(j * side, i * side, side, side);
                }

                else if (matrix[i][j] == 2) {

                    rect(j * side, i * side, side, side);

                    if (weather.innerText == "spring") {
                        fill('#ffff33');
                    }
                    else if (weather.innerText == "summer") {
                        fill('#e6e600');
                    }
                    else if (weather.innerText == "autumn") {
                        fill('#b3b300');
                    }
                    else if (weather.innerText == "winter") {
                        fill('#808000');
                    }


                } else if (matrix[i][j] == 3) {
                    
                    if (weather.innerText == "spring") {
                        fill('#ff4dff');
                    }
                    else if (weather.innerText == "summer") {
                        fill('#990099');
                    }
                    else if (weather.innerText == "autumn") {
                        fill('#b800e6');
                    }
                    else if (weather.innerText == "winter") {
                        fill('#520066');
                    }
                    
                    rect(j * side, i * side, side, side);

                }


                else if (matrix[i][j] == 4) {

                    
                    if (weather.innerText == "spring") {
                        fill('#3333ff');
                    }
                    else if (weather.innerText == "summer") {
                        fill('#000080');
                    }
                    else if (weather.innerText == "autumn") {
                        fill('#00004d');
                    }
                    else if (weather.innerText == "winter") {
                        fill('#4dd2ff');
                    }
                    rect(j * side, i * side, side, side);


                }

                else if (matrix[i][j] == 5) {
                    if (weather.innerText == "spring") {
                        fill('#ff6633');
                    }
                    else if (weather.innerText == "summer") {
                        fill('#e63900');
                    }
                    else if (weather.innerText == "autumn") {
                        fill('#b32d00');
                    }
                    else if (weather.innerText == "winter") {
                        fill('#802000');
                    }


                    

                    rect(j * side, i * side, side, side);

                }
                else if (matrix[i][j] == 6) {


                    if (weather.innerText == "spring") {
                        fill('#ff9933');
                    }
                    else if (weather.innerText == "summer") {
                        fill('#cc6600');
                    }
                    else if (weather.innerText == "autumn") {
                        fill('#663300');
                    }
                    else if (weather.innerText == "winter") {
                        fill('#4d2600');
                    }

                    rect(j * side, i * side, side, side);

                }
            }



  






    for (var y = 0; y < rowCount; ++y) {
        matrix[y] = [];

        for (var x = 0; x < columnCount; ++x) {
            matrix[y][x] = Math.round(random(0, 4));
        }
    }

    var randomRow = Math.floor(random(rowCount));
    var randomColumn = Math.floor(random(columnCount));

    matrix[randomRow][randomColumn] = 4;

} 
    }
}