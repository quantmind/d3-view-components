import sitePlugin from './components/index';
import {version} from '../package.json';


const DEV = window.development;


if (DEV) {

    window.d3.require.libs.set('d3-view', {
        origin: '/',
        main: 'd3-view.js'
    });
}


function componentsPlugin (d3) {

    return function (vm) {
        vm.addComponent('alerts', d3.viewAlert);
        vm.addComponent('markdown', d3.viewMarked);
        vm.addComponent('sidebar', d3.viewSidebar);
        vm.addComponent('tabs', d3.viewTabs);
        //
        vm.addDirective('active', d3.viewActive);
        vm.addDirective('autocomplete', d3.viewAutocomplete);
        vm.addDirective('collapse', d3.viewCollapse);
        vm.addDirective('flatpickr', d3.viewFlatpickr);
        //
        vm.use(d3.viewModal).use(d3.viewRouter);
        //
        // disable caching in dev
        if (DEV) {
            vm.cache.active = false;
            vm.providers.setDebug();
        }
    };
}


window.d3.require('d3-view-components', 'd3-view').then(d3 => {

    d3.view({
        model: {
            docs: '',
            navbarTitle: '',
            navbarItems: [
                {
                    icon: 'ion-social-github',
                    href: 'https://github.com/quantmind/d3-view-components',
                    label: `v${version}`
                }
            ]
        }
    }).use(componentsPlugin(d3))
        .use(sitePlugin)
        .use(d3.viewForms)
        .use(d3.viewBootstrapForms)
        .mount('body');
});
