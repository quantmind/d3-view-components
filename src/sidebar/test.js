import {view} from 'd3-view';

import {test} from '../../dev/utils.js';
import {viewSidebar, viewCollapse} from '../../build/d3-view-components';


describe('Flatpickr -', () => {

    let vm;

    beforeEach(() => {
        vm = view({
            components: {
                sidebar: viewSidebar
            },
            directives: {
                collapse: viewCollapse
            }
        });
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement('<div><sidebar></sidebar></div>'));
    });

});
