import {isObject, isString} from 'd3-let';
import {viewSlugify} from 'd3-view';


const tabClasses = {
    none: null,
    tabs: 'nav-tabs',
    pills: 'nav-pills'
};


//  Reusable Tabs component with Navigo
//
//  Requires:
//
//  * d3-active directive
//
export default {

    model () {
        return {
            tabItems: [],
            tabType: 'tabs',
            tabTarget: "",
            tabClass: {
                reactOn: ['tabType'],
                get () {
                    return tabClasses[this.tabType];
                }
            },
            // select a tab
            $selectTab (target) {
                var model = this;
                if (isObject(target)) target = target.id;

                model.tabItems.forEach(item => {
                    item.active = (item.id === target);
                });
            },
            $active (href, url) {
                let tab;
                for (let i=0; i<this.tabItems.length; i++) {
                    tab = this.tabItems[i].href;
                    if (tab === url && href !== url) return '#####';
                }
                return url;
            }
        };
    },

    render () {
        var model = this.model,
            items = model.tabItems;
        items.forEach((item, idx) => {
            if (isString(item)) {
                item = model.$new({label: item});
                items[idx] = item;
            }
            if (!item.label) item.label = `item ${idx+1}`;
            if (!item.href) item.href = `#${viewSlugify(item.label)}`;
            item.active = false;
            if (!item.id) item.id = `${idx+1}`;
            return item;
        });
        // model.type = data.type;
        return this.renderFromDist('d3-view-components', '/tabs/template.html');
    }
};
