import Navigo from 'navigo/src/index';
import sitePlugin from './components/index';
import {version} from '../package.json';


const DEV = window.development;

let basePath = '/';


if (DEV) {

    window.d3.require.libs.set('d3-view', {
        origin: '/',
        main: 'd3-view.js'
    });
}


window.d3.require('d3-view-components', 'd3-view').then(d3 => {

    var vm = d3.view({
        model: {
            docs: '',
            navbarItems: [
                {
                    icon: 'ion-social-github',
                    href: 'https://github.com/quantmind/d3-view-components',
                    label: `v${version}`
                }
            ]
        },
        components: {
            modal: d3.viewModal,
            sidebar: d3.viewSidebar,
            tabs: d3.viewTabs
        },
        directives: {
            active: d3.viewActive,
            collapse: d3.viewCollapse,
            flatpickr: d3.viewFlatpickr,
            marked: d3.viewMarked,
            modal: d3.viewModal.$directive
        }
    }).use(sitePlugin).use(d3.viewForms).use(d3.viewBootstrapForms);

    // disable cache in dev
    if (DEV) vm.cache.active = false;

    vm.model.$openModal = d3.viewModal.$openModal;

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
            vm.model.docs = md;
        });
    }
});
