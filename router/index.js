import {dispatch} from 'd3-dispatch';
import {viewEvents, viewDebounce} from 'd3-view';

import Navigo from './navigo';


export default function (vm, config) {
    config = config || {};
    var events = dispatch('before', 'after', 'leave'),
        baseUrl = vm.providers.resolve(config.basePath || '/'),
        router = new Navigo(baseUrl);

    vm.router = router;
    vm.routerEvents = events;
    vm.updatePageLinks = viewDebounce(function () {
        vm.logDebug('update page links');
        vm.router.updatePageLinks();
    });
    if (config.routes) config.routes(vm);

    router.hooks({
        before (done, params) {
            events.call('before', undefined, vm, params);
            done();
        },
        after (params) {
            // var url = router.lastRouteResolved().url;
            var url = vm.providers.location.href;
            vm.model.$set('currentUrl', url);
            events.call('after', undefined, vm, params);
        },
        leave (params) {
            events.call('leave', undefined, vm, params);
        }
    });

    viewEvents.on('component-mounted', function (cm) {
        var root = cm.root;
        if (root === vm) {
            vm.updatePageLinks();
            if (cm === vm && config.autoResolve !== false) {
                vm.logDebug('Resolve route with router');
                vm.router.resolve();
            }
        }
    });

    return vm;
}
