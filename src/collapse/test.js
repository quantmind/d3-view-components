import {test} from '../../dev/utils.js';
import {viewCollapse} from '../../build/d3-view-components';


describe('Collapse -', () => {

    test ('simple', async () => {
        expect(viewCollapse.events).toBeTruthy();
    });

});
