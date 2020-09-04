import * as ex from 'excalibur';

/**
 * Handle the ball colliding with a brick.
 *
 * @var {[type]}
 */
export default function(event: ex.PostUpdateEvent) {
    const ball: any  = event.target;
    const engine: ex.Engine = event.engine;

    if (ball.body.pos.x < ball.width / 2) {
        ball.vel.x *= -1;
    }

    if (ball.pos.x + ball.width / 2 > engine.drawWidth) {
        ball.vel.x *= -1;
    }

    if (ball.pos.y < ball.height / 2) {
        ball.vel.y *= -1;
    }

    if (ball.pos.y + ball.height / 2 > engine.drawHeight) {
        engine.currentScene.emit('GameOver', new ex.GameEvent<any>())
    }
}