## Flatpickr

This component integrate [flatpickr][] datetime picker with [d3-view][].
It only requires the ```viewFlatpickr``` component
```javascript
import {viewFlatpickr} from 'd3-view-component';

vm = view({
    components: {
        flatpickr: viewFlatpickr
    },
    directive: {
        flatpickr: viewFlatpickr.$directive
    }
});
```

#### Simple Usage

```html
<flatpickr></flatpickr>
```
<flatpickr></flatpickr>
<br><br>

#### With time

```html
<flatpickr options='{"enableTime": true}'></flatpickr>
```
<flatpickr options='{"enableTime": true}'></flatpickr>
<br><br>

#### In a form

It is easy to include a date picker in a form

```html
<d3form schema='/flatpickr/form-example.json'></d3form>
```
<div class="container-float">
    <form-data class="row">
        <div class="col-sm-6">
            <d3form schema='/flatpickr/form-example.json'></d3form>
        </div>
        <div class="col-sm-6">
            <div d3-marked="formData"></div>
        </div>
    </form-data>
</div>
<br><br>


[d3-view]: https://github.com/quantmind/d3-view
[flatpickr]: https://chmln.github.io/flatpickr/

