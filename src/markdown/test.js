import {view} from 'd3-view';

import {viewMarked} from '../../index';


describe('viewMarked -', () => {

    let vm;

    beforeEach(() => {
        vm = view({
            components: {
                markdown: viewMarked
            }
        });
    });

    test ('simple', async () => {
        expect(vm).toBeTruthy();
        //await vm.mount(vm.viewElement('<div><markdown># A Test</markdown></div>'));
        //var sel = vm.sel.select('.markdown');
        //expect(sel.size()).toBe(1);
        //expect(sel.node().tagName).toBe('DIV');
    });

});
