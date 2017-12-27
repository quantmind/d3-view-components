import {test} from '../_ci/utils.js';
import {viewCollapse} from '../index';


describe('Collapse -', () => {

    test ('simple', async () => {
        expect(viewCollapse.events).toBeTruthy();
    });

});
