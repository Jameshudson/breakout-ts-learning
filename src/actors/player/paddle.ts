import * as ex from 'excalibur';

export class Paddle extends ex.Actor {
    constructor(pos: ex.Vector) {
        super({
            pos: pos,
            width: 200,
            height: 20,
            color: ex.Color.Chartreuse
        });

        this.collisionType = ex.CollisionType.Fixed;
    }
}
