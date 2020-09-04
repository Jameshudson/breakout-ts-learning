import * as ex from 'excalibur';

export class Paddle extends ex.Actor {

    constructor(pos: ex.Vector, engine: ex.Engine) {
        super({
            pos: pos,
            width: 200,
            height: 20,
            color: ex.Color.Chartreuse
        });

        this.body.collider.type = ex.CollisionType.Fixed;

        engine.input.pointers.primary.on('move',  (event: ex.GameEvent<any>) => {
            this.body.pos.x = event.target.lastWorldPos.x;
        });
    }
}
