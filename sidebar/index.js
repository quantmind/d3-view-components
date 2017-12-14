import {viewModel} from 'd3-view';

//
//  Reusable Sidebar component
//  ================================
//
//  Requires:
//
//  * navbar component
//  * d3-collapse directive
//  * d3-append directive
//  * d3-active directive
//
export default {
    props: {
        id: 'sidebar',
        brand: 'sidebar',
        classes: 'navbar-sidebar navbar sticky-top navbar-dark bg-primary',
        brandUrl: '/',
        itemAttr: ''
    },

    model: {
        sidebarContent: '',
        primaryItems: [],
        secondaryItems: [],
        sidebarToggle: '<i class="ion-android-menu"></i>',
        // navbar attributes
        navbarItems: [],
        navbarTitle: "",
        navbarTitleUrl: "/",
        // collapse action
        $collapse () {
            var collapse = this.$event ? this.$event.currentTarget.d3Collapse : null;
            if (collapse)
                collapse.hide(collapse.select(this.$event.currentTarget));
        }
    },

    render (props, attrs, el) {
        var model = this.model;
        model.primaryItems = asItems(model, model.primaryItems);
        model.secondaryItems = asItems(model, model.secondaryItems);
        model.navbarItems = asItems(model, model.navbarItems);
        model.sidebarContent = this.select(el).html();
        return this.renderFromDist('d3-view-components', '/sidebar/template.html', props);
    }
};


function asItems (model, items) {
    return items.map(item => {
        if (typeof item === 'string')
            item = {
                name: item
            };
        if (!(item instanceof viewModel)) item = model.$new(item);
        if (!item.href) item.$set('href', item.name);
        return item;
    });
}
