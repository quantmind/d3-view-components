import {view} from 'd3-view';

import {test, getWaiter} from '../.ci/utils.js';
import {viewFlatpickr} from '../index';


describe('Flatpickr -', () => {

    let vm, waiter;

    beforeEach(() => {
        waiter = getWaiter();
        vm = view({
            model: {
                $flatpickr (opts) {
                    waiter.resolve(opts);
                },
                $destroyDirective (dir) {
                    waiter.resolve(dir);
                }
            },
            directives: {
                flatpickr: viewFlatpickr
            }
        });
    });

    test ('simple', async () => {
        var el = vm.select('body').append('div').html('<input type="text" d3-flatpickr>');
        await vm.mount(el);
        var opts = await waiter.promise;
        expect(opts).toEqual({});
        var dir = vm.sel.select('input').directives().all[0];
        expect(dir.fp).toBeTruthy();
        waiter = getWaiter();
        vm.sel.remove();
        var dir2 = await waiter.promise;
        expect(dir2).toBe(dir);
        expect(dir2.fp).toBe(null);
    });

});
