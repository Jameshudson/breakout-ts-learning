import * as ex from 'excalibur';
import {Brick} from "./brick";
import {Paddle} from "./player/paddle";
import {GameEvent} from "excalibur";
import { Pointer } from 'excalibur/dist/Input';

export class Ball extends ex.Actor {

    protected paddle: Paddle;

    protected ballLockedToPaddle = true;

    constructor(protected engine: ex.Engine) {
        super({
            pos: new ex.Vector(150, engine.drawHeight - 80),
            width: 20,
            height: 20,
            color: ex.Color.Red
        });

        this.collisionType = ex.CollisionType.Active;

        this.engine.input.pointers.primary.on('move',  (ev) => {
            if (this.paddle !== null){
                this.pos.x = ev.target.lastWorldPos.x;
            }
        });
        this.engine.input.pointers.primary.on('down', () => {
            if (this.ballLockedToPaddle) {
                this.paddle = null;
                this.vel.setTo(700, 600);
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
        });
    }

    public draw(ctx, delta) {
        ctx.fillStyle = this.color.toString();
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
