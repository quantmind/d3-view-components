import {dispatch} from 'd3-dispatch';
import Navigo from 'navigo/src/index';


export default function (vm, baseUrl) {
    var events = dispatch('before', 'after', 'leave');
    vm.router = new Navigo(baseUrl);
    vm.routerEvents = events;

    router.hooks({
        before (done, params) {
            events.call('before', undefined, vm, params);
            done();
        },
        after (params) {
            vm.model.$set('currentUrl', router.lastRouteResolved().url);
            events.call('after', undefined, vm, params);
        },
        leave (params) {
            events.call('leave', undefined, vm, params);
        }
    });
};
