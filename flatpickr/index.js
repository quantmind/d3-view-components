import {viewProviders} from 'd3-view';


export default {

    render (options) {
        return viewProviders.require('flatpickr').then(flatpickr => {
            var el = this.viewElement('<input type="text">');
            this.fp = flatpickr(el.node(), options);
            return el;
        });
    }
};
