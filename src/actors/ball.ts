import * as ex from 'excalibur';
import {Brick} from "./brick";
import {Paddle} from "./player/paddle";
import {GameEvent} from "excalibur";

export class Ball extends ex.Actor {

    private paddle: Paddle;

    constructor(public engine: ex.Engine) {
        super({
            pos: new ex.Vector(150, engine.drawHeight - 80),
            width: 20,
            height: 20,
            color: ex.Color.Red
        });

        this.collisionType = ex.CollisionType.Active;

        this.on(ex.Events.EventTypes.PreCollision, this.handleCollision);
        this.on(ex.Events.EventTypes.PostUpdate, this.handleWellCollision);
    }

    public draw(ctx, delta) {
        ctx.fillStyle = this.color.toString();
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    private handleCollision(ev) {

        const intersection: ex.Vector = ev.intersection.normalize()

        if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
            this.vel.x *= -1
        } else {
            this.vel.y *= -1
        }
    }

    private handleWellCollision(env) {
        if (this.pos.x < this.width / 2) {
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
        }
    }

    public setPaddle(paddle: Paddle) {
        this.paddle = paddle;
    }

    public getPaddle() {
        return this.paddle;
    }
}
