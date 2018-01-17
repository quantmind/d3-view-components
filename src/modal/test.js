import {view} from 'd3-view';
import {isFunction} from 'd3-let';

import {test, nextTick} from '../../dev/utils.js';
import {viewModal} from '../../build/d3-view-components';


describe('viewMarked -', () => {

    let vm;

    beforeEach(() => {
        vm = view().use(viewModal);
    });

    test ('simple', async () => {
        expect(isFunction(vm.model.$openModal)).toBe(true);
        expect(vm.model.$openModal).toBe(viewModal.modalOpen);
        await vm.mount(vm.createElement('div'));
        expect(vm.model.$openModal).toBe(viewModal.modalOpen);
        vm.model.$openModal({
            title: "test",
            body: "this is a test for the modal"
        });
        await nextTick();
        //var model = vm.select('#d3-view-modal').model();
        //expect(model.showModal).toBe(true);
    });

});
