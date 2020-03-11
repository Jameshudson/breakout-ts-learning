import * as ex from 'excalibur';
import {LevelOne} from './scenes/level-one/level-one';
import {Resources} from './resources';

class Game extends ex.Engine {
    constructor() {
        super({width: 800, height: 600, displayMode: ex.DisplayMode.FullScreen});
    }

    public start(loader: ex.Loader) {
        return super.start(loader);
    }
}

const game = new Game();
const levelOne = new LevelOne(game);

game.add('levelOne', levelOne);

let loader = new ex.Loader();
for (let key in Resources) {
    loader.addResource(Resources[key]);
}

game.start(loader).then(() => {
    game.goToScene('levelOne');
});
