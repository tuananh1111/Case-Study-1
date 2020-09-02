function sound(src) {
    //tạo thành phần audio
    this.sound = document.createElement("audio");
    //src lưu thông tin url của file âm thanh
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    //hàm play để phát âm thanh
    this.play = function(){
        this.sound.play();
    }
    //hàm stop để dừng âm thanh
    this.stop = function(){
        this.sound.pause();
    }
}