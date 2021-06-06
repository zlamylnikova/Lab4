var Pac
var RedE
var BlueE
var PinkyE
var YellowE
var canvas, ctx, cellSize;
var FPS = 60;
var dir;
var score = 0;
const wall = new Image();
const blank = new Image();
const packman = new Image();
const red = new Image();
const pinky = new Image();
const blue = new Image();
const yellow = new Image();
const point = new Image();

blank.src = "blank.png"
wall.src = "walls.png";
packman.src = "packman.png";
red.src = "red.png";
pinky.src = "Pinky.png";
yellow.src = "yellow.png";
blue.src = "Blue.png";

point.src = "point.png";
//////////////////////////////////////////////////////////
var NAVIGATION = [37, 38, 39, 40]
document.body.addEventListener("keydown", function(event) 
{
    if (-1 != NAVIGATION.indexOf(event.keyCode))

     event.preventDefault();
})
///////////////////////////////////////////////////////////
canvas = document.getElementById("Canvas");
ctx = canvas.getContext("2d");
    
cellSize = 35;
var map = [ 
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
        [1,2,1,0,1,2,1,2,2,2,2,2,2,2,1,2,1,1,1,2,1],
        [1,2,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
        [1,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,1],
        [1,1,1,2,2,2,1,2,1,1,0,1,1,2,1,2,2,2,1,1,1],
        [1,1,1,1,2,2,1,2,1,0,0,0,1,2,1,2,2,1,1,1,1],
        [1,2,2,2,2,2,2,2,1,0,0,0,1,2,2,2,2,2,2,2,1],
        [1,1,1,1,2,2,1,2,1,1,1,1,1,2,1,2,2,1,1,1,1],
        [1,1,1,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,2,1,1,1,1,2,2,2,1,1,1,1,2,1,1,2,1],
        [1,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,1],
        [1,2,2,1,1,2,2,2,1,1,1,1,1,2,2,2,1,1,2,2,1],
        [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]

    function updateScreen(x,y){
    ctx.clearRect(x*cellSize,y*cellSize,cellSize,cellSize);
}
///////////////////////////////////////////////////


// тут будет коментарий 

///////////////////////////////////////////////////
function Packman(){
    this.x = 10;
    this.y = 15;
}
Packman.prototype ={
    draw: function() {
        map[this.x][this.y] = 4;
        ctx.drawImage(packman,this.x*cellSize,this.y*cellSize,cellSize,cellSize);
    },
    move: function(x,y){
        if(map[x][y] == 2){
            score++;
        }
        updateScreen(this.x,this.y);
        map[this.x][this.y] = 0;
        this.x = x;
        this.y = y;
        this.draw();
    },
    isMove: function(x,y){
        if(map[x][y] != 1){
            return true;
        }
        else{
            return false;
        }
    },
    Die: function(){
        if(score == 195){
           document.onkeydown = function(e){}   
        }
        else if(Pac.x == RedE.x && Pac.y == RedE.y || Pac.x == BlueE.x && Pac.y == BlueE.y || Pac.x == PinkyE.x && Pac.y == PinkyE.y || Pac.x == YellowE.x && Pac.y == YellowE.y){
            document.onkeydown = function(e){}  
        }
    }
};
///////////////////////////////////////////////////
// тут будет коментарий 


///////////////////////////////////////////////////
function Red(){
    this.x = 1;
    this.y = 1;
}
Red.prototype ={
    draw: function(){
        //map[this.x][this.y] = 3;
        ctx.drawImage(red,this.x*cellSize,this.y*cellSize,cellSize,cellSize);
    },
    isMove: function(x,y){
        if(map[x][y] != 1){
            moving = true;
            return true;
        }
        else{
            moving = false;
            return false;
        }
    },
    move: function(x,y){
        moving = false;
        var previously = map[this.x][this.y];

        if(previously == 2){
            updateScreen(this.x,this.y);
            ctx.drawImage(point,this.x*cellSize,this.y*cellSize,cellSize,cellSize);            
        }
        if(previously == 0){
            updateScreen(this.x,this.y);
        }


        this.x = x;
        this.y = y;
        this.draw();
    },
    randGo: function(){
        while(true){    
            var where = Math.floor(Math.random() * (5 - 1)) + 1;
            if (where == 1){//up
                if(this.isMove(this.x,this.y-1)){
                    this.move(this.x,this.y-1);
                    
                    break;
                }
            }
            if (where == 2){//left
                if(this.isMove(this.x-1,this.y)){
                    this.move(this.x-1,this.y);
                        
                    break;
                }
            }
            if (where == 3){//down
                if(this.isMove(this.x,this.y + 1)){
                    this.move(this.x,this.y + 1);
                   
                    break;
                }
            }
            if (where == 4){//rigth
                if(this.isMove(this.x+1,this.y)){
                    this.move(this.x+1,this.y);
                   
                    break;
                }
            }
        }
    }

};
function Blue(){
    this.x = 17;
    this.y = 19;
}
Blue.prototype ={
    draw: function(){
        ctx.drawImage(blue,this.x*cellSize,this.y*cellSize,cellSize,cellSize);
    },
    isMove: function(x,y){
        if(map[x][y] != 1){
            moving = true;
            return true;
        }
        else{
            moving = false;
            return false;
        }
    },
    move: function(x,y){
        moving = false;
        var previously = map[this.x][this.y];

        if(previously == 2){
            updateScreen(this.x,this.y);
            ctx.drawImage(point,this.x*cellSize,this.y*cellSize,cellSize,cellSize);            
        }
        if(previously == 0){
            updateScreen(this.x,this.y);
        }


        this.x = x;
        this.y = y;
        this.draw();
    },
    randGo: function(){
        while(true){    
            var where = Math.floor(Math.random() * (5 - 1)) + 1;
            if (where == 1){//up
                if(this.isMove(this.x,this.y-1)){
                    this.move(this.x,this.y-1);
                    break;
                }
            }
            if (where == 2){//left
                if(this.isMove(this.x-1,this.y)){
                    this.move(this.x-1,this.y);
                    break;
                }
            }
            if (where == 3){//down
                if(this.isMove(this.x,this.y + 1)){
                    this.move(this.x,this.y + 1);
                    break;
                }
            }
            if (where == 4){//rigth
                if(this.isMove(this.x+1,this.y)){
                    this.move(this.x+1,this.y);
                    break;
                }
            }
        }
    }

};
function  Pinky(){
    this.x = 1;
    this.y = 19;
}
Pinky.prototype ={
    draw: function(){
        ctx.drawImage(pinky,this.x*cellSize,this.y*cellSize,cellSize,cellSize);
    },
    isMove: function(x,y){
        if(map[x][y] != 1){
            moving = true;
            return true;
        }
        else{
            moving = false;
            return false;
        }
    },
    move: function(x,y){
        moving = false;
        var previously = map[this.x][this.y];

        if(previously == 2){
            updateScreen(this.x,this.y);
            ctx.drawImage(point,this.x*cellSize,this.y*cellSize,cellSize,cellSize);            
        }
        if(previously == 0){
            updateScreen(this.x,this.y);
        }


        this.x = x;
        this.y = y;
        this.draw();
    },
    randGo: function(){
        while(true){    
            var where = Math.floor(Math.random() * (5 - 1)) + 1;
            if (where == 1){//up
                if(this.isMove(this.x,this.y-1)){
                    this.move(this.x,this.y-1);
                    break;
                }
            }
            if (where == 2){//left
                if(this.isMove(this.x-1,this.y)){
                    this.move(this.x-1,this.y);
                    break;
                }
            }
            if (where == 3){//down
                if(this.isMove(this.x,this.y + 1)){
                    this.move(this.x,this.y + 1);
                    break;
                }
            }
            if (where == 4){//rigth
                if(this.isMove(this.x+1,this.y)){
                    this.move(this.x+1,this.y);
                    break;
                }
            }
        }
    }

};
function Yellow(){
    this.x = 17;
    this.y = 1;
}
Yellow.prototype ={
    draw: function(){

        ctx.drawImage(yellow,this.x*cellSize,this.y*cellSize,cellSize,cellSize);
    },
    isMove: function(x,y){
        if(map[x][y] != 1){
            moving = true;
            return true;
        }
        else{
            moving = false;
            return false;
        }
    },
    move: function(x,y){
        moving = false;
        var previously = map[this.x][this.y];

        if(previously == 2){
            updateScreen(this.x,this.y);
            ctx.drawImage(point,this.x*cellSize,this.y*cellSize,cellSize,cellSize);            
        }
        if(previously == 0){
            updateScreen(this.x,this.y);
        }


        this.x = x;
        this.y = y;
        this.draw();
    },
    randGo: function(){
        while(true){    
            var where = Math.floor(Math.random() * (5 - 1)) + 1;
            if (where == 1){//up
                if(this.isMove(this.x,this.y-1)){
                    this.move(this.x,this.y-1);
                    break;
                }
            }
            if (where == 2){//left
                if(this.isMove(this.x-1,this.y)){
                    this.move(this.x-1,this.y);
                    break;
                }
            }
            if (where == 3){//down
                if(this.isMove(this.x,this.y + 1)){
                    this.move(this.x,this.y + 1);
                    break;
                }
            }
            if (where == 4){//rigth
                if(this.isMove(this.x+1,this.y)){
                    this.move(this.x+1,this.y);
                    break;
                }
            }
        }
    }

};

//////////////////////////////////////////////////
function drawWorld(){
        Pac = new Packman
        RedE = new Red
        BlueE = new Blue
        PinkyE= new Pinky
        YellowE = new Yellow
    for( var i = 0; i < map.length; i++ ){
        for(var j = 0; j < map[i].length; j++){
            if (map[i][j] == 1)  {
                ctx.drawImage(wall,i*cellSize,j*cellSize,cellSize,cellSize);            
            }
            else if (map[i][j] == 2){
                // point
                ctx.drawImage(point,i*cellSize,j*cellSize,cellSize,cellSize);            
            }               
        }
    }
        Pac.draw();
        RedE.draw();
        BlueE.draw();
        YellowE.draw();
        PinkyE.draw();

}
document.onkeydown = function(e)
{
    var wCode = 87; 
    var aCode = 65;
    var sCode = 83;
    var dCode = 68;    
    var keyCode = event.keyCode;

    switch(keyCode){
        case wCode:
            if (Pac.isMove(Pac.x, Pac.y-1)){             
                   Pac.move(Pac.x,Pac.y-1);
            }
            Pac.Die();
            RedE.randGo();
            BlueE.randGo();
            PinkyE.randGo();
            YellowE.randGo();
            console.log(score);
            Pac.Die();
            break;
        case aCode:
            if(Pac.isMove(Pac.x-1,Pac.y)){
                Pac.move(Pac.x-1,Pac.y);
            }
            Pac.Die();
            RedE.randGo();
            BlueE.randGo();
            PinkyE.randGo();
            YellowE.randGo();
            Pac.Die();
            console.log(score);
            break;    
        case sCode:
            if(Pac.isMove(Pac.x,Pac.y+1)){
                Pac.move(Pac.x,Pac.y+1);
            }
            Pac.Die();
            RedE.randGo();
            BlueE.randGo();
            PinkyE.randGo();
            YellowE.randGo();
            Pac.Die();
            console.log(score);
            break;
        case dCode:
            if(Pac.isMove(Pac.x+1,Pac.y)){
                Pac.move(Pac.x+1,Pac.y);
            }
            Pac.Die();
            RedE.randGo();
            BlueE.randGo();
            PinkyE.randGo();
            YellowE.randGo();
            Pac.Die();
            console.log(score);
            break;
        }
    }
////////////////////////////////////////
window.onload = function(){
    drawWorld();
};