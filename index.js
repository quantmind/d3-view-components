export {version as viewComponentsVersion} from './package.json';
export {default as viewActive} from './src/active/index';
export {default as viewAlert} from './src/alert/index';
export {default as viewAutocomplete} from './src/autocomplete/index';
export {default as viewCard} from './src/card/index';
export {default as viewCollapse} from './src/collapse/index';
export {default as viewFlatpickr} from './src/flatpickr/index';
export {default as viewIcons} from './src/icons/index';
export {default as viewMarked} from './src/markdown/index';
export {default as viewModal} from './src/modal/index';
export {default as viewSidebar} from './src/sidebar/index';
export {default as viewTabs} from './src/tabs/index';
export {default as viewRouter} from './src/router/index';

import 'd3-transition';
import Handlebars from 'handlebars';
import {viewProviders} from 'd3-view';

viewProviders.compileTemplate = Handlebars.compile;
