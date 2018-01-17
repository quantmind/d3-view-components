import {view} from 'd3-view';

import {test, getWaiter} from '../../dev/utils.js';
import {viewActive} from '../../build/d3-view-components';


describe('viewActive -', () => {

    let vm, waiter;

    beforeEach(() => {
        waiter = getWaiter();
        vm = view({
            model: {
                $destroyDirective (dir) {
                    waiter.resolve(dir);
                }
            },
            directives: {
                active: viewActive
            }
        });
    });

    test ('currentUrl', async () => {
        var el = vm.select('body').append('div').html('<a href="/foo" d3-active>foo link</a>');
        await vm.mount(el);
        vm.sel.remove();
        var dir = await waiter.promise;
        expect(dir.name).toBe('d3-active');
    });

});
