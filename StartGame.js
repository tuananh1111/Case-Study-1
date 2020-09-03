let  myGamePiece;
let myScore;
let myObstacles =[];
let myBackground;



function startGame(){
    myGamePiece= new Component(80,80,"icon.png",50,330,"image");
    myScore=new Component("200px","150px", "white", 650,100,"text");
    myBackground= new Component(1000,750, "background.png", 0,0,"background");
    myGameArea.start();
}

// function restart(){
//     myGameArea.stop();
//     myGameArea.start();
//     let number=myObstacles.length;
//     for(let i=0; i<number; i++){
//         myObstacles.shift(i);
//         myObstacles.shift(i+1);
//     }
//     myGamePiece.clearComponent();
//     document.getElementById('gameover').innerHTML='';
// }
