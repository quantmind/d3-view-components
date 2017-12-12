import {viewProviders} from 'd3-view';


export default {

    refresh (model, doc) {
        var self = this,
            require = viewProviders.require,
            marked, hl;

        Promise.all([require('marked'), require('highlightjs')]).then(libs => {
            [marked, hl] = libs;
            marked.setOptions({
                highlight,
                langPrefix: "hljs "
            });
            self.sel.html(marked(doc));
            self.selectChildren().mount();
        });

        function highlight (code, lang) {
            lang = hl.getLanguage(lang) ? [lang] : undefined;
            return hl.highlightAuto(code, lang).value;
        }
    }
};
