import {view} from 'd3-view';
import {isFunction} from 'd3-let';

import {test, nextTick} from '../../dev/utils.js';
import {viewAlert} from '../../build/d3-view-components';


describe('Alert -', () => {

    let vm;

    beforeEach(() => {
        vm = view({
            components: {
                alerts: viewAlert
            }
        });
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement('<div><alerts></alerts></div>'));
        expect(isFunction(vm.model.$alertMessage)).toBe(true);
        var alerts = vm.sel.select('.alert-messages').model();
        expect(alerts.messages.length).toBe(0);
        vm.model.$alertMessage('Hi!');
        //
        expect(alerts.messages.length).toBe(1);
        await nextTick();
        //
        var elements = vm.sel.selectAll('.alert');
        expect(elements.size()).toBe(1);
        vm.model.$alertMessage({message: 'warning message', level: 'warn'});
        //
        elements = vm.sel.selectAll('.alert');
        expect(elements.size()).toBe(1);
        await nextTick();
        elements = vm.sel.selectAll('.alert');
        expect(elements.size()).toBe(2);
    });

});
