import {view} from 'd3-view';

import {test} from '../.ci/utils.js';
import {viewTabs, viewActive} from '../index';


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
