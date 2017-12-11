## Modal

Use the modal component to add dialogs to your site for lightboxes, user notifications, or completely custom content.

### Setup

To use the modal you need to include the modal component and a directive:
```javascript
import {viewModal} from 'd3-view-component';

vm = view({
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
<button class="btn btn-primary" d3-on='$openModal({title: "Simple"})'><button>
```
<script></script>
<button class="btn btn-primary" d3-on="$openModal()">Open modal</button>
<br>
