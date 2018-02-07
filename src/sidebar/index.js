import {viewModel} from 'd3-view';

import collapse from '../collapse/index';
import tpl from './template.html';
import groupTpl from './group.html';


const group = {

    render () {
        return groupTpl;
    }
};
//
//  Reusable Sidebar component
//  ================================
//
//  Requires:
//
//  * collapse directive
//  * active directive (Optional)
//
export default {
    components: {group},
    directives: {collapse},

    props: {
        id: 'sidebar',
        brand: 'sidebar',
        classes: 'navbar-sidebar navbar sticky-top navbar-dark bg-primary',
        brandUrl: '/',
        itemAttr: ''
    },

    model: {
        primaryItems: [],
        secondaryItems: [],
        sidebarToggle: '<i class="ion-android-menu"></i>',
        // sidebar
        sectionCollapse: false,  //  allow sections in sidebar to be collapsible
        // top navbar attributes
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
        asItems(model, model.primaryItems);
        asItems(model, model.secondaryItems);
        asItems(model, model.navbarItems);
        props.sidebarContent = this.select(el).html();
        return tpl;
    }
};


function asItems (model, items) {
    let item;
    for (let i=0; i<items.length; ++i) {
        item = items[i];
        if (typeof item === 'string')
            item = {
                name: item
            };
        if (!(item instanceof viewModel)) item = model.$new(item);
        if (!item.href) item.$set('href', item.name);
        if (!item.items) item.items = [];
        items[i] = item;
    }
}
