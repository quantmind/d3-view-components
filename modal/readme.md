## Modal

Use the modal component to add dialogs to your site for lightboxes, user notifications, or completely custom content.

### Setup

To use the modal you need to include the modal component and a directive:
```javascript
import {view} from 'd3-view';
import {viewModal} from 'd3-view-component';

var vm = view({
    components: {
        modal: viewModal
    }
});
//
// inject $openModal into the root model
vm.model.$openModal = viewModal.$openModal;
```

The ``viewModal.$openModal`` is an utility function for opening the modal with
custom options.

### Simple

A simple dialog
```html
<button class="btn btn-primary" d3-on='$openModal("#simple-modal")'><button>
```
<button class="btn btn-primary" d3-on="$openModal('#simple-modal')">Open modal</button>
<br>
