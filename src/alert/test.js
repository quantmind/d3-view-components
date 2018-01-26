import {view} from 'd3-view';
import {isFunction} from 'd3-let';
import {render, nextTick} from 'd3-view-test';

import {viewAlert} from '../../index';


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
        const d = await render('<alerts/>', vm);
        expect(isFunction(d.view.model.$alertMessage)).toBe(true);
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

    test ('close', async () => {
        const d = await render('<alerts/>', vm);
        d.view.model.$alertMessage('Hi!');
        var alerts = vm.sel.select('.alert-messages').model();
        expect(alerts.messages.length).toBe(1);
        await nextTick();
        let elements = vm.sel.selectAll('.alert');
        expect(elements.size()).toBe(1);
        d.view.model.$alertMessage({message: 'warning message', level: 'warn'});
        //
        // close it
        d.click('button');
        await nextTick();
        elements = vm.sel.selectAll('.alert');
        expect(elements.size()).toBe(0);
    });
});
