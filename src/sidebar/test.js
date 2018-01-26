import {view} from 'd3-view';
import {render} from 'd3-view-test';

import {viewSidebar, viewCollapse} from '../../index';


describe('sidebar -', () => {

    let vm;

    beforeEach(() => {
        vm = view({
            components: {
                sidebar: viewSidebar
            },
            directives: {
                collapse: viewCollapse
            }
        });
    });

    test ('simple', async () => {
        const d = await render('<sidebar/>', vm);
        expect(d.view).toBe(vm);
    });

});
