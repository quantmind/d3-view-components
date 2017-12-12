import {viewProviders} from 'd3-view';


export default {
    props: {
        options: {}
    },

    render (props) {
        var self = this;
        return viewProviders.require('flatpickr').then(flatpickr => {
            var el = self.viewElement('<input type="text">');
            self.fp = flatpickr(el, props.options);
            return el;
        });
    },

    destroy () {
        if (this.fp) {
            this.fp.destroy();
            this.fp = null;
        }
    },

    $directive: {
        refresh (model, options) {
            var self = this,
                opts = options && options.$data ? options.$data() : {};

            viewProviders.require('flatpickr').then(flatpickr => {
                if (self.fp) self.fp.destroy();
                self.fp = flatpickr(self.el, opts);
            });
        },

        destroy () {
            if (this.fp) {
                this.fp.destroy();
                this.fp = null;
            }
        }
    }
};

