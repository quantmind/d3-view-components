import {viewProviders} from 'd3-view';


export default {

    refresh (model, options) {
        var self = this,
            opts = options && options.$data ? options.$data() : {};

        viewProviders.require('flatpickr').then(flatpickr => {
            if (self.fp) self.fp.destroy();
            self.sel.on('input', null);
            self.sel.on('change', null);
            self.fp = flatpickr(self.el, opts);
        });
    },

    destroy () {
        if (this.fp) {
            this.fp.destroy();
            this.fp = null;
        }
    }
};

