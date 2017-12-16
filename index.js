export {version as viewComponentsVersion} from './package.json';
export {default as viewActive} from './active/index';
export {default as viewCollapse} from './collapse/index';
export {default as viewFlatpickr} from './flatpickr/index';
export {default as viewMarked} from './marked/index';
export {default as viewModal} from './modal/index';
export {default as viewSidebar} from './sidebar/index';
export {default as viewTabs} from './tabs/index';
export {default as viewRouter} from './router/index';

import 'd3-transition';
import Handlebars from 'handlebars';
import {viewProviders} from 'd3-view';

viewProviders.compileTemplate = Handlebars.compile;
