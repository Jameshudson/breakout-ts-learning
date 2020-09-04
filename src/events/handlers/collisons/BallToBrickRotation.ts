import * as ex from 'excalibur';
import { PreCollisionEvent, Actor } from 'excalibur';

/**
 * Handle the ball colliding with a brick.
 *
 * @var {[type]}
 */
export default function (event: PreCollisionEvent) {
    const intersection: ex.Vector = event.intersection.normalize();
    const ball: Actor = event.actor;

    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        ball.vel.x *= -1
    } else {
        ball.vel.y *= -1
    }
}