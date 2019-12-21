let word="0123456789ABCDEF";//采用的字符数组
var pic,img;
let hue=[], sat=[], bri=[], len=[];//颜色和字母数组
var taille = 15;//字体大小

function preload(){
  pic=loadImage("emma.jpg");
}
function setup() {
	createCanvas(700,437);
	frameRate(10);
  colorMode(HSB, 255);
  img=createImage(pic.width,pic.height);
  randomSeed(1000);


  for(let y=0;y<pic.height;y+=taille){//给每个格子初始化，填充数组
    for(let x=0;x<pic.width;x+=taille){
      let h=random(0,255);
      let s=random(0,255);
      let l = word[Math.round(random(word.length-1))];
      hue.push(h);
      sat.push(s);
      bri.push(255);
      len.push(l);
    }
  }
}
function draw() {
  background(0);
  pic.loadPixels();

  let i=0;

  for(let y=0;y<pic.height;y+=taille){//画每个格子并慢慢调整亮度
    for(let x=0;x<pic.width;x+=taille){
      let loc=x+y*pic.width;
      let l = word[Math.round(random(word.length-1))];
      let brightness=pic.pixels[loc*4];//获得图片对应位置亮度
      if(bri[i]>brightness){
        bri[i]--;
      }
      fill(hue[i],sat[i],bri[i]);
      textSize(taille);
      text(l,x,y);
      i++;
    }
  }
  let cols=ceil(width/taille); let rows=ceil(height/taille);//以下为随机扩散颜色
  //for(let x=1;x<cols;x++){
    //for(let y=1;y<rows;y++){
    for(let i=0;i<100;i++){
    let x=int(random(1,cols)); let y=int(random(1,rows));
      let n=x+y*cols;
      let nup=x+(y-1)*cols;
      let nle=(x-1)+y*cols;//上面和左边字母
      let dist1=dist(hue[n],sat[n],hue[nup],sat[nup]);
      let dist2=dist(hue[n],sat[n],hue[nle],sat[nle]);
      if(dist1<150){
        hue[nup]=lerp(hue[nup],hue[n],0.667);//变上面格子颜色
        sat[nup]=lerp(sat[nup],sat[n],0.667);
      }
      if(dist2<150){
        hue[nle]=lerp(hue[nle],hue[n],0.667);
        sat[nle]=lerp(sat[nle],sat[n],0.667);
      }
    }
  //  }
  //}
  //print(int(cols+1),int(rows+1),i,hue.length);
}
// 	for(var i = 0; i < x.length; i++){
// 		let l = word[Math.round(random(carac.length-1))];
// 		y[i] += taille;
// 		fill(0, 255, 0);
// 		textSize(taille);
// 		text(l, x[i], y[i]);
// 		if(y[i] > height){
// 			x[i] = floor(random(width/taille))*taille;
// 			y[i] = random(-height);
// 		}
// 	}
// }
