let  myGamePiece;
let myScore;
let myObstacles =[];
let myBackground;



function startGame(){
    myGamePiece= new Component(80,80,"icon.png",50,330,"image");
    myScore=new Component("200px","150px", "white", 650,100,"text");
    myBackground= new Component(1000,750, "br2.jpg", 0,0,"background");
    myGameArea.start();
}

