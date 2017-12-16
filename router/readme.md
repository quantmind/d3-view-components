## View Router

A plugin which integrate [Navigo][] with d3-view.
Navigo is a simple minimalistic JavaScript router with a fallback for older browsers.
Simply ``use`` the plugin and canfigure it for you needs
```javascript
import {view} from 'd3-view';
import {viewRouter} from {d3-view-components}

view().use(viewRouter).mount('body');
```

[Navigo]: https://github.com/krasimir/navigo
