export const config = {
    useFragment: true,
    defaultRouteID: 'home',
    initialRouteID: 'home',
    routes: [
        {
            id: 'home',
            title: 'App Picker',
            match: [ 'home' ],
        },
        {
            id: 'react-app',
            title: 'Crypto Search - react',
            match: [ 'react' ],
        },
        {
            id: 'hdom-atom-app',
            title: 'Crypto Search - atom',
            match: [ 'hdom-atom' ],
        },
        {
            id: 'hdom-rstream-app',
            title: 'Crypto Search - rstream',
            match: [ 'hdom-rstream' ],
        },
    ],
}
