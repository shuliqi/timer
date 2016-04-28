var Width = 1350;
var Height = 680;
var radis = 8;
var margin_top = 60;
var margin_left = 30
const endTime = new Date(2015,3,7,5,5,5);
var curShowTimeSeconds = 0;
var balls = [];
const clors = ["#fa09ca","#37d3f4","#37f4a2","#37e0f4","#edf437","#63f437","#f43b37","#37f4a2","#f4e037","#aa37f4"]
window.onload = function  () {
	var canvas = document.getElementById('canvas');
	canvas.width = Width;
	canvas.height = Height;
	var context = canvas.getContext('2d');  //进行绘制
	// context.beginPath();
	// context.moveTo(100,100);   //状态   起点
	// context.lineTo(500,500);   //状态   终点
	// context.lineTo(500,100);
	// context.lineTo(100,100);
	// context.closePath();
	// context.lineWidth = 5;     //设置线条的宽度
	// context.strokeStyle= "red";//设置线条的颜色

	// context.fillStyle = "#000";//给图形内部填充颜色 （状态；
	// context.fill();            //执行

	// context.stroke();          //执行

	// context.beginPath();
	// context.moveTo(800,600);
	// context.lineTo(600,200);
	// context.lineTo(300,400);
	// context.lineTo(600,600);
	// context.closePath();
	// context.lineWidth = 20;
	// context.strokeStyle = "blue";
	// context.fillStyle = "#899";
	// context.fill();
	// context.stroke();
 //    context.closePath();

	//绘制弧线
	// context.lineWidth = 5;
	// context.strokeStyle = "#000";
	// for (var i = 0; i < 3; i++) {
	//     context.beginPath()
	//     context.arc(500+i*250,300,100,0,2*Math.PI,true);
	//     context.fillStyle= "blue";
	//     context.fill();
	//     context.stroke();
 //   }
 curShowTimeSeconds = getcurShowTimeSeconds();
 setInterval(function(){
   render(context);
   update();
 },50);

}
function render(context){
  context.clearRect(0,0,Width,Height);      //对一个矩形空间内的图形进行更新
  var hours = parseInt(curShowTimeSeconds/3600);
  var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
  var seconds = curShowTimeSeconds %60;
  renderDigit(margin_top,margin_left,parseInt(hours/10),context);
  renderDigit(margin_top +15*(radis+1),margin_left, parseInt(hours%10),context);

  renderDigit(margin_left +35*(radis+1),margin_top,10,context);

  renderDigit(margin_top +45*(radis+1),margin_left, parseInt(minutes/10),context);
  renderDigit(margin_top +62*(radis+1),margin_left, parseInt(minutes%10),context);
  renderDigit(margin_left +80*(radis+1),margin_top,10,context);
  renderDigit(margin_top +90*(radis+1),margin_left, parseInt(seconds/10),context);
  renderDigit(margin_top +105*(radis+1),margin_left, parseInt(seconds%10),context);


  for (var i = 0; i < balls.length; i++) {
  	context.fillStyle =balls[i].color;
  	context.beginPath()
  	context.arc(balls[i].x,balls[i].y,radis,0,2*Math.PI,true);
  	context.closePath();
  	context.fill();
  }

}
function renderDigit(x , y , num , context ){
	context.fillStyle = "#09faf1"
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
				if (digit[num][i][j] == 1) {
                    context.beginPath()sss,,hf
                    context.arc(x+j*2*(radis+1) +(radis+1),y+i*2*(radis+1)+(radis+1),radis,0,2*Math.PI)
                    context.closePath()

                    context.fill()
                }
		}
		
	}
		
}
function getcurShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret =Math.round(ret/1000)
	return ret >0 ? ret:0;
}
function update(){
	var nextShowTimeSeconds = getcurShowTimeSeconds();
	var nexthours = parseInt(nextShowTimeSeconds/3600);
    var nextminutes = parseInt((nextShowTimeSeconds - nexthours*3600)/60);
    var nextseconds = nextShowTimeSeconds % 60;
    console.log(nextseconds)

  var curhours = parseInt(curShowTimeSeconds/3600);
  var curminutes = parseInt((curShowTimeSeconds - curhours*3600)/60);
  var curseconds = curShowTimeSeconds %60;
  // console.log('+'+ curseconds)
  
  if (nextseconds != curseconds) {
  	if (parseInt(curhours/10) != parseInt(nexthours/10)) {
  		addBalls(margin_left + 0,margin_top,parseInt(curhours/10));
  	};
  	if (parseInt(curhours % 10) != parseInt(nexthours % 10)) {
  		addBalls(margin_left + 15(radis+1),margin_top,parseInt(curhours % 10));
  	};

  	if (parseInt(curminutes/10) != parseInt(nextminutes/10)) {
  		addBalls(margin_left + 35*(radis+1),margin_top,parseInt(curminutes/10));
  	};
  	if (parseInt(curminutes % 10) != parseInt(nextminutes % 10)) {
  		addBalls(margin_left + 62*(radis+1),margin_top,parseInt(curminutes % 10));
  	};

  	if (parseInt(curseconds/10) != parseInt(nextseconds/10)) {
  		addBalls(margin_left +90*(radis+1),margin_top,parseInt(curseconds/10));
  	};
  	if (parseInt(curseconds % 10) != parseInt(nextseconds % 10)) {
  		addBalls(margin_left + 105*(radis+1),margin_top,parseInt(nextseconds % 10));
  	};

  	curShowTimeSeconds = nextShowTimeSeconds;
  }
   updateBalls();

}
function  updateBalls(){
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if (balls[i].y >= Height - radis) {
			balls[i].y = Height - radis;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}
	//删掉小球 不然会耗很大的空间
	// var cnt = 0 
	// for (var i = 0; i < balls.length; i++) 
	// 	if (balls[i].x+radis >0 && balls[i].x-radis < Width) 
	// 		balls[cnt++] = balls[i]
	// while(balls.length > cnt ){
	// 	balls.pop()
	// }

}
function addBalls(x,y,num){
	for (var i = 0; i < digit[num].length; i++)
		for (var j = 0; j < digit[num][i].length;j++)
			if (digit[num][i][j] == 1) {
				var aBall = {
					x:x + j * 2 * (radis+1) + (radis+1),
					y:y + i * 2 * (radis+1) + (radis+1),
					g:1.5 + Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:clors[Math.floor(Math.random()*clors.length)]
				}
				balls.push(aBall);
			}
}