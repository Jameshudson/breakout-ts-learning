import * as ex from 'excalibur';
import {Brick} from "./brick";
import {Paddle} from "./player/paddle";
import {GameEvent} from "excalibur";

export class Ball extends ex.Actor {

    protected paddle: Paddle;

    constructor(protected engine: ex.Engine) {
        super({
            pos: new ex.Vector(150, engine.drawHeight - 80),
            width: 20,
            height: 20,
            color: ex.Color.Red
        });

        this.collisionType = ex.CollisionType.Active;

        this.engine.input.pointers.primary.on('move',  (ev) => {
            const self: Ball = this;
            if (self.paddle !== null){
                self.pos.x = ev.target.lastWorldPos.x;
            }
        });
        this.engine.input.pointers.primary.on('down', (evt) => {
            const self: Ball = this;

            self.paddle = null;
            self.vel.setTo(700, 600);
        });
        this.on(ex.Events.EventTypes.PreCollision, (ev) => {
            const self: Ball = this;
            const intersection: ex.Vector = ev.intersection.normalize()

            if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
                self.vel.x *= -1
            } else {
                self.vel.y *= -1
            }
        });
        this.on(ex.Events.EventTypes.PostUpdate, (ev) => {
            const self: Ball = this;
            if (self.pos.x < self.width / 2) {
                self.vel.x *= -1;
            }

            if (self.pos.x + self.width / 2 > self.engine.drawWidth) {
                self.vel.x *= -1;
            }

            if (self.pos.y < self.height / 2) {
                self.vel.y *= -1;
            }

            if (self.pos.y + self.height / 2 > self.engine.drawHeight) {
                self.engine.currentScene.emit('gameover', new GameEvent<any>())
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
