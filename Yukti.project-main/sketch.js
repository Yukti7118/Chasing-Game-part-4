var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2,mainHouseImg;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Extra/Road.png");

  mainRacerImg1=loadAnimation("Theifrunning/Theifrunning1.png","Theifrunning/Theifrunning2.png","Theifrunning/Thiefrunning3.png","Theifrunning/Theifrunning4.png");
  mainRacerImg2=loadAnimation("Theiffalling/Theiffalling1.png","Theiffalling/Theiffalling2.png","Theiffalling/Theiffalling3.png","Theiffalling/Theiffalling4.png","Theiffalling/TheifFalling5.png");
  oppPink1Img = loadAnimation("Obstacles/OCar1.png");
  oppPink2Img = loadAnimation("Obstacles/OCar2.png");
  oppPink3Img = loadAnimation("Obstacles/OCar3.png");
  oppPink4Img = loadAnimation("Obstacles/OCar4.png");
  oppPink5Img = loadAnimation("Obstacles/OCar5.png");
  oppPink7Img = loadAnimation("Obstacles/OCar7.png");
  mainHouseImg=loadImage("Extra/StartingHouse.png");


 
  
  
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,500);
// Moving background
path=createSprite(600,250);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(600,250);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.9;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40);

mainHouse=createSprite(600,250);
mainHouse.addImage("mainHouse",mainHouseImg);
mainHouse.scale=1.5;
mainHouse.velocityX=-5
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();

  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
  
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 100 == 0) {
    
      pinkCyclists();
   
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
   
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainHouse.destroy();
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.6;
        player1.velocityX = -(6 + 2*distance/150);
        var r=Math.round(random(1,6))
if (r===1) {
  
  player1.addAnimation("opponentPlayer1",oppPink1Img);
}
else if (r===2) {
  player1.addAnimation("opponentPlayer2",oppPink2Img);

}
else if (r===3) {
  player1.addAnimation("opponentPlayer3",oppPink3Img);

}
else if (r===4) {
  player1.addAnimation("opponentPlayer4",oppPink4Img);

}
else if (r===5) {
  player1.addAnimation("opponentPlayer5",oppPink5Img);

}
else if (r===6) {
  player1.addAnimation("opponentPlayer7",oppPink7Img);

}
        player1.setLifetime=170;
        pinkCG.add(player1);
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainHouse=createSprite(600,250);
mainHouse.addImage("mainHouse",mainHouseImg);
mainHouse.scale=1.5;
mainHouse.velocityX=-5
  
  pinkCG.destroyEach();

  
  
  distance = 0;
}