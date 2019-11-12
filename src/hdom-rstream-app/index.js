import { start } from '@thi.ng/hdom';
import { root } from '../hdom-components';

class App {
    constructor (config) {
        this.config = config;
        this.ctx = {};
    }

    start () {
        start(() => {
            return this.rootComponent();
        }, { root: document.getElementById('root'), ctx: this.ctx })
    }

    rootComponent () {
        return root(this.ctx, false, [], '', false);
    }
}

const app = new App();
app.start();