# Sidebar

Usage:
```javascript
import {viewSidebar, viewCollapse} from 'd3-view-component';

vm = view({
    components: {
        sidebar: viewSidebar
    },
    directives: {
        collapse: viewCollapse
    }
});
```

## Customization

### sidebarToggle

Set the sidebar toggle element which by default is
```html
<i class="ion-android-menu"></i>
```
