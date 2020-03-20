import * as ex from 'excalibur';
import * as Score from '../events/score';
import {GameEvent} from "excalibur";

export class Brick extends ex.Actor {

    protected health: number = 1;

    private colours = [
        ex.Color.Violet,
        ex.Color.Orange,
        ex.Color.Yellow,
        ex.Color.White,
        ex.Color.Blue,
        ex.Color.Rose,
    ];

    constructor(pos: ex.Vector, width: number, height: number, protected engine: ex.Engine) {
        super({
            pos: pos,
            width: width,
            height: height,
            color: ex.Color.Orange
        });

        this.collisionType = ex.CollisionType.Fixed;

        this.on(ex.Events.EventTypes.PreCollision, (ev) => {
            const self: Brick = this;

            self.health -= 1;
            self.engine.currentScene.emit('scoreupdate', ev);

            if (self.health <= 0) {
                self.kill();
            } else {
                self.color = self.colours[self.health];
            }
        });
    }

    public setHealthPoints(points: number) {
        this.health = points - this.colours.length;
        this.color = this.colours[points];
    }
}
