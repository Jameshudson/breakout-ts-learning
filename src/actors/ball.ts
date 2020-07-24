import * as ex from 'excalibur';
import { GameEvent } from "excalibur";
import { Paddle } from "./player/paddle";

export class Ball extends ex.Actor {

    protected paddle: Paddle;

    protected ballLockedToPaddle = true;

    protected ballSpeed = 1500;

    constructor(protected engine: ex.Engine) {
        super({
            pos: new ex.Vector(150, engine.drawHeight - 80),
            width: 20,
            height: 20,
            color: ex.Color.Red
        });

        this.body.collider.type = ex.CollisionType.Active;

        this.engine.input.pointers.primary.on('move', (ev) => {
            if (this.paddle !== null) {
                this.body.pos.x = ev.target.lastWorldPos.x;
            }
        });
        this.engine.input.pointers.primary.on('down', (env) => {
            if (this.ballLockedToPaddle) {
                this.paddle = null;

                Math.atan2(this.pos.y - 0, this.pos.x - 0)

                const ballVx = this.ballSpeed*Math.cos(0.50);
                const ballVy = this.ballSpeed*-Math.sin(0.40);

                this.vel.setTo(ballVx, ballVy);
                this.ballLockedToPaddle = false;
            }
        });
        this.on(ex.Events.EventTypes.PreCollision, (ev) => {
            const intersection: ex.Vector = ev.intersection.normalize()

            if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
                this.vel.x *= -1
            } else {
                this.vel.y *= -1
            }
        });
        this.on(ex.Events.EventTypes.PostUpdate, (ev) => {
            if (this.body.pos.x < this.width / 2) {
                this.vel.x *= -1;
            }

            if (this.pos.x + this.width / 2 > this.engine.drawWidth) {
                this.vel.x *= -1;
            }

            if (this.pos.y < this.height / 2) {
                this.vel.y *= -1;
            }

            if (this.pos.y + this.height / 2 > this.engine.drawHeight) {
                this.engine.currentScene.emit('gameover', new GameEvent<any>())
                // this.vel.y *= -1;
            }
        });
    }

    public draw(ctx, delta) {
        ctx.fillStyle = this.color.toString();
        ctx.beginPath();
        ctx.arc(this.body.pos.x, this.pos.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
