// Test utilities
import {viewProviders} from 'd3-view';


//
// Make sure d3-view-components point to the local origin for templates
viewProviders.require.libs.set('d3-view-components', {
    origin: '/base'
});

//
//  Return an object with a promise and the resolve function for the promise
export function getWaiter () {
    var waiter = {};
    waiter.promise = new Promise(function (resolve) {
        waiter.resolve = resolve;
    });
    return waiter;
}
