## Alert Component

The alert component displays alert elements when alert messages are triggered.

Type a message on the right and see the alert appearing on the left.
Same messages with same level are not repeated, instead a counter is added.

<div class="container-float">
    <div class="row">
        <div class="col-sm-6">
            <alerts data-transition-duration=250></alerts>
        </div>
        <div class="col-sm-6">
            <d3form data-schema='/alert/form-example.json'></d3form>
        </div>
    </div>
</div>
<br><br>

This example is created with the markup and the [/alert/form-example.json](/alert/form-example.json)
```html
<div class="container-float">
    <div class="row">
        <div class="col-sm-6">
            <alerts data-transition-duration=250></alerts>
        </div>
        <div class="col-sm-6">
            <d3form data-schema='/alert/form-example.json'></d3form>
        </div>
    </div>
</div>
```

### Setup

To use the component simply include it in the components object of a view.
```javascript
import {view} from 'd3-view';
import {viewAlert} from 'd3-view-components';

var vm = view({
    components: {
        alerts: viewAlert
        ...
    }
});
await vm.mount('body');
```

```html
<isolated><alerts data-messages='["simple message"]'></alerts></isolated>
```
<isolated><alerts data-messages='["simple message"]'></alerts></isolated>

### Javascript Usage

To display a message
```javascript
vm.model.$alertMessage('Hi!');
```
To display messages with different levels:
```javascript
vm.model.$alertMessage({
    message: '<strong>Warning!></strong> This is a wrning message'
    level: 'warning'
});
vm.model.$alertMessage({
    message: '<strong>Danger!></strong> Something very wrong'
    level: 'danger'
});

```

