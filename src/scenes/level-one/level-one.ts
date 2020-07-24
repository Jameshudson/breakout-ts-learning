import * as ex from 'excalibur';
import {Paddle} from '../../actors/player/paddle';
import {Ball} from '../../actors/ball';
import {Brick} from '../../actors/brick';

export class LevelOne extends ex.Scene {

    private padding: number = 20;
    private xoffset: number = 10;
    private yoffset: number = 80;
    private columns: number = 50;
    private rows: number = 6;

    protected score: number = 0;
    protected scoreLabel: ex.Label = null;

    public onInitialize(engine: ex.Engine) {

        const paddle: Paddle = new Paddle(new ex.Vector(150, engine.drawHeight - 40), engine);

        let ball: Ball = new Ball(engine);
        this.scoreLabel = new ex.Label('Total score: ' + this.score, 50, 75);

        this.add(this.scoreLabel);
        this.add(paddle);
        this.add(ball);

        this.scoreLabel.setZIndex(1);
        this.scoreLabel.fontSize = 50;

        const brickWidth = engine.drawWidth / this.columns - this.padding - this.padding / this.columns;

        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.columns; i++) {
                const brick = new Brick(new ex.Vector(
                    this.xoffset + i * (brickWidth + this.padding) + this.padding,
                    this.yoffset + j * (30 + this.padding) + this.padding
                ), brickWidth, 30, engine);

                brick.setHealthPoints(j);
                engine.add(brick);
            }
        }

        this.on('scoreupdate', (ev) => {
            this.score += 10;
            this.scoreLabel.text = 'Total score: ' + this.score;
        });

        this.on('gameover', (env) => {
            const gameOverLabel: ex.Label = new ex.Label('You a loser');

            gameOverLabel.fontSize = 50;

            gameOverLabel.pos.y = engine.halfCanvasHeight - (gameOverLabel.height / 2);
            gameOverLabel.pos.x = engine.halfDrawWidth - (gameOverLabel.getTextWidth(engine.ctx) / 2);

            this.add(gameOverLabel);

            engine.stop();
        })
    }

    public onActivate() {
    }

    public onDeactivate() {
    }
}
