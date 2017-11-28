// variables
var button1;
var button2;
var button3;
var button4;
var answer;
var dictionary;
var vol;
var signal;
var library;
var rubber;
var img;

//craft.js
//impact.js

function Rubber(canvasID) {
  this.canvas = $('#canvas');
  this.ctx = this.canvas[0].getContext('2d');
  this.width = this.canvas[0].width;
  this.height = this.canvas[0].height;
  this.rect = this.canvas[0].getBoundingClientRect();
  this.background = '#43B4FB';
  this.canvas.css('cursor','pointer');
  this.ctx.font = '64pt Arial';
  this.ctx.textAlign = 'center';
  this.imgFolder = '/images/literacy-game/';
  this.trackp = new Background(this, 'trackp', 'plain');
  this.tracks = new Background(this, 'tracks', 'plain');
  this.grass = new Background(this, 'grass', 'scroll');
  this.stands = new Background(this, 'stands', 'scroll');
  this.fans = new Background(this, 'fans', 'scroll');
  //this.clouds = new Background(this, 'wcloudsg', 'scroll');
  this.mountains = new Background(this, 'mountains', 'scroll');
  this.player = new Player(this, 'lucas', 'stand', this.imgFolder + 'maleCharacter.png');
  this.shadow = new Player(this, 'shadow', 'stand', this.imgFolder + 'maleShadowCharacter.png');
}

function Background(rubber, name, state){
  this.rubber = rubber;
  this.canvasBounds = rubber.canvas[0].getBoundingClientRect();
  this.ctx = rubber.canvas[0].getContext('2d');
  this.img = document.createElement('img');
  this.imgName = '/images/literacy-game/backgroundSprite.png';
  this.name = name;
  this.img.src=this.imgName;
  this.boundingWidth = this.img.width;
  this.boundingHeight = this.img.height;
  this.state = state;
  this.stateCount = null;
  this.sourceWidth = null;
  this.sourceHeight = null;
  this.sourceX = null;
  this.sourceY = null;
  this.x = 0;
  this.y = 0;
  this.offsetX = 0;
  this.offsetY = 0;
  this.velY = 0;
  this.velX = 0;
  this.resizeWitdth = 0;
  this.resizeHeight = 0;
  this.setSource(this);
}


Background.prototype.setSource = function(){
  switch(this.name){
  case 'trackp':
    this.sourceWidth = 28;
    this.sourceHeight = 24;
    this.sourceX = 3;
    this.sourceY = 17;
    this.y = this.rubber.height-this.sourceHeight;
    break;
  case 'tracks':
    this.sourceWidth = 28;
    this.sourceHeight = 24;
    this.sourceX = 3;
    this.sourceY = 17;
    this.y = this.rubber.trackp.y-(this.sourceHeight-5);
    break;
  case 'grass':
    this.sourceWidth = 245;
    this.sourceHeight = 24;
    this.sourceX = 4;
    this.sourceY = 86;
    this.x = this.rubber.width-this.sourceWidth;
    this.y = this.rubber.tracks.y-this.sourceHeight;
    break;
  case 'stands':
    this.sourceWidth = 23;
    this.sourceHeight = 27;
    this.sourceX = 91;
    this.sourceY = 110;
    this.x = this.rubber.width-this.sourceWidth;
    this.y = this.rubber.grass.y-this.sourceHeight;
    break;
  case 'fans':
    this.sourceWidth = 25;
    this.sourceHeight = 22;
    this.sourceX = 120;
    this.sourceY = 110;
    this.x = this.rubber.width-this.sourceWidth;
    this.y = this.rubber.stands.y-this.sourceHeight;
    break;
  case 'mountains':
    this.sourceWidth = 78;
    this.sourceHeight = 26;
    this.sourceX = 114;
    this.sourceY = 149;
    this.x = this.rubber.width-this.sourceWidth;
    this.y = this.rubber.fans.y-this.sourceHeight;
    break;
  case 'wcloudsg':
    this.sourceWidth = 60;
    this.sourceHeight = 45;
    this.sourceX = 60;
    this.sourceY = 392;
    this.resizeWidth = 20;
    this.resizeHeight = 20;
    this.x = this.rubber.width-this.sourceWidth;
    this.y = this.rubber.fans.y-this.sourceHeight;
  }
}

