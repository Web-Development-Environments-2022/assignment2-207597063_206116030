var context;

//shapes for moving objects
var shape = new Object();
var m1Shape=new Object();
var m2Shape=new Object();
var m3Shape=new Object();
var m4Shape=new Object();
var angShape=new Object();

var board;
var score;
var audio = new Audio('images/song.mp3');
audio.loop = true;
var pac_color;
var start_time;
var time_elapsed;
var interval; 
var userTitle = "";
var modelOn=false;
var numOfLifes=5;
var lastPrased=4;
var hasClock=false;
var hasMed=false;
var keysDown;

//settings
var g_key_up = 38;
var g_key_down = 40;
var g_key_right = 39;
var g_key_left = 37;
var g_food_remain = 50;
var g_color5points;
var g_color15points;
var g_color25points;
var g_time_settings = 60;
var g_monsters_settings = 4;

//load images
const monster1=new Image();
const monster2=new Image();
const med=new Image();
const angel=new Image();
const clock=new Image();
monster1.src='images/ghost2.png';
monster2.src='images/ghost3.png';
med.src='images/pill.png';
angel.src='images/angel.png';
clock.src='images/clock.png';


//create local storage
localStorage.clear();
//default user
localStorage.setItem("k",JSON.stringify({
	username: "k",
	password: "k",
	fullname: "k",
	mail: "k@gmail.com",
	date: new Date('2017-01-03')}));

//load page
$(document).ready(function() {
	alert("did the ready part");
	welcome();
	
});


//settings
function saveSettings(){
	g_food_remain = document.getElementById("amountFoodSettings").value;
	color5points = document.getElementById("color5_points").value;
	color15points = document.getElementById("color15_points").value;
	color25points = document.getElementById("color25_points").value;
	g_time_settings = document.getElementById("value_time").value;
	g_monsters_settings = document.getElementById("monsters_amount_settings").value;
}

function confirmation(){
	var c_up = document.getElementById("up");
	var c_down = document.getElementById("down");
	var c_right = document.getElementById("right");
	var c_left = document.getElementById("left");
	var c_food = document.getElementById("amountFoodSettings");
	var c_time = document.getElementById("time_settings");
	var c_monster = document.getElementById("monsters_amount_settings");

	if (c_up.value === "" || c_down.value === "" || c_right.value === "" || c_left.value === "" ||c_food.value === "" || c_time.value === "" || c_monster.value === ""){
		alert("you missed details!")
		return;
	}

	document.getElementById("up_conf").textContent = document.getElementById("up").value;
	document.getElementById("down_conf").textContent = document.getElementById("down").value;
	document.getElementById("right_conf").textContent = document.getElementById("right").value;
	document.getElementById("left_conf").textContent = document.getElementById("left").value;
	document.getElementById("time_conf").textContent = document.getElementById("time_settings").value;
	document.getElementById("monsters_conf").textContent = document.getElementById("monsters_amount_settings").value;
	document.getElementById("food_conf").textContent = document.getElementById("amountFoodSettings").value;
	document.getElementById("points5_conf").style.color = document.getElementById("color5_points").value;
	document.getElementById("points15_conf").style.color = document.getElementById("color15_points").value;
	document.getElementById("points25_conf").style.color = document.getElementById("color25_points").value;

	unShowAll();

	var con = document.getElementById("Confirmation_settings");
	con.style.display = "block";
	//window.location.href='#Confirmation_settings';
}

