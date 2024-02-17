import Phaser from 'phaser'; //import Phaser


export class MainScene extends Phaser.Scene {

  bricks: any;
  paddle: any;
  ball: any;

  bgText!: Phaser.GameObjects.Text;
  yesBtn!: Phaser.GameObjects.Text;
  noBtn!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  hitBrick(ball: any, brick: any) {
    brick.disableBody(true, true);

    if (this.bricks.countActive() === 0) {
      this.winState();
    }
  }

  resetBall() {
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 500);
    this.ball.setData('onPaddle', true);
  }

  winState() {
    this.resetBall();
    this.bgText.setText(["You Win!", "Will you be my", "Valentine?"]);

    this.yesBtn = this.add.text(100, 300, "Yes", {color: "#fae7f4"}).setInteractive().on('pointerdown', () => {
      this.bgText.setText(["YAY!", "Lets Get Weird ;)"]);
    })

    this.noBtn = this.add.text(300, 300, "No", {color: "#fae7f4"}).setInteractive().on('pointerdown', () => {
      this.bgText.setText(":(")
      this.resetLevel();
    });
  }

  resetLevel() {

    this.noBtn.destroy();
    this.yesBtn.destroy();

    this.resetBall();

    this.bricks.children.each((brick: any) => {

      brick.enableBody(false, 0, 0, true, true);

    });
  }

  hitPaddle(ball: any, paddle: any) {
    let diff = 0;

    if (ball.x < paddle.x) {
      //  Ball is on the left-hand side of the paddle
      diff = paddle.x - ball.x;
      ball.setVelocityX(-10 * diff);
    }
    else if (ball.x > paddle.x) {
      //  Ball is on the right-hand side of the paddle
      diff = ball.x - paddle.x;
      ball.setVelocityX(10 * diff);
    }
    else {
      //  Ball is perfectly in the middle
      //  Add a little random X to stop it bouncing straight up!
      ball.setVelocityX(2 + Math.random() * 8);
    }
  }

  preload() {
    this.load.atlas('assets', 'assets/spritesheet.png', 'assets/spritesheet.json');
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.bgText = this.add.text(25, 60, "I Love You Joanna!" ,{font: '32px Courier', color: "#fae7f4" });

    this.bricks = this.physics.add.staticGroup({
      key: 'assets', frame: [ 'brick1', 'brick2', 'brick3', 'brick4', 'brick5', 'brick6' ],
      frameQuantity: 6,
      gridAlign: { width: 6, height: 6, cellWidth: 64, cellHeight: 32, x: 10, y: 10 }
    });

    this.ball = this.physics.add.image(200, 500, 'assets', 'head-ball2').setCollideWorldBounds(true).setBounce(1);
    this.ball.setData('onPaddle', true);

    this.paddle = this.physics.add.image(200, 550, 'assets', 'j-paddle').setImmovable();

    //  Our colliders
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, undefined, this);
    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, undefined, this);

    this.input.on('pointermove', (pointer: any) => {
      //  Keep the paddle within the game
      this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

      if (this.ball.getData('onPaddle'))
      {
          this.ball.x = this.paddle.x;
      }
    }, this);

    this.input.on('pointerup', (pointer: any) => {

      if (this.ball.getData('onPaddle')) {
        this.ball.setVelocity(-75, -300);
        this.ball.setData('onPaddle', false);
      }

    }, this);



  }
  
  override update(){
    if (this.ball.y > 600) {
      this.resetBall();
    }
  }
}