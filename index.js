export {version as viewComponentsVersion} from './package.json';
export {default as viewFlatpickr} from './flatpickr/index';
export {default as viewCollapse} from './collapse/index';
export {default as viewSidebar} from './sidebar/index';

import 'd3-transition';
import Handlebars from 'handlebars';
import {viewProviders} from 'd3-view';

viewProviders.compileHtml = Handlebars.compile;
