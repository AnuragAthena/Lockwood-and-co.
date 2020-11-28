var player, playerImg
var Visitor, VisitorImg, VisitorGroup;
var scary;
var gameState ="start"
var startB
var playB;

var playerScore = 0;
var time = 60;

function preload(){
VisitorImg = loadImage("ghost-standing.png");
playerImg = loadImage("rapier.png");
scary = loadImage("scary.png");
}

function setup(){
createCanvas(displayWidth, displayHeight)
player = createSprite(displayWidth/2, displayHeight-100, 10, 10);
player.addImage(playerImg)
player.scale = 0.1

startB = createSprite(displayWidth/2, displayHeight/2, 153, 70)
playB = createSprite(displayWidth-100, displayHeight-100, 153, 70)
VisitorGroup = new Group();
startB.visible = false;
playB.visible = false;
player.visible = false;
}

function draw(){
background(scary)
if(gameState === "start"){
start();
}

if(gameState === "transition"){
transition();
}
if(gameState === "play"){
    play();
    }
    if(gameState === "end"){
        end();
        }
drawSprites();

}

function spawnVisitor(){
    var rand = Math.round(random(100, displayWidth-100))
    if(frameCount % 60 === 0){
       Visitor = createSprite(rand, 30, 30, 30)
       Visitor.addImage(VisitorImg);
       Visitor.scale = 0.43;
       Visitor.velocityY = 4;
   VisitorGroup.add(Visitor)
    }
   
}

function play(){
    background("black")
// divider.visible = true;
    player.visible = true
    if(keyDown(LEFT_ARROW)){
        player.x = player.x-8
        }
        
        if(keyDown(RIGHT_ARROW)){
        player.x = player.x+8
        }
        for (var i = 0; i < VisitorGroup.length; i++) {
          if (VisitorGroup.get(i).isTouching(player)) {
            VisitorGroup.get(i).destroy();
            playerScore = playerScore+10
                                       
           }
        if(frameCount % 24 === 0){
time = time -1
        }     
        textSize(33)
        text("Time left : "+time, displayWidth/8, displayHeight/8)
        if(time === 0){
gameState = "end"
        }
                    }
        spawnVisitor()
}




function start(){
    fill("black")
    textSize(50);
    fill("gold")
    text("Lockwood and Co.", displayWidth/2-600, 100);
    text(40);
    fill("black")
    text("START", displayWidth/2-50, 400);
    // startB.visible = true;
   
    if(mousePressedOver(startB)){
     gameState = "transition"
    }
}

function transition(){
    background("black")
    // startB.visible = false
    textAlign(CENTER,TOP)
    textSize(18)
    text("The Anthony Lockwood has lost his sister, Jessica Lockwood to a Visitor", displayWidth/2, 50)
     text("He destroyed the Visitor afterwards but it was too late", displayWidth/2, 120) 
     text("It was this reason that 'Gravedigger' Nigel Skyes trained him and gave him a job.", displayWidth/2, 190)
      text("After the death of his master, he formed his own agency, in the honor of him.", displayWidth/2, 260)
      text(" It was named Lockwood and Co. Along with Lucy Caryly and George Cubbins, he hunted many Visitors.", displayWidth/2, 330)
      text(" Now they have got a new client and when they researched about the history of the Haunting,", displayWidth/2, 400)
      text(" they were shocked by the gruesome murder involved in the haunting.", displayWidth/2, 470)
      text("To put an end to the hauntings, they have to visit the Other Side, where time is not the same as of the Living world", displayWidth/2, 540)
      text(" Things are going to be a lot more difficult.....", displayWidth/2, 610)
      textSize(40)
       text("PLAY",displayWidth-100,displayHeight-100)
    if(mousePressedOver(playB)){ gameState = "play"}  
}

function end(){
    background("black")
    VisitorGroup.destroyEach();
    player.visible= false;
    textSize(40)
    text("GAME OVER", displayWidth/2, displayHeight/2)
    text("PLayer Score : "+playerScore, displayWidth/2-50, displayHeight/2+100)
    }