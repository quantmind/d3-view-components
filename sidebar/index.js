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
        // navbar attributes
        navbarTitle: "",
        navbarTitleUrl: "/",
        sidebarToggle: '<i class="ion-android-menu"></i>',
        // collapse action
        $collapse () {
            var collapse = this.$event ? this.$event.currentTarget.d3Collapse : null;
            if (collapse)
                collapse.hide(collapse.select(this.$event.currentTarget));
        }
    },

    render (props, attrs, el) {
        this.model.primaryItems = asItems(this.model.primaryItems);
        this.model.secondaryItems = asItems(this.model.secondaryItems);
        this.model.sidebarContent = this.select(el).html();
        return this.renderFromDist('d3-view-components', '/sidebar/template.html', props);
    }
};


function asItems (items) {
    return items.map(item => {
        if (typeof item === 'string') {
            item = {
                name: item,
                url: item
            };
        }
        if (!item.url) item.url = '#';
        return item;
    });
}
