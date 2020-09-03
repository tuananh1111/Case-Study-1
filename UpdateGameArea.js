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

    if(myGameArea.frameNo == 1 || everyInterval(120)){
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
        myObstacles[i].speedX=-5;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {
        myGamePiece.speedX = -3;
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
        myGamePiece.speedX = 3;
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.speedY = -3;
    }
    if (myGameArea.keys && myGameArea.keys[40]) {
        myGamePiece.speedY = 3;
    }
    myGamePiece.newPos();
    myGamePiece.update();
    myScore.text="Score: "+ myGameArea.frameNo;
    myScore.update();
}
function everyInterval(n){
    if((myGameArea.frameNo / n) % 1 == 0){
        return true;
    }
    return false;
}