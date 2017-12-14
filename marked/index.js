import {viewProviders, viewSlugify} from 'd3-view';


export default {

    refresh (model, doc) {
        var self = this,
            r = viewProviders.require,
            marked, hl;

        self.sel.classed('markdown-body', true);
        Promise.all([r('marked'), r('highlightjs')]).then(libs => {
            [marked, hl] = libs;
            if (!self._markedOptions)
                self._markedOptions = self.markedOptions(model, marked, hl);
            self.sel.html(doc ? marked(doc, self._markedOptions) : '');
            model.$emit('markedElement', self.el);
            self.selectChildren().mount();
        });
    },

    markedOptions (model, marked, hl) {
        if (this._markedOptions) return self._markedOptions;
        var renderer = new marked.Renderer(),
            icon = model.markedAnchorIcon || 'ion-ios-grid-view-outline';

        renderer.heading = heading;

        return {
            renderer,
            highlight,
            langPrefix: "hljs "
        };

        function heading (text, level) {
            var id = viewSlugify(text);
            return `<h${level}><a href="#${id}" aria-hidden="true" class="anchor" id="content-${id}"><i class="${icon}"></i></a> ${text}</h${level}>`;
        }

        function highlight (code, lang) {
            lang = hl.getLanguage(lang) ? [lang] : undefined;
            return hl.highlightAuto(code, lang).value;
        }
    }

};
