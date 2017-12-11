import Navigo from 'navigo/src/index';

let basePath = '/';


if (window.development) {
    // use build file during development
    basePath = '/site/';

    window.d3.require.libs.set('d3-view-components', {
        origin: '/',
        main: 'build/d3-view-components.js'
    });
    window.d3.require.libs.set('d3-view', {
        origin: '/',
        main: 'node_modules/d3-view/build/d3-view.js'
    });
}


window.d3.require('d3-view-components', 'd3-view').then(d3 => {

    window.d3.require('marked').then(marked => {

        var vm = d3.view({
            model: {
                docs: ''
            },
            components: {
                flatpickr: d3.viewFlatpickr,
                sidebar: d3.viewSidebar
            },
            directives: {
                collapse: d3.viewCollapse,
            }
        });

        var baseUrl = window.d3.resolve(basePath),
            router = new Navigo(baseUrl.substring(0, baseUrl.length-1));

        router.on({
            '/': getMarked,
            '/:module': getMarked
        });

        d3.viewEvents.on('component-mounted', () => router.updatePageLinks());

        vm.mount('body');

        router.resolve();


        function getMarked (urlArgs) {
            var mod = urlArgs ? urlArgs.module : null,
                path = mod ? `/${mod}/readme.md` : '/readme.md';
            vm.renderFromDist('d3-view-components', path, null, false).then(md => {
                vm.model.docs = marked(md);
            });
        }

    });
});
