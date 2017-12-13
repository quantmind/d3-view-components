export default {
    model: {
        formData: '',
        $formFieldChange (field) {
            var data = field.form.$inputData(),
                mkd = [
                    "#### Form inputs",
                    "```json",
                    JSON.stringify(data, null, '    '),
                    "```"
                ];
            this.formData = mkd.join('\n');
        }
    },

    render (props, attrs, ol) {
        var el = this.createElement('div').html(this.select(ol).html());
        Object.keys(attrs).forEach(attr => {
            el.attr(attr, attrs[attr]);
        });
        return el
    }
};
