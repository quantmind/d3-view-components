import {view} from 'd3-view';

import {test} from '../.ci/utils.js';
import {flatpickr} from '../index';


describe('Flatpickr -', () => {

    let vm;

    beforeEach(() => {
        vm = view({components: {flatpickr: flatpickr}});
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement('<div></flatpickr></flatpickr></div>'));
    });

});
