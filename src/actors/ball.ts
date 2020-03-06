import * as ex from 'excalibur';

export class Ball extends ex.Actor {

    constructor(public engine: ex.Engine) {
        super({
            pos: new ex.Vector(100, 300),
            width: 20,
            height: 20,
            color: ex.Color.Red
        });

        this.vel.setTo(700, 600);
        this.collisionType = ex.CollisionType.Passive;

        this.on('precollision', this.handleCollision);
        this.on('postupdate', this.handleWellCollision);
    }

    public draw(ctx, delta) {
        ctx.fillStyle = this.color.toString()
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }

    private handleCollision(ev) {
        if (this.engine.currentScene.bricks.indexOf(ev.other) > -1) {
            ev.other.kill()
            this.engine.currentScene.emit('brickRemove', ev.other);
        }

        const intersection = ev.intersection.normalize()

        if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
            this.vel.x *= -1
        } else {
            this.vel.y *= -1
        }
    }

    private handleWellCollision(env) {
        if (this.pos.x < this.width / 2) {
            this.vel.x *= -1
        }

        if (this.pos.x + this.width / 2 > this.engine.drawWidth) {
            this.vel.x *= -1
        }

        if (this.pos.y < this.height / 2) {
            this.vel.y *= -1
        }

        if (this.pos.y + this.height / 2 > this.engine.drawHeight) {
            this.vel.y *= -1
        }
    }
}