function random_settings(){
	// key_up = 38;
	// key_down = 40;
	// key_right = 39;
	// key_left = 37;
	unShowAll();
	$("#Confirmation_settings").show();

	document.getElementById("up_conf").textContent = "ArrowUp";
	//document.getElementById("up").value = "ArrowUp";
	//document.getElementById("value_up").textContent = "ArrowUp";

	document.getElementById("down_conf").textContent= "ArrowDown";
	//document.getElementById("down").value = "ArrowDown";
	//document.getElementById("value_down").textContent = "ArrowDown";

	document.getElementById("right_conf").textContent = "ArrowRight";
	//document.getElementById("right").value = "ArrowRight";
	//document.getElementById("value_right").textContent = "ArrowRight";

	document.getElementById("left_conf").textContent = "ArrowLeft";
	//document.getElementById("left").value = "ArrowLeft";
	//document.getElementById("value_left").textContent = "ArrowLeft";

		
	const random_food = Math.floor(Math.random() * 41) + 50; // food (50-90)
	document.getElementById("food_conf").textContent = random_food;


	const random_color1 = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
	document.getElementById("points5_conf").style.color = random_color1;



	const random_color2 = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
	document.getElementById("points15_conf").style.color = random_color2;
	// c15points.value = "#" + random_color2;
	//g_color15points = random_color2;


	const random_color3 = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
	document.getElementById("points25_conf").style.color = random_color3;


	const random_time = Math.floor(Math.random() * 241) + 60; // time (60-300 sec) -> (1-5 minutes)
	document.getElementById("time_conf").textContent = random_time;
	

	const random_monsters = Math.floor(Math.random() * 4) + 1; //monsters (1-4)	
	document.getElementById("monsters_conf").textContent = random_monsters;


}

//game logic
function Start() {
	board = new Array();
	shape.i = 5;
	shape.j = 0;
	score = 0;
	pac_color = "yellow";
	var cnt = 144;
	//var food_remain = 80;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 12; i++) {
		console.log(i);
		board[i] = new Array();
		for (var j = 0; j < 12; j++) {
			console.log(j);
			if (
				(i == 1 && j == 0) ||
				(i == 7 && j == 0) ||
				(i == 9 && j == 0) ||
				(i == 1 && j == 1) ||
				(i == 2 && j == 1) ||
				(i == 3 && j == 1) ||
				(i == 4 && j == 1) ||
				(i == 7 && j == 1) ||
				(i == 11 && j == 1) ||
				(i == 4 && j == 2) ||
				(i == 7 && j == 2) ||
				(i == 8 && j == 2) ||
				(i == 11 && j == 2) ||
				(i == 2 && j == 3) ||
				(i == 3 && j == 3) ||
				(i == 4 && j == 3) ||
				(i == 5 && j == 3) ||
				(i == 8 && j == 3) ||
				(i == 2 && j == 4) || //maybe delete later
				(i == 8 && j == 4) ||
				(i == 11 && j == 4) ||
				(i == 1 && j == 5) ||
				(i == 2 && j == 5) ||
				(i == 3 && j == 5) ||
				(i == 5 && j == 5) ||
				(i == 6 && j == 5) ||
				(i == 8 && j == 6) ||
				(i == 11 && j == 6) ||
				(i == 0 && j == 7) ||
				(i == 1 && j == 7) ||
				(i == 2 && j == 7) ||
				(i == 3 && j == 7) ||
				(i == 5 && j == 7) ||
				(i == 9 && j == 7) ||
				(i == 1 && j == 8) ||
				(i == 3 && j == 8) ||
				(i == 5 && j == 8) ||
				(i == 7 && j == 8) ||
				(i == 8 && j == 8) ||
				(i == 5 && j == 9) ||
				(i == 7 && j == 9) ||
				(i == 11 && j == 9) ||
				(i == 2 && j == 10) ||
				(i == 5 && j == 10) ||
				(i == 11 && j == 10) ||
				(i == 2 && j == 11) ||
				(i == 5 && j == 11) ||
				(i == 8 && j == 11) 
			) {
				board[i][j] = 4;
			}
			else if((i == 0 && j == 0) ||
			(i == 11 && j == 11))
			{
				board[i][j] = 5;
			}
			else if((i == 11 && j == 0) ||
			(i == 0 && j == 11)) {
				board[i][j]=9;
			}
			else if((i==6 && j==6)){
				board[i][j] = 6;

			}
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * g_food_remain) / cnt) {
					g_food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + g_food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (g_food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		g_food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 100);

}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 11 + 1);
	var j = Math.floor(Math.random() * 11+ 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 11 + 1);
		j = Math.floor(Math.random() * 11 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) { //up
		return 1;
	}
	if (keysDown[40]) { //down
		return 2;
	}
	if (keysDown[37]) { //left
		return 3;
	}
	if (keysDown[39]) { //right
		return 4;
	}
}

