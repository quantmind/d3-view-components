import {viewProviders} from 'd3-view';


export default {
    props: {
        options: {}
    },

    render (props) {
        var self = this;
        return viewProviders.require('flatpickr').then(flatpickr => {
            var el = self.viewElement('<input type="text">');
            this.fp = flatpickr(el, props.options);
            return el;
        });
    }
};

