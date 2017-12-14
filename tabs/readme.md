## Tabs

Tabs are a useful component for building navigations.

### Setup

The best way to include tabs is to create a plugin and use it in the view.
```javascript
import {view} from 'd3-view';
import {viewTabs, viewActive} from 'd3-view-components';

function tabsPlugin(vm) {
    vm.addComponents('tabs', viewTabs);
    vm.addDirective('active', viewActive);
}

view().use(tabsPlugin);
```

Typical usage:
```html
<tabs data-tab-type="pills" data-tab-items='["tab1", "tab2"]'></tabs>
```
<tabs data-tab-type="pills" data-tab-items='["tab1", "tab2"]'></tabs>
