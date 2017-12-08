export {version as viewComponentsVersion} from './package.json';
export {default as viewFlatpickr} from './flatpickr/index';
export {default as viewCollapse} from './collapse/index';
export {default as viewSidebar} from './sidebar/index';



import {viewBase} from 'd3-view';
//
viewBase.renderFromDist = function (dist, path, context, asElement=true) {
    var d3 = window.d3,
        base;

    dist = d3.resolve(dist);
    try {
        base = new URL(dist).origin;
    } catch (e) {
        base = '';
    }
    return this.renderFromUrl(base + path, context, asElement);
};
