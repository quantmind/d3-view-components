import {view} from 'd3-view';

import {test} from '../.ci/utils.js';
import {viewFlatpickr} from '../index';


describe('Flatpickr -', () => {

    let vm;

    beforeEach(() => {
        vm = view({directives: {flatpickr: viewFlatpickr}});
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement('<div><input type="text" d3-flatpickr>></div>'));
    });

});
