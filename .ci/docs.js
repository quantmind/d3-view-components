if (window.development)
    d3.require.libs.set('d3-view-components', `/build/d3-view-components.js`);

window.d3.require('d3-view-components', 'd3-view', 'handlebars').then(d3 => {

    d3.viewProviders.Handlebars = d3;

    var vm = d3.view({
        components: {
            flatpickr: d3.viewFlatpickr,
            sidebar: d3.viewSidebar
        },
        directives: {
            collapse: d3.viewCollapse,
        }
    });

    vm.mount('body');

});
