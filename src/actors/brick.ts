import * as ex from 'excalibur';
import BallToBrickPreCollision from '../events/handlers/collisons/BallToBrick';

export class Brick extends ex.Actor {

    /**
     * The health of the birck.
     *
     * @var {number}
     */
    public health: number = 1;

    /**
     * Default colours that the bricks can be.
     *
     * @var {ex.Color[]}
     */
    private colours = [
        ex.Color.Violet,
        ex.Color.Orange,
        ex.Color.Yellow,
        ex.Color.White,
        ex.Color.Blue,
        ex.Color.Rose,
    ];

    /**
     * constructor
     *
     * @var {[type]}
     */
    constructor(pos: ex.Vector, width: number, height: number, protected engine: ex.Engine) {
        super({
            pos: pos,
            width: width,
            height: height,
            color: ex.Color.Orange
        });

        this.body.collider.type = ex.CollisionType.Fixed;

        this.on(ex.Events.EventTypes.PreCollision, BallToBrickPreCollision);
    }

    /**
     * Set the healh points of the brick
     *
     * @param   {number}  points  [points description]
     *
     * @return  {[void]}          [return description]
     */
    public setHealthPoints(points: number) {
        this.health = points - this.colours.length;
        this.color = this.colours[points];
    }

    /**
     * Returns the default colours Available to the bricks.
     *
     * @var {ex.Color[]}
     */
    public getColours(): ex.Color[] {
        return this.colours;
    }
}
