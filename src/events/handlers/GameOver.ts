import * as ex from 'excalibur';

/**
 * Handle a game over.
 *
 * @var {[void]}
 */
export default function(event: ex.GameEvent<any>) {
    const engine: ex.Engine = event.target._engine;
    const gameOverLabel: ex.Label = new ex.Label('You a loser');

    gameOverLabel.fontSize = 50;

    gameOverLabel.pos.y = engine.halfCanvasHeight - (gameOverLabel.height / 2);
    gameOverLabel.pos.x = engine.halfDrawWidth - (gameOverLabel.getTextWidth(engine.ctx) / 2);

    this.add(gameOverLabel);

    engine.stop();
}