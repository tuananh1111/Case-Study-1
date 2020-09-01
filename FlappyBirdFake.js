let  myGamePiece;
let myScore;
let myObstacles =[];
let myBackground;


function startGame(){
    myGameArea.start();
    myGamePiece= new Component(80,80,"icon.png",50,330,"image");
    myScore=new Component("200px","150px", "white", 650,100,"text");
    myBackground= new Component(1000,750, "br2.jpg", 0,0,"background");


}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
         this.canvas.width = 1000;
         this.canvas.height =750;
         this.context = this.canvas.getContext('2d');
         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
         this.frameNo = 0;
         this.interval = setInterval(updateGameArea,20);
         window.addEventListener('keydown',function (e){
             myGameArea.keys = (myGameArea.keys || []);
             myGameArea.keys[e.keyCode] = true;
         })
        window.addEventListener('keyup', function (e){
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function (){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop : function (){
        clearInterval(this.interval);
    }
}

function Component(width,height,color,x,y,type){
    this.type=type;
    if(type=="image" || type=="background"){
        this.image= new Image();
        this.image.src= color;
    }
    this.width= width;
    this.height= height;
    this.x=x;
    this.y=y;
    this.speedX=0;
    this.speedY=0;
    this.update= function (){
        ctx = myGameArea.context;
        if(this.type=="text" ){
            ctx.beginPath();
            ctx.font="50px Georgia";
            ctx.fillStyle=color;
            ctx.fillText(this.text,this.x,this.y);
        }
        if (type=="image" ){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }else if (type=="background"){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }else {
            ctx.beginPath();
            ctx.fillStyle=color;
            ctx.fillRect(this.x,this.y, this.width,this.height);
        }
    }
    this.newPos= function (){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if (this.type =="background"){
            if(this.x == -(this.width)){
                this.x=0;
            }
        }
    }
    this.crashWith=function (otherobject){
        let myleft = this.x;
        let myright= this.x + (this.width);
        let mytop= this.y;
        let mybottom= this.y + (this.height);
        let otherleft= otherobject.x;
        let otherright= otherobject.x+(otherobject.width);
        let othertop= otherobject.y;
        let otherbottom= otherobject.y +(otherobject.height);
        let crash= true;
        if((mybottom<othertop)||(mytop>otherbottom)|| (myright<otherleft)||(myleft>otherright)){
            crash=false;
        }
        return crash;
    }
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
        myObstacles.push(new Component(60,height, "gray",x,0));
        myObstacles.push(new Component(60,y-height-gap, "gray",x,height+gap));

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
