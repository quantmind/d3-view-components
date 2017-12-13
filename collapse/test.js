import {view} from 'd3-view';

import {test} from '../.ci/utils.js';
import {viewCollapse} from '../index';


describe('Collapse -', () => {

    let vm;

    beforeEach(() => {
        vm = view({directives: {collapse: viewCollapse}});
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement('<div></flatpickr></flatpickr></div>'));
    });

});
