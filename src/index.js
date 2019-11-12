import '../node_modules/spinkit/css/spinners/2-double-bounce.css';
import './styles.css';
import { renderOnce } from '@thi.ng/hdom';

const removeAppPicker = () => {
    document.getElementById('app-picker').innerHTML = '';
}
const reactAppHandler = async () => {
    await import('./react-app');
    removeAppPicker();
}
const atomAppHandler = async () => {
    await import('./hdom-atom-app');
    removeAppPicker();
}
const rstreamAppHandler = async () => {
    await import('./hdom-rstream-app');
    removeAppPicker();
}


const appPicker = () => {
    return ['div.app-picker-wrapper',
        ['h1.app-picker-header', 'Use React or hdom?'],
        ['div.apps',
            ['div.app-box', { onclick: reactAppHandler }, 'React'],
            ['div.app-box', { onclick: atomAppHandler }, 'hdom & atom'],
            ['div.app-box', { onclick: rstreamAppHandler }, 'hdom & rstream'],
            ['div.hdom-question-text',
                ['a', { href: 'https://github.com/thi-ng/umbrella/tree/master/packages/hdom', target: '_blank' }, 'hdom?']]
            ]
    ];
}

renderOnce(appPicker(), { root: document.getElementById('app-picker')});
