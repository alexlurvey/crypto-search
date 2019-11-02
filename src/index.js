import '../node_modules/spinkit/css/spinners/2-double-bounce.css';
import './styles.css';
import { renderOnce } from '@thi.ng/hdom';

const removeAppPicker = () => {
    document.getElementById('app-picker').innerHTML = '';
}
const reactHandler = async () => {
    await import('./react-components');
    removeAppPicker();
}
const hdomHandler = async () => {
    await import('./hdom-components');
    removeAppPicker();
}

const appPicker = () => {
    return {
        render: () => {
            return ['div.app-picker-wrapper',
                ['h1.app-picker-header', 'Use React or hdom?'],
                ['div.apps',
                    ['div.app-box', { onclick: reactHandler }, 'React'],
                    ['div.app-box', { onclick: hdomHandler }, 'hdom'],
                    ['div.hdom-question-text',
                       ['a', { href: 'https://github.com/thi-ng/umbrella/tree/master/packages/hdom', target: '_blank' }, 'hdom?']]
                    ],
            ];
        }
    }
};

renderOnce([appPicker()], { root: document.getElementById('app-picker')});
