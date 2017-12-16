## Modal

Use the modal component to add dialogs to your site for lightboxes, user notifications, or completely custom content.

### Setup

To use the modal you need to include the modal component and a directive.
To accomplish this we write a simple d3-view plugin:
```javascript
import {view} from 'd3-view';
import {viewModal} from 'd3-view-components';

function modalPlugin (vm) {
    vm.addComponent('modal', viewModal);
    vm.addDirective('modal', viewModal.$directive);
    //
    // inject $openModal into the root model
    vm.model.$openModal = viewModal.$openModal;
}

view().use(modalPlugin).mount('body');
```

The ``viewModal.$openModal`` is an utility function for opening the modal with
custom options.

### Simple

A simple dialog
```html
<button class="btn btn-primary" d3-on='$openModal("#simple-modal")'><button>
<div id="simple-modal" class="d-none">
    <modal-title>Simple modal</modal-title>
    <modal-body>Demonstrate a simple modal component using d3-view</modal-body>
</div>
```
<button class="btn btn-primary" d3-on="$openModal('#simple-modal')">Open modal</button>
<br>
<div id="simple-modal" class="d-none">
    <modal-title>Simple modal</modal-title>
    <modal-body>Demonstrate a simple modal component using d3-view</modal-body>
</div>
