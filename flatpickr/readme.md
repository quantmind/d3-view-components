## Flatpickr

This component integrate [flatpickr][] datetime picker with [d3-view][].
It only requires the ```viewFlatpickr``` component
```javascript
import {viewFlatpickr} from 'd3-view-component';

vm = view({
    components: {
        flatpickr: viewFlatpickr
    }
});
```

#### Simple Usage

```html
<flatpickr></flatpickr>
```
<flatpickr></flatpickr>
<br>

#### With time

```html
<flatpickr options='{"enableTime": true}'></flatpickr>
```
<flatpickr options='{"enableTime": true}'></flatpickr>
<br>

[d3-view]: https://github.com/quantmind/d3-view
[flatpickr]: https://chmln.github.io/flatpickr/
