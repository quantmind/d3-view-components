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
    props: {
        tabTransitionDuration: 250
    },

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
            $selectTab (tab) {
                if (isObject(tab)) tab = tab.id;
                var target = this.targets.get(tab);
                if (target) {
                    // when local targets are available rather than remote ones
                    this.tabTarget = target;
                    var event = this.$event;
                    if (event && event.currentTarget) this.currentUrl = event.currentTarget.href;
                }
                this.tabItems.forEach(item => {
                    item.active = (item.id === tab);
                });
            }
        };
    },

    render (props, attrs, el) {
        var self = this,
            model = this.model,
            items = model.tabItems;

        model.targets = new Map;

        items.forEach((item, idx) => {
            if (isString(item)) {
                item = model.$new({label: item});
                items[idx] = item;
            }
            if (!item.label) item.label = `item ${idx+1}`;
            if (!item.id) item.id = viewSlugify(item.label);
            if (!item.href) item.href = `#${item.id}`;
            //
            return item;
        });

        //
        //  cache existing targets if avalable
        this.selectChildren(el).each(function (idx) {
            var sel = self.select(this),
                id = sel.attr('id') || (items[idx] ? items[idx].id : null);
            if (id) model.targets.set(id, sel.html());
        });

        // model.type = data.type;
        return this.renderFromDist('d3-view-components', '/tabs/template.html', props);
    },

    mounted () {

    }
};
