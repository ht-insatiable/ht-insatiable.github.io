let pallete=["#2E3C8F","#BF3434","#C25968","#FC755D","#6D1F75","#FED9A9","#FFFBFA"];
let vortexs=[];
let s;
let planets=[];
let p=[];

function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  s=0.01;
  for(let i=0;i<2400;i+=6){
    vortexs.push(new Vortex(i,s));
  }
  planets.push(new Planet());
  background(0);
}



function draw() {
  fill(0,0,0,20);
  noStroke();
  rect(0,0,width,height);
  translate(width/2,8*height/9);
  for(let vor of vortexs){
    vor.dispaly();
    vor.update();
  }
  for(let p=0;p<planets.length;p++){
    planets[p].display();
    planets[p].update();
    if(planets[p].life==0){
      explode(planets[p].x,planets[p].y,planets[p].c);
      planets.splice(p,1);
    }
  }

  for (let i = 0; i < p.length; i++) {
    p[i].show();
    p[i].move();
    p[i].gravity();
    if (p[i].r < 0) {
      p.splice(i, 1);
    }
  }

  let i=int(random(0,5));
  if(i==1){
    planets.push(new Planet());
  }

    //if(20<i<33) circle(0,0,i*i);
  //console.log(vortexs[400].s);
}

class Vortex {
  constructor(_p,_s) {
    this.x=_p*sqrt(_p)/75;
    this.y=_p*sqrt(_p)/150;
    //this.c=pallete[int(random(pallete.length))];
    this.c=[255];
    this.s=_s+random(0.01);
    this.r=_p;
    this.w=int(random(this.y/50,this.y/45+1));
  }
  update(){
    //this.x+=random(-1.2,1.2);
    //this.y-=0.02;
    this.r+=this.s;
    if(mouseIsPressed){
      this.s+=0.0002;
    }else{
      this.s-=0.0002;
    }
    this.s=constrain(this.s,0.01,0.1);
  }
  dispaly(){
    noFill();
    stroke(this.c);
    strokeWeight(1);
    arc(0,-this.r*sqrt(this.r)/500,this.x,this.y,this.r,this.r+PI/48);
    //fill(this.c);
    //circle(this.x,this.y,this.w);
  }
}

class Planet {
  constructor() {
    this.r=0;
    this.x=0;
    this.y=0;
    this.s=random(0.5,2);
    this.a=random(-3,3);
    this.radius=random(15,25);
    this.life=int(random(360,4800));
    this.c=pallete[int(random(pallete.length))];
  }

  update(){
    this.r++;
    this.x=10*sqrt(this.r)*cos(this.s*sqrt(this.r))+this.a;
    this.y=5*sqrt(this.r)*sin(this.s*sqrt(this.r))-sqrt(this.r)*4+this.a;
    if((mouseX-width/2)<(this.x+this.radius)
        &&(mouseX-width/2)>(this.x-this.radius)
        &&(mouseY-8*height/9)<(this.y+this.radius)
        &&(mouseY-8*height/9)>(this.y-this.radius)){
          if(mouseIsPressed){
            console.log(this.x);
            this.life=0;
          }
    }else{
      this.life--;
    }
  }

  display(){
    fill(this.c);
    noStroke();
    circle(this.x,this.y,this.radius);
  }
}

class Particle {
  constructor(x,y,c) {
    this.x = x;
    this.y = y;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.r = 15;
    this.c = c;
  }

  show() {
    fill(this.c);
    ellipse(this.x, this.y, this.r, this.r);
  }

  gravity() {
    this.xSpeed += 0.001;
    this.ySpeed += 0.04;
  }

  move() {
    this.r -= 0.3;
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }
}


function explode(x,y,c){
  for ( i = 0; i<10; i++){
    p.push(new Particle(x,y,c));
  }
}
