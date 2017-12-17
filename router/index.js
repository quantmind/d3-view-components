import {dispatch} from 'd3-dispatch';
import {viewEvents, viewDebounce} from 'd3-view';

import Navigo from 'navigo/src/index';


export default function (vm, config) {
    config = config || {};
    var events = dispatch('before', 'after', 'leave'),
        baseUrl = removeBackSlash(vm.providers.resolve(config.basePath || '/')),
        router = new Navigo(baseUrl);

    vm.router = router;
    vm.routerEvents = events;
    vm.updatePageLinks = viewDebounce(function () {
        vm.logDebug('update page links');
        vm.router.updatePageLinks();
    });

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

    viewEvents.on('component-mounted', function (cm) {
        var root = cm.root;
        if (root === vm) {
            vm.updatePageLinks();
            if (cm === vm && config.autoResolve !== false) vm.router.resolve();
        }
    });

    if (config.routes) config.routes(vm);
    return vm;
};


function removeBackSlash (path) {
    if (path.substring(path.length-1) === '/') path = path.substring(0, path.substring-1);
    return path;
}