Background.prototype.draw = function(){
  this.checkSource();    
  this.ctx.drawImage(this.img,this.sourceX,this.sourceY,this.sourceWidth,this.sourceHeight,(this.x+this.offsetX),(this.y+this.offsetY),this.sourceWidth,this.sourceHeight);
}

Background.prototype.checkSource = function(){
  switch(this.name){
  case 'track':
    switch(this.state){
    case 'plain':
      this.sourceY = 17;
      this.stateCount = 1;
      break;
    }
    break;
  case 'grass':
    this.sourceY = 86;
    this.stateCount = 1;
    break;
  case 'stands':
    this.sourceY = 110;
    this.stateCount = 1;
    break;
  case 'fans':
    this.sourceY = 110;
    this.stateCount = 1;
    break;
  case 'mountains':
    this.sourceY = 149;
    this.stateCount = 1;
    break;
  case 'wcloudsg':
    this.sourceY = 392;
    this.stateCount = 1;
  }
}

Background.prototype.stretch = function(){
  this.state = 'plain';
  while(this.x < this.rubber.width){
    this.x += this.sourceWidth;
    this.draw();
  }
  this.x = 0;
}

Background.prototype.scroll = function(){
  this.state = 'scroll';
  switch(this.name){
  case 'track':
    this.offsetX = 0;
    break;
  case 'grass':
    this.offsetX -= 4;
    break;
  case 'stands':
    this.offsetX -= 2;
    break;
  case 'fans':
    this.offsetX -= 2;
    break;
  case 'mountains':
    this.offsetX -= 1;
    break;
  case 'wcloudsg':
    this.offsetX -= 2;
  }
  while((this.x+this.offsetX) < this.rubber.width){
    this.x += this.sourceWidth;
    this.draw();
  }
  this.x = 0;
}

function Player(rubber, name, state, imgName){
  this.rubber = rubber;
  this.canvasBounds = rubber.canvas[0].getBoundingClientRect();
  this.ctx = rubber.canvas[0].getContext('2d');
  this.img = document.createElement('img');
  this.name = name;
  this.imgName = imgName;
  //this.imgName = this.rubber.imgFolder.concat(this.name.concat('.png'));
  this.img.src=this.imgName;
  this.boundingWidth = this.img.width;
  this.boundingHeight = this.img.height;
  this.state = state;
  this.stateCount = null;
  this.sourceWidth = null;
  this.sourceHeight = null;
  this.sourceX = null;
  this.sourceY = null;
  this.x = 0;
  this.y = 0;
  this.offsetX = 0;
  this.offsetY = 0;
  this.velY = 0;
  this.velX = 0;
  this.Multiplier = 0;
  this.setSource(this);
}

Player.prototype.setState = function(state){
  this.state = state;
}

Player.prototype.setSource = function(){
  switch(this.name){
  case 'lucas':
    this.sourceWidth = 40;
    this.sourceHeight = 50;
    this.sourceX = this.sourceWidth;
    this.sourceY = 0;
    this.y = this.boundingHeight-this.sourceHeight;
    this.Multiplier = (3 * Math.random());
    break;
  case 'shadow':
    this.sourceWidth = 40;
    this.sourceHeight = 50;
    this.sourceX = this.sourceWidth;
    this.sourceY = 0;
    this.y = this.boundingHeight-((this.rubber.trackp.y-7)-this.sourceHeight);
    this.Multiplier = (3 * Math.random());
    break;
  }

}

