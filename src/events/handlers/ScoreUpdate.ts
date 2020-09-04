import * as ex from 'excalibur';

/**
 * When a brick is killed update the score to Reflect that.
 *
 * @var {[ex.KillEvent]}
 */
export default function(event: ex.KillEvent) {
    this.score += 10;
    this.scoreLabel.text = 'Total score: ' + this.score;
}