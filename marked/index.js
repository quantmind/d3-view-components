import {viewSlugify} from 'd3-view';


export default {

    props: {
        source: null,
        anchorIcon: 'ion-ios-grid-view-outline'
    },

    render (props, attrs, el) {
        const
            self = this,
            r = this.providers.require,
            classes = attrs.class || 'markdown';

        let marked, hl;


        return Promise.all([r('marked'), r('highlightjs')]).then(libs => {
            [marked, hl] = libs;

            if (!self._markedOptions)
                self._markedOptions = self.markedOptions(props, marked, hl);

            if (props.source)
                return this.fetchText(props.source).then(response => build(response.data));
            else
                return build(this.select(el).text());

        });


        function build (source) {
            source = source ? marked(source, self._markedOptions) : '';
            return self.createElement('div').attr('class', classes).html(source);
        }
    },

    markedOptions (props, marked, hl) {
        if (this._markedOptions) return self._markedOptions;
        var renderer = new marked.Renderer(),
            icon = props.anchorIcon;

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
