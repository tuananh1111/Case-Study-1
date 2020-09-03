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
        let ctx = myGameArea.context;
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
        // if (this.type =="background"){
        //     if(this.x == -(this.width)){
        //         this.x=0;
        //     }
        // }
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
    this.crashCanvas= function (){
        let myleft= this.x;
        let myright= this.x + this.width;
        let mytop= this.y;
        let mybottom= this.y + this.height;
        if (myleft<0){this.x=0}
        if(mytop<0){this.y=0}
        if (mybottom>myGameArea.canvas.height){
            mybottom = myGameArea.canvas.height
        }
        if (myright>myGameArea.canvas.width){
            myright=myGameArea.canvas.width
        }
    }
    // this.clearComponent=function (){
    //     this.x=10;
    //     this.y=300;
    //     this.update();
    // }
}