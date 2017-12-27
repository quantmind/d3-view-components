import {view} from 'd3-view';

import {test, getWaiter} from '../_ci/utils.js';
import {viewMarked} from '../index';


describe('viewMarked -', () => {

    let vm, waiter;

    beforeEach(() => {
        waiter = getWaiter();
        vm = view({
            model: {
                $markedElement (el) {
                    waiter.resolve(el);
                }
            },
            directives: {
                marked: viewMarked
            }
        });
    });

    test ('simple', async () => {
        await vm.mount(vm.viewElement('<div d3-marked="md"></div>'));
        var el = await waiter.promise;
        expect(el.tagName).toBe('DIV');
    });

});
