class SpriteObject extends GameObject{

    constructor(img, x, y, vx, vy, canvas_width, canvas_height, no_of_frames, is_background_move_parametr, scale_parametr1, scale_parametr2, translate_parametr1, translate_parametr2, timeout, w, h, 
	is_jump, jumpHeight, jumpStartY){
        super(img,x,y,timeout);
        this.no_of_frames = no_of_frames;
		this.scale_parametr1 = scale_parametr1;
		this.scale_parametr2 = scale_parametr2;
		this.translate_parametr1 = translate_parametr1;
		this.translate_parametr2 = translate_parametr2;
		this.is_jump = is_jump;
        this.frame=0;
		this.is_background_move_parametr = is_background_move_parametr;
        this.w = w;
        this.h = h;
		this.vx = vx;
		this.vy = vy;
		this.gravity = 1;
		this.gravitySpeed = 5;
		this.bounce = 0.6;
		this.canvas_width = canvas_width;
		
		this.isUp = false;
		//this.jumpHeight = jumpHeight;
		//this.jumpStartY = jumpStartY;
		
		this.jumpHeight = this.y - this.h/2;
		this.jumpStartY = this.y;
    }
	/* 
	hitBottom() {
        var rockbottom = canvas_height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }
	
	newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.vx;
        this.y += this.vy + this.gravitySpeed;
        hitBottom();
    }
	 */
    update(){
		if(this.is_background_move_parametr==true){
        this.frame = (this.frame+1)%(this.no_of_frames-1);
		}
		else{
			this.frame = 5;
		}
		
		if (this.x*this.scale_parametr1<0){
			console.log("update sprite - this.x*this.scale_parametr1<0 -");
            this.x = this.canvas_width;
        }
		if (this.x*this.scale_parametr1>this.canvas_width){
			console.log("update sprite - this.x*this.scale_parametr1>this.canvas_width -");
            this.x = 0;
        }
        else {this.x-=this.vx;}
        this.y+=this.vy;
        //console.log("update sprite");
		
		
		//---------------------------------------------------console.log("----> is_jump: " + this.is_jump);
		if(this.is_jump == true){
			//ustawiam numer klatki do wyswietlenia dla skoku
			this.frame = 2;
			var rockbottom = this.canvas_height - this.h;
			var jumpHeight2 = this.y - this.h/2;
			var jumpStartY2 = this.y;
			
			if(this.y >= this.jumpHeight && this.isUp == true){
				this.gravitySpeed += this.gravity;
				this.x += this.vx;
				this.y += this.vy - this.gravitySpeed/2;
				console.log("--> y: " + this.y);
				if(this.y = this.jumpHeight){
					this.isUp = false;
				}
			}
			else if(this.y <= this.jumpHeight + this.h && this.isUp == false){
				
				this.gravitySpeed += this.gravity;
				this.x += this.vx;
				this.y += this.vy + this.gravitySpeed;
			}
			if (this.y > this.jumpStartY) {
				this.gravitySpeed = -(this.gravitySpeed * this.bounce);
				this.is_jump = false;
			}
		}
		
        setTimeout(this.update.bind(this),this.timeout);
    }
	

    draw(ctx){
        ctx.save();
        ctx.translate(this.translate_parametr1,this.translate_parametr2);
        ctx.scale(this.scale_parametr1,this.scale_parametr2);
		
        ctx.drawImage(this.img,
            this.frame*this.img.width/this.no_of_frames,0,
            this.img.width/this.no_of_frames,this.img.height,
            this.x, this.y,
            this.w, this.h);
        ctx.restore();
    }
	
	
	
    
}