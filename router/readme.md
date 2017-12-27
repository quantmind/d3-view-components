## View Router

A plugin which integrate [Navigo][] with d3-view.
Navigo is a simple minimalistic JavaScript router with a fallback for older browsers.
Simply ``use`` the plugin and configure it for you needs
```javascript
import {view} from 'd3-view';
import {viewRouter} from {d3-view-components}

var vm = view().use(viewRouter);
await vm.mount('body');
```

The router instance can be accessed as a property of the root view:
```javascript
vm.router   //  Navigo router
```


[Navigo]: https://github.com/krasimir/navigo
