import "./styles.css";
import images from "../assets/*.png";


let game;
let numflowers = 0;
let numBlocks = 0;
let level = 1;
let x, y;


const gameOptions = {
  maxlevel: 3,
  manGravity: 0,
  manSpeed: 150,
  blocksize: 60,
  numMen: 3,
  numBlueFlowers: 5,
  numRedFlowers: 8,
  redFlowerScore: 20,
  blueFlowerScore: 10,
  stingScore: -80,
  levelScore: 100,
  xblocks: 14,
  yblocks: 14,
  butterflySpeed: [100, 115, 130],
  waspSpeed: [100, 120, 140],
  enemyInterval: [7000, 5500, 3500],
  butterflyRateOfEnemies: [0.7, 0.6, 0.5],
  overlapDistance: 30,
  maps: [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0,-1, 0, 0, 0, 0,-1,-1,-1,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1, 0, 0, 0, 0,-1,-1, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0,-1, 0,
      0,-1,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1, 0, 0, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1,-1,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0,-1,-1,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0, 0, 0,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0, 0, 0,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,-1,-1, 0,
      0,-1, 0, 0, 0, 0,-1,-1,-1,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1, 0, 0, 0, 0,-1,-1, 0,-1, 0,
      0,-1,-1,-1,-1,-1, 0,-1, 0,-1, 0, 0,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1, 0,-1,-1,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1, 0, 0, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1,-1,-1, 0,-1,-1, 0,
      0, 0, 0, 0,-1, 0, 0,-1,-1,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0, 0, 0,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1, 0,-1,-1,-1,-1,-1,-1,-1, 0,
      0,-1,-1, 0,-1, 0, 0, 0, 0,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,-1,-1, 0,-1,-1,-1,-1, 0,-1,-1,-1,-1, 0,
      0,-1, 0, 0,-1, 0,-1,-1,-1,-1, 0, 0,-1 ,0,
      0,-1, 0,-1,-1, 0, 0, 0, 0,-1,-1, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1, 0,-1, 0, 0,-1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1, 0,
      0,-1,-1,-1,-1,-1, 0,-1, 0, 0, 0,-1, 0, 0,
      0,-1, 0, 0,-1,-1, 0,-1, 0,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1, 0,-1,-1,-1, 0, 0,-1, 0,
      0, 0,-1, 0, 0, 0, 0, 0, 0,-1, 0,-1,-1, 0,
      0,-1,-1, 0,-1,-1,-1,-1,-1,-1, 0,-1,-1, 0,
      0,-1, 0, 0,-1, 0, 0, 0, 0,-1, 0, 0,-1, 0,
      0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
  ]
}


window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x22b14c,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameOptions.blocksize * gameOptions.xblocks,
        height: gameOptions.blocksize * gameOptions.yblocks
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: PlayGame
  };
  
  game = new Phaser.Game(gameConfig);
  window.focus();
}


class PlayGame extends Phaser.Scene {

  constructor() {
      super("PlayGame");
      this.score = 0;
  }

  preload() {
    this.load.image("block", require("../assets/block_grey.png"));
    this.load.image("flowerBlue", require("../assets/flower_blue.png"));
    this.load.image("flowerRed", require("../assets/flower_red.png"));
    this.load.spritesheet("man", require("../assets/man.png"), { frameWidth: 46, frameHeight: 46 });
    this.load.spritesheet("butterfly", require("../assets/Butterfly.png"), { frameWidth: 75, frameHeight: 75 });
    this.load.spritesheet("wasp", require("../assets/wasp.png"), { frameWidth: 75, frameHeight: 75 });
    this.load.audio("sting", [require("../assets/bzzz.mp3")]);
    this.load.audio("suck", [require("../assets/suck.mp3")]);
//    this.load.tilemapCSV("map", "../assets/map_1.csv");
  }

