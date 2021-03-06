import * as ex from 'excalibur';

export class Paddle extends ex.Actor {

    constructor(pos: ex.Vector, engine: ex.Engine) {
        super({
            pos: pos,
            width: 200,
            height: 20,
            color: ex.Color.Chartreuse
        });

        this.collisionType = ex.CollisionType.Fixed;

        engine.input.pointers.primary.on('move',  (evt) => {
            this.pos.x = evt.target.lastWorldPos.x;
        });
    }
}