function Draw(x) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblUser.value=userTitle;
	lblTime.value = g_time_settings - time_elapsed;
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { //paci
				if(x==1){
					context.beginPath();
					context.arc(center.x, center.y, 20, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 10, center.y + 10, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(x==2){
					context.beginPath();
					context.arc(center.x, center.y, 20, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x +12 , center.y + 10, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();				}
				else if(x==3){
					context.beginPath();
					context.arc(center.x, center.y, 20, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();				}
				else{
					context.beginPath();
					context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			} else if (board[i][j] == 1) { //food
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = "gold"; //color
				context.fill();
			} else if (board[i][j] == 4) { //wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "blue"; //color
				context.fill();
			}
			else if (board[i][j] == 5) { //monster -life -10 score
				context.drawImage(monster1,center.x-15,center.y-15);
			}
			else if (board[i][j] == 6) { // angel +50 score
				context.drawImage(angel,center.x-15,center.y-15);

			}
			else if (board[i][j] == 7) { //med +life
				context.drawImage(med,center.x-15,center.y-15);

			}
			else if (board[i][j] == 8) { //clock + 20 sec
				context.drawImage(clock,center.x-15,center.y-15);

			}
			else if (board[i][j] == 9) { //monster -life -25 score
				context.drawImage(monster2,center.x-15,center.y-15);
			}
		}
	}

}

function UpdatePosition() {

	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			lastPrased=1;
		}
	}
	else if (x == 2) { //down
		if (shape.j < 11 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			lastPrased=2;
		}
	}
	else if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			lastPrased=3;
		}
	}
	else if (x == 4) { //right
		if (shape.i < 11 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			lastPrased=4;
		}
	}
	else{
		x=lastPrased;
	}
	if (board[shape.i][shape.j] == 1) { //food
		score++;
	}
	if(board[shape.i][shape.j] == 5){ //monster
		score-=10;
		numOfLifes-=1;
		removeLife();
		drawAfterHit();
	}
	if(board[shape.i][shape.j] == 9){ //monster
		score-=25;
		numOfLifes-=1;
		removeLife();
		drawAfterHit();
	}
	if(board[shape.i][shape.j] == 6){ //angel
		score+=50;
	}
	if(board[shape.i][shape.j] == 7){ //med
		numOfLifes+=1;
		addLife();
		hasMed=false;
	}

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	if(board[shape.i][shape.j] == 8){ //clock
		time_elapsed-=20;
		hasClock=false;
	}
	board[shape.i][shape.j] = 2;
	if(score>=0 && time_elapsed< 50){
		pac_color="yellow"
	}
	if (score < 0 || time_elapsed >= 50) {
		pac_color = "red";
	}
	if(numOfLifes<=2){
		if(!hasMed){
			drawMed();
		}
	}
	if(time_elapsed>=50){
		if(!hasClock){
			drawClock();
		}
	}
	if (score == 70) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	else if(numOfLifes==0 || time_elapsed==60){
		window.clearInterval(interval);
		window.alert("Loser");
	}
	else {
		Draw(x);
	}
}

function drawMed(){
//med in random position
hasMed=true;
var x=Math.floor(Math.random() * 6 + 1);
if(x==1){
	board[6][11]=7;

}
else if(x==2){
	board[7][6]=7;

}
else if(x==3){
	board[9][5]=7;

}
else if(x==4){
	board[9][5]=7;

}
else if(x==5){
	board[0][6]=7;

}
else{
	board[10][0]=7;

}

}

function drawClock(){
	//clock in random position
	hasClock=true;
	var x=Math.floor(Math.random() * 6 + 1);
	if(x==1){
		board[4][5]=8;

	}
	else if(x==2){
		board[10][7]=8;

	}
	else if(x==3){
		board[0][9]=8;

	}
	else if(x==4){
		board[2][3]=8;

	}
	else if(x==5){
		board[2][9]=8;

	}
	else{
		board[8][7]=8;

	}

}

function drawAfterHit(){
	//monsters in the corners
	board[0][11]=9;
	board[0][0]=5;
	board[11][11]=5;
	board[11][0]=9;

	//pacman in random position
	var x=Math.floor(Math.random() * 6 + 1);
	if(x==1){
		board[5][2]=2;
		shape.i=5;
		shape.j=2;
	}
	else if(x==2){
		board[6][3]=2;
		shape.i=6;
		shape.j=3;
	}
	else if(x==3){
		board[9][5]=2;
		shape.i=9;
		shape.j=5;
	}
	else if(x==4){
		board[8][9]=2;
		shape.i=8;
		shape.j=9;
	}
	else if(x==5){
		board[4][6]=2;
		shape.i=4;
		shape.j=6;
	}
	else{
		board[0][3]=2;
		shape.i=0;
		shape.j=3;
	}


}

