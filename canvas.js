//so the srcipt is executed only after the window has been loaded.
window.onload = function(){
var canvas = document.querySelector('canvas');
document.body.style.backgroundColor = "black";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");//magic brush that can draw stuff is now stored in c (c for context) <=

var mouse = {x:undefined, y:undefined}
var maxRadius = 50;
//var minRadius = 3;

window.addEventListener('resize',function(){canvas.width = window.innerWidth;canvas.height = window.innerHeight; init();} );
window.addEventListener('mousemove',function(event){mouse.x = event.x;mouse.y = event.y;console.log(mouse);})
var colorArray = ['#1A4267','#2F9EB7','#94E6F7','#FFB00E','#FF830E'];

function Circle(x,y,dx,dy,r){
	this.color = colorArray[getRandomInt(colorArray.length)];
	this.minRadius = r;
	this.draw = function(){ c.beginPath();
	c.arc(x,y,r,0,Math.PI*2,false);
	c.stroke();
    c.strokeStyle =this.color;}

    this.update = function(){
    if(x+r>innerWidth|| x-r<0 ){dx = -dx;}
	if(y+r>innerHeight || y-r<0){dy =-dy;}
	x = x+dx;
    y = y+dy;
    if(Math.abs(mouse.x-x) < 50  && Math.abs(mouse.y-y) <50){if(r<maxRadius){r = r+1;}}
    else if(r>this.minRadius){r=r-0.5;}
    this.draw();}

}

var circleArray = [];
for(i=0;i<500;i++)
{
	var x  =  Math.random()*(innerWidth-r*2)+r;
	var y  =  Math.random()*(innerHeight-r*2)+r;
	var dx = (Math.random()-0.5)*0.2;
	var dy = (Math.random()-0.5)*0.2;
    var r  = getRandomInt(5)+1;
    circleArray.push(new Circle(x,y,dx,dy,r));
}


function init()
{
	circleArray = [];

	for(i=0;i<400;i++)
	{

		var x  =  Math.random()*(innerWidth-r*2)+r;
		var y  =  Math.random()*(innerHeight-r*2)+r;
		var dx = (Math.random()-0.5)*4;
		var dy = (Math.random()-0.5)*4;
	    var r  = getRandomInt(4)+1;
	    circleArray.push(new Circle(x,y,dx,dy,r));
    }
}

function animate()
{
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);

    for(i=0;i<circleArray.length;i++)
    {
		circleArray[i].update();
	}
}



animate();
init();



}

function getRandomInt(upperlimit){return Math.floor(Math.random()*(upperlimit+1));}
function getRandomRGB(){return 'rgba('+getRandomInt(255)+','+getRandomInt(255)+','+getRandomInt(255)+')' ;}




