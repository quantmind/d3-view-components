## Marked directive

The ``viewMarked`` directive can be used to render markdown into the hosting element.
The directive asynchrnously requires two libraries:

* [marked][] for rendering markdown
* [highlightjs][] for syntax highlighting

To use the directive, make sure it is included in the view constructor:
```javascript
import {view} from 'd3-view';
import {viewMarked} from 'd3-view-component';

var vm = view({
    directives: {
        marked: viewMarked
    }
});
```

alternatively, you can crate a plugin for it.

The directive is used throughout this site to render markdown form the [d3-view-component repo](https://github.com/quantmind/d3-view-components).

Simple usage:
```html
<div class="docs" d3-marked="docs"></div>
```


[marked]: https://github.com/chjj/marked
[highlightjs]: https://highlightjs.org/
