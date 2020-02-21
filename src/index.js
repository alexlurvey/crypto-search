import '../node_modules/spinkit/css/spinners/2-double-bounce.css';
import './styles.css';
import { HTMLRouter } from '@thi.ng/router';
import { config } from './router';
import { stream, sync } from '@thi.ng/rstream';
import { updateDOM } from '@thi.ng/transducers-hdom';
import * as tx from '@thi.ng/transducers';
import ReactIcon from '../assets/React-icon.svg';
import { pageLoading } from './hdom-components';

const reactAppBase = 'div#react-app';
const hdomAtomBase = 'div#hdom-atom-app';
const hdomRstreamBase = 'div#hdom-rstream-app';
const reactRoute = '/react';
const atomRoute = '/hdom-atom';
const rstreamRoute = '/hdom-rstream';

const appStream = stream()
const routeStream = stream()
const router = new HTMLRouter(config)
router.start()

routeStream.subscribe(tx.sideEffect((route) => {
    router.route(route, true);
}))

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
    if (oldURL.indexOf(reactRoute) > -1)
        (reactModule && reactModule.unmountApp())
    else if (oldURL.indexOf(atomRoute) > -1)
        (hdomAtomModule && hdomAtomModule.unmountApp())
    else if (oldURL.indexOf(rstreamRoute) > -1)
        (hdomRstreamModule && hdomRstreamModule.unmountApp())

    resetApp()
    if (newURL.indexOf(reactRoute) > -1) {
        routeStream.next(reactRoute)
        startApp(reactModule, reactAppBase);
    } else if (newURL.indexOf(atomRoute) > -1) {
        routeStream.next(atomRoute)
        startApp(hdomAtomModule, hdomAtomBase);
    } else if (newURL.indexOf(rstreamRoute) > -1) {
        routeStream.next(rstreamRoute)
        startApp(hdomRstreamModule, hdomRstreamBase);
    } else {
        routeStream.next('/home')
        appStream.next(appPicker);
    }
})

const reactAppHandler = async () => {
    routeStream.next(reactRoute)
    if (!reactModule) {
        appStream.next(reactLoader)
        reactModule = await import('./react-app');
    } 
    appStream.next('div#react-app');
    reactModule.startApp();
}
const atomAppHandler = async () => {
    routeStream.next(atomRoute)

    if (!hdomAtomModule) {
        appStream.next('div')
        appStream.next(thingLoader)
        hdomAtomModule = await import('./hdom-atom-app');
    }

    appStream.next('div#hdom-atom-app');
    hdomAtomModule.startApp();
}
const rstreamAppHandler = async () => {
    routeStream.next(rstreamRoute)

    if (!hdomRstreamModule) {
        appStream.next('div')
        appStream.next(thingLoader)
        hdomRstreamModule = await import('./hdom-rstream-app');
    }

    appStream.next('div#hdom-rstream-app');
    hdomRstreamModule.startApp();
}

const reactLoader = () => {
    return ['div.app-loading-wrapper', [
        ['img.rotate', { src: ReactIcon }]
    ]]
}

const thingLoader = () => {
    return ['div.app-loading-wrapper', [
        pageLoading
    ]];
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

routeStream.next('/home')
appStream.next(appPicker)