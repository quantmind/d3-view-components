import {view} from 'd3-view';

import {test} from '../.ci/utils.js';
import {viewSidebar} from '../index';


describe('Flatpickr -', () => {

    let vm;

    beforeEach(() => {
        vm = view({
            components: {
                sidebar: viewSidebar
            }
        });
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement('<div><sidebar></sidebar></div>'))
    });

});
