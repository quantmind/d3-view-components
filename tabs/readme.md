## Tabs

Tabs are a useful component for building navigations.

### Setup

The best way to include tabs is to create a plugin and use it in the view.
```javascript
import {view} from 'd3-view';
import {viewTabs} from 'd3-view-components';

function tabsPlugin(vm) {
    vm.addComponents('tabs', viewTabs);
}

view().use(tabsPlugin);
```

Typical usage:
```html
<tabs data-tab-type="pills" data-tab-items='["tab1", "tab2"]'>
    <div id="tab1">
        <p>Hi, this is tab1</p>
    </div>
    <div id="tab2">
        <p>Hi, this is tab2</p>
    </div>
</tabs>
```
<tabs data-tab-type="pills" data-tab-items='["tab1", "tab2"]'>
    <div id="tab1">
        <p>Hi, this is tab1</p>
    </div>
    <div id="tab2">
        <p>Hi, this is tab2</p>
    </div>
</tabs>