Player.prototype.checkSource = function(){
  switch(this.name){
  case 'lucas':
    switch(this.state){
    case 'stand':
      this.sourceY = 0
      this.stateCount = 3;
      this.stand();
      break;
    case 'run':
      this.Multiplier = (3 * Math.random());
      this.sourceY = this.sourceHeight;
      this.stateCount = 7;
      this.run();
      break;
    case 'jump':
      this.Multiplier = (3 * Math.random());
      this.sourceY = this.sourceHeight;
      this.stateCount = 7;
      this.jump();
      //this.sourceY = this.sourceHeight * 2;
      //this.stateCount = 8;
      //this.jump();
      break;
    }
  break;
  case 'shadow':
    switch(this.state){
    case 'stand':
      this.sourceY = 0
      this.stateCount = 3;
      this.stand();
      break;
    case 'run':
      this.Multiplier = (3 * Math.random());
      this.sourceY = this.sourceHeight;
      this.stateCount = 7;
      this.run();
      break;
    case 'jump':
      this.Multiplier = (3 * Math.random());
      this.sourceY = this.sourceHeight;
      this.stateCount = 7;
      this.jump();
      //this.sourceY = this.sourceHeight * 2;
      //this.stateCount = 8;
      //this.jump();
      break;
    }
  break;
  }
}

Player.prototype.stand = function(){
  this.state = 'stand';
}

Player.prototype.run = function(){
  this.state = 'run';
  if(this.x < ((this.rubber.width-(this.sourceWidth))/3)){
    if(this.velX < 9){
      this.velX += (3 + this.Multiplier);
    }
  }
  else if(this.x > (((this.rubber.width-(this.sourceWidth))/3)*2)){
    if(this.velX > -9){
      this.velX -= (3 + this.Multiplier);
    }
  }
  this.x += this.velX;
}

Player.prototype.jump = function(){ //contains error, needs work
  this.state = 'jump';

  if(this.x < ((this.rubber.width-(this.sourceWidth))/3)){
    if(this.velX < 8){
      this.velX = 8;
    }
  }
/*  else if(this.x > (((this.rubber.width-(this.sourceWidth))/3)*2)){
   if(this.velX > -9){
      this.velX = 3;
    }
  }
*/
  if(this.velX < 0)
    this.velX = 8;
  this.x += this.velX;

  if(this.y > this.rubber.height/3){    
    if(this.velY < 16){
      this.velY -= 2;
    }
    this.y += this.velY;
  }
  else{
    if(this.y < this.boundingHeight-this.sourceHeight){
      this.velY += 2;
    }
    this.y += this.velY;
  }

  if(this.y == this.boundingHeight-this.sourceHeight){
    this.rubber.player.setState('run');
    return;
  }
}

Player.prototype.draw = function(){
  this.checkSource();    
  this.ctx.drawImage(this.img,this.sourceX,this.sourceY,this.sourceWidth,this.sourceHeight,(this.x+this.offsetX),(this.y+this.offsetY),this.sourceWidth,this.sourceHeight);
  if((this.sourceX % (this.sourceWidth * this.stateCount)) == 0){
    this.sourceX = this.sourceWidth;
  }
  else{
    this.sourceX += this.sourceWidth;
  }
}

Rubber.prototype.draw = function(){
  this.ctx.clearRect(0,0,this.width,this.height);
  this.ctx.fillStyle = this.background;
  this.ctx.fillRect(0,0,this.width,this.height);
  this.mountains.draw();
  this.mountains.scroll();
  //this.clouds.draw();
  //this.clouds.scroll();
  this.fans.draw();
  this.fans.scroll();
  this.stands.draw();
  this.stands.scroll();
  this.grass.draw();
  this.grass.scroll();
  this.tracks.draw();
  this.tracks.stretch();
  this.trackp.draw();
  this.trackp.stretch();
  this.shadow.draw();
  this.player.draw();
}

$(document).keypress(function(e){
  switch(e.which){
    case 32:
      rubber.player.setState('jump');
    break;
    default:
    break;
  }
})

// main
$(document).ready(function(){
  initComponents();  
});

// methods
function initComponents()
{
  rubber = new Rubber();    

  rubber.player.setState("run");
  rubber.shadow.setState("run");

  setInterval(function(){rubber.draw()}, 133);
}
