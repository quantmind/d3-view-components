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
        classes: 'sidebar-navbar sticky-top',
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
        this.model.sidebarContent = this.select(el).html();
        return this.renderFromDist('d3-view-components', '/sidebar/template.html', props);
    }
};
