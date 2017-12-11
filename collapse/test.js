import {view} from 'd3-view';

import {test} from '../.ci/utils.js';
import {collapse} from '../index';


describe('Collapse -', () => {

    let vm;

    beforeEach(() => {
        vm = view({directives: {collapse: collapse}});
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement('<div></flatpickr></flatpickr></div>'));
    });

});
