import * as ex from 'excalibur';
import { GameEvent, PreCollisionEvent } from "excalibur";
import { Paddle } from "./player/paddle";
import * as Game  from '../events/types/Game';
import BallCollisionWithWall from '../events/handlers/collisons/BallToWall';
import BallToBrickRotation from '../events/handlers/collisons/BallToBrickRotation';
import { PointerDownEvent } from 'excalibur/dist/Input';

export class Ball extends ex.Actor {

    /**
     * The player paddle.
     *
     * @var {Paddle}
     */
    protected paddle: Paddle;

    /**
     * Whether the ball is locked to the paddle.
     *
     * @var {[boolean]}
     */
    protected ballLockedToPaddle = true;

    /**
     * Default ball speed.
     *
     * @var {[number]}
     */
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
        this.engine.input.pointers.primary.on('down', (event: PointerDownEvent) => {
            if (this.ballLockedToPaddle && event.button == 'Left') {
                this.paddle = null;

                Math.atan2(this.pos.y - 0, this.pos.x - 0);

                const ballVx = this.ballSpeed*Math.cos(0.50);
                const ballVy = this.ballSpeed*-Math.sin(0.40);

                this.vel.setTo(ballVx, ballVy);
                this.ballLockedToPaddle = false;
            }
        });
        this.on(ex.Events.EventTypes.PreCollision, BallToBrickRotation);
        this.on(ex.Events.EventTypes.PostUpdate, BallCollisionWithWall);
    }

    /**
     * Draw method
     *
     * @param   {[CanvasRenderingContext2D]}  ctx    The thingy to help with rendering.
     * @param   {[number]}                    delta  time since last update.
     *
     * @return  {[void]}         [return description]
     */
    public draw(ctx: CanvasRenderingContext2D, delta: number) {
        ctx.fillStyle = this.color.toString();
        ctx.beginPath();
        ctx.arc(this.body.pos.x, this.pos.y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
