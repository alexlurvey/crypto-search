import '../node_modules/spinkit/css/spinners/2-double-bounce.css';
import './styles.css';
import { HTMLRouter } from '@thi.ng/router';
import { config } from './router';
import { stream, sync } from '@thi.ng/rstream';
import { updateDOM } from '@thi.ng/transducers-hdom';
import * as tx from '@thi.ng/transducers';

const reactAppBase = 'div#react-app';
const hdomAtomBase = 'div#hdom-atom-app';
const hdomRstreamBase = 'div#hdom-rstream-app';

const appStream = stream()
const router = new HTMLRouter(config)
router.start()

let reactModule;
let hdomAtomModule;
let hdomRstreamModule;

const resetApp = () => {
    const app = document.getElementById('root').firstChild;
    (app && app.remove())
    const appDiv = document.createElement('div');
    appDiv.id = 'app-picker';
    document.getElementById('root').appendChild(appDiv);
}

const startApp = (mod, baseDiv) => {
    appStream.next(baseDiv);
    mod && mod.startApp();
}

window.addEventListener('hashchange', ({ oldURL, newURL }) => {
    if (oldURL.indexOf('react') > -1)
        (reactModule && reactModule.unmountApp())
    else if (oldURL.indexOf('hdom-atom') > -1)
        (hdomAtomModule && hdomAtomModule.unmountApp())
    else if (oldURL.indexOf('hdom-rstream') > -1)
        (hdomRstreamModule && hdomRstreamModule.unmountApp())

    resetApp()
    if (newURL.indexOf('react') > -1) {
        router.route('/react', true);
        startApp(reactModule, reactAppBase);
    } else if (newURL.indexOf('hdom-atom') > -1) {
        router.route('/hdom-atom', true);
        startApp(hdomAtomModule, hdomAtomBase);
    } else if (newURL.indexOf('hdom-rstream') > -1) {
        router.route('/hdom-rstream', true);
        startApp(hdomRstreamModule, hdomRstreamBase);
    } else {
        router.route('/home', true);
        appStream.next(appPicker);
    }
})

const reactAppHandler = async () => {
    router.route('/react', true);
    appStream.next('div#react-app');
    reactModule = await import('./react-app');
    reactModule.startApp();
}
const atomAppHandler = async () => {
    router.route('/hdom-atom', true);
    appStream.next('div#hdom-atom-app');
    hdomAtomModule = await import('./hdom-atom-app');
    hdomAtomModule.startApp();
}
const rstreamAppHandler = async () => {
    router.route('/hdom-rstream', true);
    appStream.next('div#hdom-rstream-app');
    hdomRstreamModule = await import('./hdom-rstream-app');
    hdomRstreamModule.startApp();
}

const appPicker = () => {    
    return ['div.app-picker-wrapper',
        ['h1.app-picker-header', 'Pick an implementation'],
        ['div.apps',
            ['div.app-box', { onclick: reactAppHandler }, 'React & Redux'],
            ['div.app-box', { onclick: atomAppHandler }, 'hdom & atom'],
            ['div.app-box', { onclick: rstreamAppHandler }, 'hdom & rstream'],
            ['div.umbrella-link',
                ['a', { href: 'https://github.com/thi-ng/umbrella', target: '_blank' }, '@thi.ng/umbrella']
            ]
        ]
    ];
}

sync({
    src: { appStream },
    xform: tx.comp(
        tx.map(({ appStream }) => [appStream]),
        updateDOM({ root: document.getElementById('root') }),
    )
})

appStream.next(appPicker)