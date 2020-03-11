import * as ex from 'excalibur';
import {GameEvent} from "excalibur";

export class Brick extends ex.Actor {

    constructor(pos: ex.Vector, width: number, height: number) {
        super({
            pos: pos,
            width: width,
            height: height,
            color: ex.Color.Orange
        });

        this.collisionType = ex.CollisionType.Active
    }
}