function addLife(){
	if(numOfLifes==5){
		$("#life5").show();
	}
	else if(numOfLifes==4){
		$("#life4").show();
	}
	else if(numOfLifes==3){
		$("#life3").show();
	}
	else if(numOfLifes==2){
		$("#life2").show();
	}
}
function removeLife(){
	if(numOfLifes==4){
		$("#life5").hide();
	}
	else if(numOfLifes==3){
		$("#life4").hide();
	}
	else if(numOfLifes==2){
		$("#life3").hide();
	}
	else if(numOfLifes==1){
		$("#life2").hide();
	}
	else if(numOfLifes==0){
		$("#life1").hide();
	}
}






//Presentation  logic
function unShowAll(){
	audio.pause();
	var welcome = document.getElementById("welcome");
	welcome.style.display = "none";
	var login = document.getElementById("Login");
	login.style.display = "none";
	var Unregistered = document.getElementById("Unregistered");
	Unregistered.style.display = "none";
	var register = document.getElementById("Register");
	register.style.display = "none";
	var alredySignin = document.getElementById("alredySignin");
	alredySignin.style.display = "none";
	var game = document.getElementById("game");
	game.style.display = "none";
	var score = document.getElementById("score");
	score.style.display = "none";
	var userName = document.getElementById("userName");
	userName.style.display = "none";
	var lifes = document.getElementById("life");
	lifes.style.display = "none";
	var time = document.getElementById("time");
	time.style.display = "none";
	var set = document.getElementById("ChangeSettings");
	set.style.display = "none";
	var confirm = document.getElementById("Confirmation_settings");
	confirm.style.display = "none";

}

function f_Game(){
	unShowAll();
	var canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	var v_game = document.getElementById("game");
	v_game.style.display = "block";
	var score = document.getElementById("score");
	score.style.display = "block";
	var time = document.getElementById("time");
	time.style.display = "block";
	var userName = document.getElementById("userName");
	userName.style.display = "block";
	var lifes = document.getElementById("life");
	lifes.style.display = "block";
	audio.play();
	window.location.href='#game';
	Start();
}

function welcome(){
	unShowAll();
	var welcome = document.getElementById("welcome");
	welcome.style.display = "block";
	window.location.href='#welcome';
}

function pre_changeSettings(){
	unShowAll();
	var setting = document.getElementById("ChangeSettings");
	setting.style.display = "block";
	window.location.href='#ChangeSettings';
	f_ChangeSettings();
}


function f_ChangeSettings(){
	var text_up = document.getElementById("up");
	var text_down = document.getElementById("down");
	var text_right = document.getElementById("right");
	var text_left = document.getElementById("left");
	var number_time = document.getElementById("time_settings");
	var number_monsters = document.getElementById("monsters_amount_settings");
	var number_food = document.getElementById("amountFoodSettings");
	//var c_5 = document.getElementById("color5_points");
	//var c_15 = document.getElementById("color15_points");
	//var c_25 = document.getElementById("color25_points");



	text_up.addEventListener('keyup', (e) => {
		text_up.placeholder= e.key;
		g_key_up = e.keyCode;	
		text_up.value = e.key;	
		document.getElementById("value_up").textContent = e.key;
		document.getElementById("up_conf").textContent = e.key;
	  });
	
	text_down.addEventListener('keyup', (e) => {
		text_down.placeholder= e.key;
		g_key_down = e.keyCode;	
		text_down.value = e.key;	
		document.getElementById("value_down").textContent = e.key;
		document.getElementById("down_conf").textContent = e.key;


	  });

	text_right.addEventListener('keyup', (e) => {
		text_right.placeholder= e.key;
		g_key_right = e.keyCode;
		text_right.value = e.key;	
		document.getElementById("value_right").textContent = e.key;
		document.getElementById("right_conf").textContent = e.key;

	  });

	text_left.addEventListener('keyup', (e) => {
		text_left.placeholder= e.key;
		g_key_left = e.keyCode;	
		text_left.value = e.key;
		document.getElementById("value_left").textContent = e.key;
		document.getElementById("left_conf").textContent = e.key;

	  });

	number_time.addEventListener('input', (e) => {
		document.getElementById("value_time").textContent = number_time.value;
		document.getElementById("time_conf").textContent = number_time.value;

	  });

	number_monsters.addEventListener('input', (e) => {
		document.getElementById("value_monster").textContent = number_monsters.value;
		document.getElementById("monsters_conf").textContent = number_monsters.value;

	  });

	number_food.addEventListener('input', (e) => {
		document.getElementById("value_food").textContent = number_food.value;
		document.getElementById("food_conf").textContent = number_food.value;
	  });	

	// c_5.addEventListener('change', (e) => {
	// 	document.getElementById("points5_conf").style.color = c_5.value;
	//   });	

	// c_15.addEventListener('change', (e) => {
	// 	document.getElementById("points15_conf").style.color = c_15.value;
	//   });	
	
	// c_25.addEventListener('change', (e) => {
	// 	document.getElementById("points25_conf").style.color = c_25.value;
	//   });	  
}

