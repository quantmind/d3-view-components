export default {

    refresh (model, value) {
        const
            href = (this.sel.attr('href') || '/').substring(1).split('/'),
            baseUrl = model.baseUrl || '/',
            current = r(value || '/', baseUrl).substring(1).split('/');

        for (let i=0; i<href.length; ++i) {
            if (current[i] !== href[i])
                return this.sel.classed('active', false);
        }
        this.sel.classed('active', true);
    }
};


function r (url, baseUrl) {
    if (url.substring(0, baseUrl.length) === baseUrl) return url.substring(baseUrl.length);
    return url;
}
