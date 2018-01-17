import {view} from 'd3-view';

import {test} from '../../dev/utils.js';
import {viewTabs, viewActive} from '../../build/d3-view-components';


describe('viewTabs -', () => {

    let vm;

    beforeEach(() => {
        vm = view({
            components: {
                tabs: viewTabs
            },
            directives: {
                active: viewActive
            }
        });
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement(`<div><tabs data-tab-items='["one", "two"]'></tabs></div>`));
    });

});
