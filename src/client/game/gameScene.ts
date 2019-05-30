import 'phaser';

export class GameScene extends Phaser.Scene {
  delta: number;
  lastStarTime: number;
  starsCaught: number;
  starsFallen: number;
  starsMissed: number;
  sand: Phaser.Physics.Arcade.StaticGroup;
  info: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.delta = 1000;
    this.lastStarTime = 0;
    this.starsCaught = 0;
    this.starsFallen = 0;
    this.starsMissed = 0;
  }

  preload() {
    this.load.setBaseURL('https://raw.githubusercontent.com/mariyadavydova/starfall-phaser3-typescript/master/');
    this.load.image('star', 'assets/star.png');
    this.load.image('sand', 'assets/sand.jpg');
  }

  create() {
    this.sand = this.physics.add.staticGroup({
      key: 'sand',
      frameQuantity: 20
    });

    Phaser.Actions.PlaceOnLine(this.sand.getChildren(), new Phaser.Geom.Line(20, 580, 820, 580));
    this.sand.refresh();

    this.info = this.add.text(10, 10, '', {
      font: '24px Arial Bold',
      fill: '#FBFBAC'
    });
  }

  update(time: number, delta: number) {
    let diff: number = time - this.lastStarTime;

    if (diff > this.delta) {
      this.lastStarTime = time;

      if (this.delta > 500) {
        this.delta -= 20;
      }
  
      this.emitStar();
    }

    this.starsMissed = this.starsCaught + this.starsFallen;
    this.info.text = `${this.starsCaught} caught - ${this.starsFallen} fallen (max ${this.starsMissed})`;
  }

  private delayDestroyStar(star: Phaser.Physics.Arcade.Image) {
    return this.time.delayedCall(100, this.destroyStar(star), [star], this);
  }

  private destroyStar(star: Phaser.Physics.Arcade.Image) {
    return () => {
      star.destroy();

      if (this.starsFallen >= 10) {
        this.scene.pause();
      }
    }
  }

  private onClick(star: Phaser.Physics.Arcade.Image) { 
    return () => {
      star.setTint(0x00ff00);
      star.setVelocity(0, 0);
      this.starsCaught += 1;
      this.delayDestroyStar(star);
    }
  }

  private onFall(star: Phaser.Physics.Arcade.Image) {
    return () => {
      star.setTint(0xff000);
      this.starsFallen += 1;
      this.delayDestroyStar(star);
    }
  }

  private emitStar() {
    let x = Phaser.Math.Between(25, 775);
    let y = 26;
    let star: Phaser.Physics.Arcade.Image = this.physics.add.image(x, y, 'star');

    star.setDisplaySize(50, 50);
    star.setVelocity(0, 200);
    star.setInteractive();

    star.on('pointerdown', this.onClick(star), this);
    this.physics.add.collider(star, this.sand, this.onFall(star), null, this);
  }
}