function showRegister(){
	unShowAll();
	var register = document.getElementById("Register");
	register.style.display = "block";
	var alredySignin = document.getElementById("alredySignin");
	alredySignin.style.display = "block";
	window.location.href='#Register';
}

function showLogin(){
	unShowAll();
	var login = document.getElementById("Login");
	login.style.display = "block";
	var Unregistered = document.getElementById("Unregistered");
	Unregistered.style.display = "block";
	window.location.href='#Login';
}


// opens the model
function showAbout(){
	var modal = document.getElementById("about");
	modal.style.display = "block";
	modelOn=true;
}
// closes the model
function closeModel(){
	var modal = document.getElementById("about");
	modal.style.display = "none";
	modelOn=false;
}

function registerComplete(){ 
	var rgularExp = {
        containsNumber : /\d+/,
        containsAlphabet : /[a-zA-Z]/,
        onlyLetters : /^[A-Za-z]+$/,
    }
	var isOk=true;
	var pass= document.getElementById("password").value;
	var fullname= document.getElementById("fullname").value;
	var mail= document.getElementById("mail").value;
	var date= document.getElementById("date").value;
	var username= document.getElementById("username").value;

	//check all fileds are not empty 
	if(pass.length===0 || fullname.length===0 || mail.length===0 || username.length===0 || date.length===0){
		alert("Please fill in all of the fields!");
		isOk=false;
	}

	//check password - longer then 6 and has numeric and alphabetic
	else if (pass.length < 6 || !rgularExp.containsNumber.test(pass) || !rgularExp.containsAlphabet.test(pass)){
		alert("You did not enter details properly! \n\npassword must contain at least 6 characters- numbers and letters.");
		isOk=false;
	}

	//check valid mail
	else if(!mail.includes("@")){
		alert("You did not enter details properly! \n\nMail address is not a valid mail address.");
		isOk=false;
	}

	//check name has no numbers
	else if(rgularExp.containsNumber.test(fullname)){
		alert("You did not enter details properly! \n\nFull name must contain only letters.");
		isOk=false;
	}

	// if not ok - go back to register and change
	if(!isOk){
		showRegister();
		console.log("false");
		return;
	}
	// if ok - start game
	else{
		//insert new user to the users array 
		localStorage.setItem(username,JSON.stringify({username: username, password: pass,
			fullname: fullname, mail: mail, date: date}));
		alert("added success");
		f_Game();
		
	}
	return;
}

function isUserValid(user, pass) {

	const userLS = JSON.parse(localStorage.getItem(user));
	if (userLS===null){ //user not exist
		return false;
	} 
	else{ //user exist
		if(userLS.password === pass){ //user and password is match
			return true;
		}
		else{ //password wrong
			return false;
		}
	}
  }


function login(){
	var pass= document.getElementById("pswLogin").value;
	var user= document.getElementById("userLogin").value;

	//check all fileds are not empty 
	if(pass.length===0 || user.length===0){
		alert("You did not enter your user name or password!");
		showLogin();
	}
	else{
		if (isUserValid(user, pass)) {
			console.log("true");
			alert("you entered everything ok");
			userTitle = user;
			f_Game();
			return;

		} else {
			console.log("false");
			alert("Sorry, wrong username and password!");
			showLogin();
			return;
		}	
	}
	return;
}
