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
        ['h1.app-picker-header', 'Pick an implementation'],
        ['div.apps',
            ['div.app-box', { onclick: reactAppHandler }, 'React & Redux'],
            ['div.app-box', { onclick: atomAppHandler }, 'hdom & atom'],
            ['div.app-box', { onclick: rstreamAppHandler }, 'hdom & rstream'],
            ['div.umbrella-link',
                ['a', { href: 'https://github.com/thi-ng/umbrella', target: '_blank' }, '@thi.ng/umbrella']]
            ]
    ];
}

renderOnce(appPicker(), { root: document.getElementById('app-picker')});
