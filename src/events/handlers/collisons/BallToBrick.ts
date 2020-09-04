import * as ex from 'excalibur';
import { Brick } from '../../../actors/brick';

/**
 * Handle the ball colliding with a brick.
 *
 * @var {[type]}
 */
export default function(event: ex.PreCollisionEvent<Brick>) {
    const brick = event.actor;

    brick.health -= 1;

    if (brick.health <= 0) {
        brick.kill();
        brick.scene.emit('ScoreUpdate', event);
    } else {
        brick.color = brick.getColours[brick.health];
    }
}