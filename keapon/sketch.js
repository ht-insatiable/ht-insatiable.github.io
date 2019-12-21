let word="0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm~!@#$%^&*()-=+{}:<>?/";
let lets=[]; let targets=[];
let arr;
let bg,k1,k2,m,w,u,myFont;
let k;
let an,pn,p,np;
function preload(){
  bg=loadImage("bg.jpg");
  k1=loadImage("key1.png");
  k2=loadImage("key2.png");
  myFont=loadFont('9PX3BUS.TTF');
  m=loadImage("mouse.png");
  w=loadImage("wait.png");
  u=loadImage("user.png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  frameRate(30);
  textFont(myFont);
  imageMode(CENTER);
  for(let i=0;i<300;i++){
    lets.push(new letter(random(windowWidth),random(-30,20),0));
  }
  arr=new arrow();
  k=k1;
  an=0; pn=0; p=false; np=false;
}
function draw(){
  background(0);
  image(bg,windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  image(k,100,650,100,100);
  Tip();
  for(let i=lets.length-1;i>=0;i--){
    lets[i].show();
    if(lets[i].br<0){
      if(lets[i].xspeed==0){
        lets.push(new letter(random(windowWidth),random(-30,20),0));
      }
      lets.splice(i,1);
    }
  }
  arr.display();
  if(mouseX>50&&mouseX<150&&mouseY>600&&mouseY<700||keyIsPressed){
    k=k2;
    if(mouseIsPressed||keyIsPressed){
      arr=new arrow();
      p=true;
    }
  }else{
    p=false;
    k=k1;
  }
  if(mouseIsPressed){
    arr.yspeed-=0.25;
    arr.xspeed=arr.yspeed/tan(arr.angle);
    arr.yspeed=constrain(arr.yspeed,-20,0);
  }
  if(arr.release){
    arr.move();
  }else{
    arr.angle=map(mouseY,0,windowHeight,-PI/2,0)
  }
  if(random(1)<0.1) targets.push(new Target());
  for(let i=targets.length-1;i>=0; i--){
    targets[i].move();
    targets[i].display();
    targets[i].collide(arr);
    if(targets[i].die){
      targets.splice(i,1);
    }
  }
  if(np&&(!p)) pn++;
  np=p;
}
function mouseReleased(){
  if(k==k1){
    arr.release=true;
  }
}
class letter{
  constructor(x,y,xs){
    this.x=x;
    this.y=y;
    this.l=word[Math.round(random(word.length-1))];
    this.sc=random(8,18);
    this.br=255;
    this.xspeed=xs;
    this.yspeed=random(1,3);
    this.bspeed=random(2,7);
  }
  show(){
    fill(123,196,106,this.br);
    textSize(this.sc);
    text(this.l,this.x,this.y);
    this.x+=this.xspeed;
    this.y+=this.yspeed;
    this.br-=this.bspeed;
    this.yspeed+=0.1;
  }
}
class arrow{
  constructor(){
    this.x=100;
    this.y=500;
    this.xspeed=0;
    this.yspeed=0;
    this.gra=0.1;
    this.angle=-PI/4;
    this.release=false;
    this.die=false;

  }
  move(){
    if(!this.die){
      this.x+=this.xspeed;
      this.y+=this.yspeed;
      this.yspeed+=this.gra;
      this.angle=atan(this.yspeed/this.xspeed);
      if(this.x>windowWidth||this.y>windowHeight){
        this.die=true;
      }
    }else{
      this.x=100;
      this.y=500;
    }
  }
  display(){
    if(!this.die){
      push();
      translate(this.x,this.y);
      rotate(this.angle);
      image(m,0,0,60,35);
      pop();
      fill(255);
      if(this.yspeed<0){
        rect(50,550,16,30);
        if(this.yspeed<-5){
          rect(70,550,16,30);
          if(this.yspeed<-10){
            rect(90,550,16,30);
            if(this.yspeed<-15){
              rect(110,550,16,30);
              if(this.yspeed==-20){
                rect(130,550,16,30);
              }
            }
          }
        }
      }

    }else{
      image(w,100,550,60,60);
    }
  }
}

class Target{
  constructor(){
    this.x=random(windowWidth/4,windowWidth);
    this.y=-30;
    this.radius=25;
    this.yspeed=0;
    this.die=false;
  }
  move(){
    this.y+=this.yspeed;
    this.yspeed+=0.1;
    if(this.y>windowHeight){
      this.die=true;
    }
  }
  display(){
    image(u,this.x,this.y,this.radius*2,this.radius*2);
    // fill(255);
    // ellipseMode(CENTER);
    // ellipse(this.x,this.y,this.radius*2,this.radius*2);
  }
  collide(arrow){
    let nx=arrow.x+30*cos(arrow.angle);
    let ny=arrow.y+30*sin(arrow.angle);
    let d= dist(nx,ny,this.x,this.y);
    if(d<this.radius){
      textSize(30);
      fill(255);
      text("win",600,600);
      this.die=true;
      arrow.die=true;
      an++;
      for(let i=0;i<100;i++){
        lets.push(new letter(this.x,this.y,random(-3,3)));
      }
    }
  }
}
function Tip(){
  textAlign(CENTER);
  fill(255);
  textSize(24);
  text("You have shooted "+an+" person\n\nYou have inputed "+pn+" times",windowWidth/2,550);
  if(an==0&&pn>=10){
    targets.length=0;
    textSize(70);
    text("YOU DONT NEED\nTO ATTACT ANYONE\nIN THE INTERNET",windowWidth/2,windowHeight/3);
  }else if(an>2&&(pn-an)<2){
    targets.length=0;
    textSize(70);
    text("YOU ARE A\nKEY MURDER",windowWidth/2,windowHeight/3);
  }else{
    textAlign(LEFT);
    fill(255,150);
    textSize(24);
    text("TIPS:",50,300);
    textSize(18);
    text("1.Move the mouse to adjust direction.\n\n2.Press the mouse to accelerate.\n\n3.Press the keyboard to supply.",50,350);
  }
}
