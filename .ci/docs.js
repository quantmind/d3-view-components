import Navigo from 'navigo/src/index';
import formData from './components/form-data';

let basePath = '/';


if (window.development) {

    window.d3.require.libs.set('d3-view', {
        origin: '/',
        main: 'd3-view.js'
    });
}


window.d3.require('d3-view-components', 'd3-view').then(d3 => {

    var vm = d3.view({
        model: {
            docs: ''
        },
        components: {
            modal: d3.viewModal,
            sidebar: d3.viewSidebar,
            // site specific
            'form-data': formData
        },
        directives: {
            collapse: d3.viewCollapse,
            flatpickr: d3.viewFlatpickr,
            marked: d3.viewMarked,
            modal: d3.viewModal.$directive
        }
    });

    vm.use(d3.viewForms).use(d3.viewBootstrapForms);
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
