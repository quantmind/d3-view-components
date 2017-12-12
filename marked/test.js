import {view} from 'd3-view';

import {test} from '../.ci/utils.js';
import {viewMarked} from '../index';


describe('viewMarked -', () => {

    let vm;

    beforeEach(() => {
        vm = view({components: {marked: viewMarked}});
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement('<div></flatpickr></flatpickr></div>'));
    });

});
