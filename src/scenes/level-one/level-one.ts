import * as ex from 'excalibur';
import {Paddle} from '../../actors/player/paddle';
import {Ball} from '../../actors/ball';
import {Brick} from '../../actors/brick';
import * as Events from "excalibur/dist/Events";

export class LevelOne extends ex.Scene {

    public bricks: Array<Brick> = [];

    private _padding: number = 20;
    private _xoffset: number = 100;
    private _yoffset: number = 20;
    private _columns: number = 5;
    private _rows: number = 3;

    private score: number = 0;

    private _brickColours = [
        ex.Color.Violet,
        ex.Color.Orange,
        ex.Color.Yellow
    ];

    public onInitialize(engine: ex.Engine) {

        const paddle = new Paddle(new ex.Vector(150, engine.drawHeight - 40));

        engine.input.pointers.primary.on('move', function (evt) {
            paddle.pos.x = evt.target.lastWorldPos.x;
        });

        let ball = new Ball(engine);
        let scoreLabel = new ex.Label('Total score: ' + this.score, 50, 50);

        this.add(scoreLabel);
        this.add(paddle);
        this.add(ball);

        let brickWidth = engine.drawWidth / this._columns - this._padding - this._padding / this._columns;

        for (let j = 0; j < this._rows; j++) {
            for (let i = 0; i < this._columns; i++) {
                let tempBrick = new Brick(new ex.Vector(
                    this._xoffset + i * (brickWidth + this._padding) + this._padding,
                    this._yoffset + j * (30 + this._padding) + this._padding
                ), brickWidth, 30)

                tempBrick.color = this._brickColours[j % this._brickColours.length];
                this.bricks.push(tempBrick);
                engine.add(tempBrick);
            }
        }

        this.on('brickRemove', (env) => {
            this.score += 10;
        });
    }

    public onActivate() {
    }

    public onDeactivate() {
    }
}
