
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var survivalTime=0;
var ground;
var PLAY=1;
var END=0;
var gamestate = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving" , monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() { 
  background("lightgreen");
stroke("white");
  textSize(20);
  fill("gold")
  text("Score:" + score,250,50);
  
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+ survivalTime, 100,50);
  monkey.collide(ground);
  if(gamestate === PLAY){
    banana();
    boulder();
      survivalTime=Math.ceil(frameCount/frameRate())
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
        if(keyDown ("space") && monkey.y >= 309){
       monkey.velocityY = -20;
    }
      monkey.velocityY = monkey.velocityY + 0.8;
      
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score+1;
    }
    
    if(obstacleGroup.isTouching(monkey)){
     gamestate = END; 
    }
  }
  
  if(gamestate === END){
     monkey.velocityX = 0;
     ground.velocityX = 0;
    FoodGroup.velocityX = 0;
    obstacleGroup.velocityX = 0;
    fill("red");
    textSize(30);
    text("Game Over",110,200);
    fill("black");
    textSize(30);
    text("Monkey has been eliminated",0,240);
    obstacleGroup.destroyEach(-1);
    FoodGroup.destroyEach(-1);
     
  }
  
  drawSprites();
}
function banana(){

  if (frameCount % 150 === 0) {
    bananas= createSprite(400,100,40,10);
    bananas.addImage(bananaImage);
    bananas.y = Math.round(random(100,100));
    bananas.scale = 0.1;
    
    bananas.velocityX = -3;
    bananas.lifetime = 200;
    
    FoodGroup.add(bananas);



}
  }

function boulder(){
    if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }
  
  
}