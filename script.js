
var canvasFront = document.getElementById("front");
var canvasBack = document.getElementById('back');
var arrayField = [];
var timer;

const frontContext = canvasFront.getContext('2d');
const backContext = canvasBack.getContext('2d');

for (var x = 0.5; x < 1200; x +=10) {//горизонтальная линия
    frontContext.moveTo(x, 0);
    frontContext.lineTo(x, 1200);
}

for (var y = 0.5; y < 610; y +=10) {//вертикальная линия
    frontContext.moveTo(0, y);
    frontContext.lineTo(1200, y);
}

    frontContext.strokeStyle = '#888';
    frontContext.stroke();


canvasBack.onclick = function(event) { // кнопочка воскрешения
    var x = event.offsetX;
    var y = event.offsetY;
    console.log(x);
    console.log(y);
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    arrayField[x][y] = 1; //типо многомерный массив

    console.log(arrayField);
    backContext.strokeStyle = '#888';
    drawSquare();
};

function universe() {  //вселенная
    var h = 120, v = 60;
    for(var i = 0; i < h; i++) {
        arrayField[i] = [];
        for(var j = 0; j < v; j++) {
            arrayField[i][j] = 0;
        }
    }
}

universe();

function drawSquare() {
    backContext.clearRect(0, 0, 1200, 600);

    for(var i = 0; i < 120; i++) {
        for(var j = 0; j < 60; j++) {
            if (arrayField[i][j] === 1) {
                backContext.fillRect(i * 10, j * 10, 10, 10);
            }
        }
    }
}

function clear() {
    backContext.clearRect(0, 0, 1200, 600);
}


function startLife(){
    //моделирование жизни
    var arrayLife = [];
    for (var i=0; i<120; i++){
        arrayLife[i]=[];
        for (var j=0; j<60; j++){
            var neighbors = 0;
            if (arrayField[rightField(i)-1][j]===1) {
                neighbors++;
            }
            if (arrayField[i][leftField(j)+1]==1) {
                neighbors++;
            }
            if (arrayField[leftField(i)+1][j]==1) {
                neighbors++;
            }
            if (arrayField[i][rightField(j)-1]==1) {
                neighbors++;
            }
            if (arrayField[rightField(i)-1][leftField(j)+1]==1) {
                neighbors++;
            }
            if (arrayField[leftField(i)+1][leftField(j)+1]==1) {
                neighbors++;
            }
            if (arrayField[leftField(i)+1][rightField(j)-1]==1) {
                neighbors++;
            }
            if (arrayField[rightField(i)-1][rightField(j)-1]==1) {
                neighbors++;
            }

            (neighbors==2 || neighbors==3) ? arrayLife[i][j]=1  : arrayLife[i][j]=0;
        }
    }
    arrayField = arrayLife;
    drawSquare();
    timer = setTimeout(startLife, 30);
}


function rightField(i){
    if(i===0) return 120;
    else return i;
}
function leftField(i){
    if(i===119) return -1;
    else return i;
}


document.getElementById('start').onclick = startLife;
document.getElementById('reset').onclick = clear;