let  myGamePiece;
let myScore;
let myObstacles =[];
let myBackground;



function startGame(){
    myGamePiece= new Component(80,80,"img/icon.png",50,330,"image");
    myScore=new Component("200px","150px", "white", 650,100,"text");
    myBackground= new Component(1000,750, "img/background.png", 0,0,"background");
    myGameArea.start();
}
function updateGameArea() {
    let x,y;
    for(let i=0;i<myObstacles.length;i++){
        if (myGamePiece.crashWith(myObstacles[i])){
            myGameArea.stop();
            document.getElementById('gameover').innerHTML= "GAME OVER";
            return;
        }
    }
    if (myGamePiece.crashCanvas()){
        return true;
    }
    myGameArea.clear();
    myBackground.newPos();
    myBackground.update();
    myGameArea.frameNo+=1;

    if(myGameArea.frameNo == 1 || everyInterval(90)){
        x=myGameArea.canvas.width;
        y=myGameArea.canvas.height;
        let minHeight =100;
        let maxHeight= 600;
        let height= Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        let gap=150;
        myObstacles.push(new Component(60,height, "yellow",x,0));
        myObstacles.push(new Component(60,y-height-gap, "yellow",x,height+gap));

    }
    for (let i=0; i<myObstacles.length;i++){
            myObstacles[i].speedX=-6;
            myObstacles[i].newPos();
            myObstacles[i].update();

    }
    // for (let i=0; i<myObstacles.length;i++){
    //     myObstacles[i].speedX=-5;
    //     myObstacles[i].newPos();
    //     myObstacles[i].update();
    // }
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {
        myGamePiece.speedX = -5;
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
        myGamePiece.speedX = 5;
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.speedY = -5;
    }
    if (myGameArea.keys && myGameArea.keys[40]) {
        myGamePiece.speedY = 5;
    }
    myGamePiece.newPos();
    myGamePiece.update();
    myScore.text="Score: "+ (myGameArea.frameNo);
    myScore.update();
    if(myGameArea.frameNo>500){
        clearInterval(this.interval);
        this.interval= setInterval(updateGameArea,10);
    }
}
function everyInterval(n){
    if((myGameArea.frameNo / n) % 1 == 0){
        return true;
    }
    return false;
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
