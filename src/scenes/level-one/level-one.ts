import * as ex from 'excalibur';
import {Paddle} from '../../actors/player/paddle';
import {Ball} from '../../actors/ball';
import {Brick} from '../../actors/brick';
import * as Score from '../../events/score';

export class LevelOne extends ex.Scene {

    private _padding: number = 20;
    private _xoffset: number = 100;
    private _yoffset: number = 50;
    private _columns: number = 10;
    private _rows: number = 6;

    private score: number = 0;
    private scoreLabel: ex.Label = null;

    public onInitialize(engine: ex.Engine) {

        const paddle: Paddle = new Paddle(new ex.Vector(150, engine.drawHeight - 40));

        let ball: Ball = new Ball(engine);
        this.scoreLabel = new ex.Label('Total score: ' + this.score, 50, 50);

        this.add(this.scoreLabel);
        this.add(paddle);
        this.add(ball);

        ball.setPaddle(paddle);

        engine.input.pointers.primary.on('move', function (evt) {
            paddle.pos.x = evt.target.lastWorldPos.x;
        });

        engine.input.pointers.primary.on('move', function (evt) {
            if (ball.getPaddle() !== null){
                ball.pos.x = evt.target.lastWorldPos.x;
            }
        });

        engine.input.pointers.primary.on('down', function (evt) {
            ball.setPaddle(null);
            ball.vel.setTo(700, 600);
        });

        this.scoreLabel.setZIndex(1);
        this.scoreLabel.fontSize = 50;

        const brickWidth = engine.drawWidth / this._columns - this._padding - this._padding / this._columns;

        for (let j = 0; j < this._rows; j++) {
            for (let i = 0; i < this._columns; i++) {
                let brick = new Brick(new ex.Vector(
                    this._xoffset + i * (brickWidth + this._padding) + this._padding,
                    this._yoffset + j * (30 + this._padding) + this._padding
                ), brickWidth, 30)

                brick.setHealthPoints(j);
                engine.add(brick);
            }
        }

        this.on('scoreupdate', this.updateScore);
        this.on('gameover', (env) => {

            const gameOverLabel: ex.Label = new ex.Label('Loser', engine.halfDrawHeight, engine.halfDrawWidth );
            console.log(engine.drawHeight - (gameOverLabel.getHeight() / 2) / 2)
            gameOverLabel.fontSize = 50;
            this.add(gameOverLabel);

            engine.stop();
        })
    }

    public updateScore() {
        this.score += 10;
        this.scoreLabel.text = 'Total score: ' + this.score;
    }

    public onActivate() {
    }

    public onDeactivate() {
    }
}
