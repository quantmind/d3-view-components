export default {
    model: {
        formData: '',
    },

    render (props, attrs, ol) {
        var el = this.createElement('div').html(this.select(ol).html());
        Object.keys(attrs).forEach(attr => {
            el.attr(attr, attrs[attr]);
        });
        return el
    }
};
