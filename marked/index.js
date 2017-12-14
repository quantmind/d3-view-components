import {viewProviders} from 'd3-view';


export default {

    refresh (model, doc) {
        var self = this,
            r = viewProviders.require,
            marked, hl;

        Promise.all([r('marked'), r('highlightjs')]).then(libs => {
            [marked, hl] = libs;
            marked.setOptions({
                highlight,
                langPrefix: "hljs "
            });
            self.sel.html(doc ? marked(doc) : '');
            model.$emit('markedElement', self.el);
            self.selectChildren().mount();
        });

        function highlight (code, lang) {
            lang = hl.getLanguage(lang) ? [lang] : undefined;
            return hl.highlightAuto(code, lang).value;
        }
    }
};