  create() {
    let flowers = [];
    let blocks = [];

    this.blockGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })
    this.blueFlowerGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })
    this.redFlowerGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })

    x = 0;
    y = 0;
    gameOptions.maps[level-1].forEach((square) => {
//      console.log("ruutu: ",x,y,square)
      if(square == 0) {
        this.blockGroup.create(x*gameOptions.blocksize + gameOptions.blocksize/2, y*gameOptions.blocksize + gameOptions.blocksize/2, "block");
        blocks[numBlocks] = {x: x*gameOptions.blocksize + gameOptions.blocksize/2, y: y*gameOptions.blocksize + gameOptions.blocksize/2};
        numBlocks ++;
      }
      if (x >= gameOptions.xblocks-1) {
        x = -1;
        y += 1;
      }
      x++;
    });

    for(let i = 0; i < gameOptions.numBlueFlowers; i++) {
      x = Phaser.Math.Between(1, gameOptions.xblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      y = Phaser.Math.Between(1, gameOptions.yblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      let allowed = true;
      for (let j = 0; j < numBlocks; j++) {
        if (x == blocks[j].x && y == blocks[j].y) { 
          allowed = false;
          i--;
          console.log("ei käy");
          break;
        }
      }
      for (let j = 0; j < numflowers; j++) {
        if (x == flowers[j].x && y == flowers[j].y) {
          allowed = false;
          i--;
          console.log("ei käy");
          break;
        }
      }
      if (allowed == true){
        this.blueFlowerGroup.create(x, y, "flowerBlue");
        flowers[numflowers] = {x: x, y: y};
        numflowers ++;
      }
    }

    for(let i = 0; i < gameOptions.numRedFlowers; i++) {
      x = Phaser.Math.Between(1, gameOptions.xblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      y = Phaser.Math.Between(1, gameOptions.yblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      let allowed = true;
      for (let j = 0; j < numflowers; j++) {
        if (x == flowers[j].x && y == flowers[j].y) {
          allowed = false;
          i--;
          console.log("ei käy");
          break;
        }
      }
      for (let j = 0; j < numBlocks; j++) {
        if (x == blocks[j].x && y == blocks[j].y) {
          allowed = false;
          i--;
          console.log("ei käy");
          break;
        }
      }
      if (allowed == true) {
        this.redFlowerGroup.create(x, y, "flowerRed");
        flowers[numflowers] = {x: x, y: y};
        numflowers ++;
      }
    }

    this.man = this.physics.add.sprite(gameOptions.blocksize*1.5, gameOptions.blocksize*1.5, "man");

    this.butterflyGroup = this.physics.add.group({});
    this.waspGroup = this.physics.add.group({});

    this.stingSound = this.sound.add("sting", {loop: false});
    this.suckingSound = this.sound.add("suck", {loop: false});

// perhosen lento:
    this.anims.create({
      key: "bfleft",
      frames: this.anims.generateFrameNumbers("butterfly", {start: 2, end: 3}),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "bfright",
      frames: this.anims.generateFrameNumbers("butterfly", {start: 0, end: 1}),
      frameRate: 5,
      repeat: -1
    });


// ampiaisen lento:
    this.anims.create({
      key: "waspleft",
      frames: this.anims.generateFrameNumbers("wasp", {frames: [0]}),
      repeat: 0
    });
    this.anims.create({
      key: "waspright",
      frames: this.anims.generateFrameNumbers("wasp", {frames: [1]}),
      repeat: 0
    });

    this.triggerTimer = this.time.addEvent({
      callback: this.addEnemies,
      callbackScope: this,
      delay: gameOptions.enemyInterval[level-1],
      loop: true
    });
 
    this.physics.add.collider(this.man, this.blockGroup);
    this.physics.add.overlap(this.man, this.redFlowerGroup, this.collectFlower, this.isCloseEnoughll, this);
    this.physics.add.overlap(this.man, this.blueFlowerGroup, this.collectFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.butterflyGroup, this.blueFlowerGroup, this.butterflySucksFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.butterflyGroup, this.redFlowerGroup, this.butterflySucksFlower, this.isCloseEnough, this);
    this.physics.add.overlap(this.man, this.waspGroup, this.waspStings, this.isCloseEnough, this);
    
    this.gameText = this.add.text(0, 0, `Level ${level}`, {fontSize: "36px", fill: "#000000", fontStyle: "bold"})
    this.scoreText = this.add.text(game.config.width - 1.75*gameOptions.blocksize, gameOptions.blocksize/2, this.score, {fontSize: "36px", fill: "#000000", fontStyle: "bold"});
    for (let i = 1; i <= gameOptions.numMen; i++) {
      const img = this.add.image(game.config.width - i*gameOptions.blocksize/2, gameOptions.blocksize/4, "man");
      img.setScale(0.5);
    }

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  isCloseEnough(body1, body2) {
    if (Math.abs(body1.body.position.x - body2.body.position.x) < gameOptions.overlapDistance && Math.abs(body1.body.position.y - body2.body.position.y) < gameOptions.overlapDistance) {
      return true;
    }
    return false;
  }

  collectFlower(man, flower) {
    flower.disableBody(true, true);
    if (flower.body.gameObject.texture.key == "flowerBlue") this.score += gameOptions.blueFlowerScore;
    else this.score += gameOptions.redFlowerScore;
    this.scoreText.setText(this.score);
    numflowers --;
    if(numflowers == 0) { 
      this.butterflyGroup.getChildren().forEach(element => {
        this.butterflyGroup.killAndHide(element);
      });
      this.waspGroup.getChildren().forEach(element => {
        this.waspGroup.killAndHide(element);
      });
      this.score += gameOptions.levelScore;
      this.scoreText.setText(this.score);
      if (level == gameOptions.maxlevel) { 
        this.gameText.setText(`Level ${level} completed, game finished`);
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.score = 0;
            this.flowers = [];
            this.blocks = 0;
            level = 1;
            this.scene.start("PlayGame");
          },
          loop: true
        });
      }
      else {
        this.gameText.setText(`Level ${level} completed`);
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            level ++;
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = [];
        // seuraava level:
            this.scene.start("PlayGame");
          },
          loop: true
        })
      }
    }
  }



  butterflySucksFlower(butterfly, flower) {
    this.suckingSound.play();
    flower.disableBody(true, true);
    if (flower.body.gameObject.texture.key == "flowerBlue") this.score -= gameOptions.blueFlowerScore/2;
    else this.score -= gameOptions.redFlowerScore/2;
    this.scoreText.setText(this.score);
    numflowers --;
    if(numflowers == 0) {
      this.score += gameOptions.levelScore;
      this.scoreText.setText(this.score);
      this.butterflyGroup.getChildren().forEach(element => {
        this.butterflyGroup.killAndHide(element);
      });
      this.waspGroup.getChildren().forEach(element => {
        this.waspGroup.killAndHide(element);
      });
      if (level == gameOptions.maxlevel) { 
        this.gameText.setText(`Level ${level} completed, game finished`);
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            numflowers = 0;
            numBlocks = 0;
            this.score = 0;
            this.flowers = [];
            this.blocks = [];
            level = 1;
            this.scene.start("PlayGame");
          },
          loop: true
        });
      }
      else { 
        this.gameText.setText(`Level ${level} completed`);
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            level ++;
            numflowers = 0;
            numBlocks = 0;
            this.flowers = [];
            this.blocks = [];
        // seuraava level:
            this.scene.start("PlayGame");
          },
          loop: true
        })
      }
    }
  }

  waspStings(man, wasp) {
    this.stingSound.play();
    man.disableBody(true, true)
    gameOptions.numMen--;
    this.score += gameOptions.stingScore;
    this.scoreText.setText(this.score)
    if(gameOptions.numMen == 0) { 
      this.gameText.setText(`Game over`);
      level = 1;
      this.score = 0;
    }
    this.butterflyGroup.getChildren().forEach(element => {
      this.butterflyGroup.killAndHide(element);
    });
    this.waspGroup.getChildren().forEach(element => {
      this.waspGroup.killAndHide(element);
    });
    this.time.addEvent({
      delay: 2000,
      callback: ()=>{
        numflowers = 0;
        numBlocks = 0;
        this.flowers = [];
        this.blocks = [];
        this.scene.start("PlayGame");
      },
      loop: true
    })
  }

  addEnemies() {
    if(Phaser.Math.FloatBetween(0, 1) <= gameOptions.butterflyRateOfEnemies[level-1]) {
      let bf = this.butterflyGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "butterfly");
      bf.setVelocityY(-gameOptions.butterflySpeed[level-1]);
      if (Phaser.Math.Between(0,1)) {
        bf.setVelocityX(gameOptions.butterflySpeed[level-1]/1.7);
        bf.anims.play("bfright", true);
      }
      else {
        bf.setVelocityX(-gameOptions.butterflySpeed[level-1]/1.7);
        bf.anims.play("bfleft", true);
      }
    }
    else {
      let w = this.waspGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "wasp");
      w.setVelocityY(-gameOptions.waspSpeed[level-1]);
      if (Phaser.Math.Between(0,1)){
        w.setVelocityX(gameOptions.waspSpeed[level-1]/1.7);
        w.anims.play("waspright", true);
      }
      else {
        w.setVelocityX(-gameOptions.waspSpeed[level-1]/1.7);
        w.anims.play("waspleft", true);
      }
    }
  }

  update() {
    if(this.cursors.left.isDown) {
      this.man.body.velocity.x = -gameOptions.manSpeed
    }
    else if(this.cursors.right.isDown) {
      this.man.body.velocity.x = gameOptions.manSpeed
    }
    else if(this.cursors.up.isDown) {
      this.man.body.velocity.y = -gameOptions.manSpeed
    }
    else if(this.cursors.down.isDown) {
      this.man.body.velocity.y = gameOptions.manSpeed
    }
    else{
      this.man.body.velocity.x = 0;
      this.man.body.velocity.y = 0;
    }
  }
}
