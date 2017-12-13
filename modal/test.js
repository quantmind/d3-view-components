import {view} from 'd3-view';
import {isFunction} from 'd3-let';

import {test} from '../.ci/utils.js';
import {viewModal} from '../index';


describe('viewMarked -', () => {

    let vm;

    beforeEach(() => {
        vm = view({components: {modal: viewModal}});
    });

    test ('simple', async () => {
        expect(isFunction(viewModal.$openModal)).toBe(true);
    });

});
