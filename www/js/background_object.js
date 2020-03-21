class BackgroundObject extends GameObject{

    constructor(img, x, y, vx, vy, timeout, 
        canvas_width, canvas_height){
        super(img, x, y, timeout);
        this.vx = vx;
		this.vy = vy;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
    }

    update(){
        if (this.x<-this.canvas_width*2){
            this.x = 0;
        }
		if (this.x>this.canvas_width*2){
            this.x = 0;
        }
        else  this.x-=this.vx;
        //console.log("update bground "+this.timeout);
        setTimeout(this.update.bind(this),this.timeout);
    }

    draw(ctx){
        ctx.drawImage(this.img,this.x,0,
            this.canvas_width*2,this.canvas_height);
        ctx.drawImage(this.img, this.x+this.canvas_width*2, 
            0, this.canvas_width*2, this.canvas_height);
		ctx.drawImage(this.img, this.x-this.canvas_width*2, 
            0, this.canvas_width*2, this.canvas_height);
    }
    
}