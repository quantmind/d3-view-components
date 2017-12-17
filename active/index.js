import {viewEvents, viewProviders} from 'd3-view';


export default {

    create (expression) {
        return 'currentUrl';
    },

    refresh (model, value) {
        const
            href = removeFrontSlash(this.sel.attr('href') || '/').split('/'),
            baseUrl = model.baseUrl || '/',
            current = r(value || '/', baseUrl).split('/');

        for (let i=0; i<href.length; ++i) {
            if (current[i] !== href[i])
                return this.sel.classed('active', false);
        }
        this.sel.classed('active', true);
    }
};


viewEvents.on('component-created', vm => {
    if (!vm.parent) vm.model.currentUrl = viewProviders.location.href;
});


function r (url, baseUrl) {
    if (url.substring(0, baseUrl.length) === baseUrl) url = url.substring(baseUrl.length);
    return removeFrontSlash(url);
}


function removeFrontSlash (path) {
    if (path.substring(0, 1) === '/') path = path.substring(1);
    return path;
}
