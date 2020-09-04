import { PointerDownEvent } from 'excalibur/dist/Input';

/**
 * Handle the ball colliding with a brick.
 *
 * @var {[type]}
 */
export default function(event: PointerDownEvent) {
    if (this.ballLockedToPaddle && event.button == 'Left') {
        this.paddle = null;

        Math.atan2(this.pos.y - 0, this.pos.x - 0)

        const ballVx = this.ballSpeed*Math.cos(0.50);
        const ballVy = this.ballSpeed*-Math.sin(0.40);

        this.vel.setTo(ballVx, ballVy);
        this.ballLockedToPaddle = false;
    }
}