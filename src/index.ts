import * as ex from 'excalibur';
import {LevelOne} from './scenes/level-one/level-one';

class Game extends ex.Engine {
    constructor() {
        super({width: 800, height: 600, displayMode: ex.DisplayMode.FullScreen});
    }

    public start(loader: ex.Loader) {
        return super.start();
    }
}

const game = new Game();
const levelOne = new LevelOne(game);

game.add('levelOne', levelOne);

let loader = new ex.Loader();

game.start(loader).then(() => {
    game.goToScene('levelOne');
});
