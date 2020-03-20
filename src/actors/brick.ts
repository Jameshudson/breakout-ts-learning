import * as ex from 'excalibur';
import * as Score from '../events/score';
import {GameEvent} from "excalibur";

export class Brick extends ex.Actor {

    private health: number = 1;

    private colours = [
        ex.Color.Violet,
        ex.Color.Orange,
        ex.Color.Yellow,
        ex.Color.White,
        ex.Color.Blue,
        ex.Color.Rose,
    ];

    constructor(pos: ex.Vector, width: number, height: number) {
        super({
            pos: pos,
            width: width,
            height: height,
            color: ex.Color.Orange
        });

        this.collisionType = ex.CollisionType.Fixed;

        this.on(ex.Events.EventTypes.PreCollision, this.handleCollision);
    }

    private handleCollision(ev) {

        this.health -= 1;

        this.emit('scoreupdate', ev);

        if (this.health <= 0) {
            this.kill();
        }else {
            this.color = this.colours[this.health];
        }
    }

    public setHealthPoints(points: number) {
        this.health = points - this.colours.length;
        this.color = this.colours[points];
    }
}
