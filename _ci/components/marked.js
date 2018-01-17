import {viewRouter} from 'd3-view-components';


export default viewRouter.with({

    render (props) {
        const
            urlArgs = props.routeParams,
            self = this,
            mod = urlArgs ? urlArgs.module : null,
            path = mod ? `/${mod}/readme.md` : '/readme.md';

        return this.renderFromDist('d3-view-components', path, null, false).then(md => {
            self.select('title').html(mod ? `d3-view - ${mod}` : 'd3-view components');
            self.model.navbarTitle = mod;
            return self.createElement('markdown').html(md);
        });
    }
});
