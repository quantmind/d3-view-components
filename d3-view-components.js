// d3-view-components Version 0.0.1. Copyright 2017 quantmind.com.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-view'), require('d3-selection'), require('d3-ease'), require('d3-let'), require('d3-dispatch'), require('d3-transition'), require('handlebars')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-view', 'd3-selection', 'd3-ease', 'd3-let', 'd3-dispatch', 'd3-transition', 'handlebars'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
}(this, (function (exports,d3View,d3Selection,d3Ease,d3Let,d3Dispatch,d3Transition,Handlebars) { 'use strict';

Handlebars = Handlebars && Handlebars.hasOwnProperty('default') ? Handlebars['default'] : Handlebars;

var version = "0.0.1";

var index = {
    refresh: function refresh(model, options) {
        var self = this,
            opts = options && options.$data ? options.$data() : {};

        d3View.viewProviders.require('flatpickr').then(function (flatpickr) {
            if (self.fp) self.fp.destroy();
            self.sel.on('input', null);
            self.sel.on('change', null);
            model.$emit('flatpickr', opts);
            self.fp = flatpickr(self.el, opts);
        });
    },
    destroy: function destroy() {
        if (this.fp) {
            this.fp.destroy();
            this.fp = null;
        }
    }
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var index$1 = {
    refresh: function refresh(model, doc) {
        var self = this,
            r = d3View.viewProviders.require,
            marked,
            hl;

        Promise.all([r('marked'), r('highlightjs')]).then(function (libs) {
            var _libs = slicedToArray(libs, 2);

            marked = _libs[0];
            hl = _libs[1];

            marked.setOptions({
                highlight: highlight,
                langPrefix: "hljs "
            });
            self.sel.html(doc ? marked(doc) : '');
            model.$emit('markedElement', self.el);
            self.selectChildren().mount();
        });

        function highlight(code, lang) {
            lang = hl.getLanguage(lang) ? [lang] : undefined;
            return hl.highlightAuto(code, lang).value;
        }
    }
};

var index$2 = {
    props: {
        transitionDuration: 300
    },

    model: {
        modalTitle: "d3-view modal",
        modalBody: '',
        modalDisabled: false,
        modalActions: [{
            label: "Close"
        }],
        showModal: false,
        $showModal: function $showModal() {
            this.showModal = true;
        },
        $hideModal: function $hideModal() {
            this.showModal = false;
        },
        $actionClass: function $actionClass(action) {
            return action.level ? 'btn-' + action.level : 'btn-secondary';
        },
        $action: function $action(action) {
            if (action.$action) action.$action();else this.$hideModal();
        },
        $actionLabel: function $actionLabel(action) {
            var html = action.icon ? '<i class=\'' + action.icon + '\'></i> ' : '';
            return '' + html + action.label;
        }
    },

    render: function render(props) {
        return this.renderFromDist('d3-view-components', '/modal/template.html', props);
    },

    // function for opening a modal
    // inject this method to the root model
    $openModal: function $openModal(options) {
        if (d3Let.isString(options)) options = optionsFromTarget(options);
        var modal = d3Selection.select('#d3-view-modal');
        if (!modal.size()) d3Selection.select('body').append('modal').mount(options, function (v) {
            return v.model.$showModal();
        });else modal.model().$update(options).$showModal();
    },


    $directive: {
        refresh: function refresh(model, show) {
            if (!this.passes) return;
            var sel = this.sel,
                modal = sel.classed('modal');
            var height = void 0;
            if (show) {
                sel.style('display', 'block').classed('show', true);
                if (modal) {
                    height = sel.style('height');
                    sel.style('top', '-' + height);
                    this.transition(sel).ease(d3Ease.easeExpOut).style('top', '0px');
                }
            } else {
                var op = sel.style('opacity'),
                    t = this.transition(sel);
                sel.classed('show', false);
                if (modal) {
                    height = sel.style('height');
                    t.style('top', '-' + height).on('end', function () {
                        sel.style('display', 'none');
                    });
                } else t.style('opacity', 0);
                t.on('end', function () {
                    sel.style('display', 'none').style('opacity', op);
                });
            }
        }
    }
};

function optionsFromTarget(selector) {
    var sel = d3Selection.select(selector);
    if (sel.size() === 1) {
        return {
            modalTitle: textFromTarget(sel.select('modal-title')),
            modalBody: textFromTarget(sel.select('modal-body'))
        };
    } else {
        d3View.viewWarn('Could not obtain target from selector "' + selector + '"');
        return {};
    }
}

function textFromTarget(sel) {
    if (sel.size()) return sel.html();
    return '';
}

var COLLAPSE = 'collapse';
var COLLAPSING = 'd3-collapsing';
var COLLAPSED = 'collapsed';
var WIDTH = 'width';
var SHOW = 'show';

var events = d3Dispatch.dispatch('show-start', 'show-end', 'hide-start', 'hide-end');

var index$3 = {
    events: events,

    refresh: function refresh() {
        if (this.target) return;

        var self = this,
            sel = this.sel,
            tid = sel.attr('aria-controls'),
            target = tid ? this.select('#' + tid) : null,
            node = target ? target.node() : null;

        if (node) {
            node.d3Collapse = this;
            this.target = target;
            this.smallScreen = sel.attr('data-small-screen') || 993;
            this.container = this.getContainer(target);
            var isOpen = target.classed(SHOW);
            this.duration = 400;
            this.transitioning = false;
            sel.classed(COLLAPSED, !isOpen);
            sel.attr('aria-expanded', isOpen);
            this.on(sel, 'click.' + this.uid, function (event) {
                return self.toggle(target, event);
            });
        }
    },
    show: function show(target, event) {
        if (this.transitioning || target.classed(SHOW)) return;
        if (event) event.preventDefault();
        var self = this,
            sel = this.sel,
            dimension = this.getDimension(target);
        target.classed(COLLAPSE, false).classed(COLLAPSING, true).style(dimension, 0);
        sel.classed(COLLAPSED, false).attr('aria-expanded', true);
        this.transitioning = true;
        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1),
            scrollSize = 'scroll' + capitalizedDimension,
            node = target.node(),
            size = node[scrollSize],
            sizepx = size + 'px';

        if (this.container) this.container.show(sizepx);
        events.call('show-start', undefined, target);

        target.transition().duration(this.duration).style(dimension, sizepx).on("end", function () {
            self.transitioning = false;
            target.classed(COLLAPSING, false).classed(COLLAPSE, true).classed(SHOW, true);
            target.style(dimension, '');
            events.call('show-end', undefined, target);
        });
    },
    hide: function hide(target, event) {
        if (this.transitioning || !target.classed('show')) return;
        if (event) event.preventDefault();
        var self = this,
            sel = this.sel,
            dimension = this.getDimension(target);
        target.classed(COLLAPSING, true).classed(COLLAPSE, false).classed(SHOW, false);
        sel.classed(COLLAPSED, true).attr('aria-expanded', false);
        this.transitioning = true;
        target.style(dimension, '');
        if (this.container) this.container.hide();
        events.call('hide-start', undefined, target);
        target.transition().duration(this.duration).style(dimension, '0px').on("end", function () {
            self.transitioning = false;
            target.classed(COLLAPSING, false).classed(COLLAPSE, true);
            events.call('hide-end', undefined, target);
        });
    },
    toggle: function toggle(target, event) {
        var sel = this.sel,
            expanded = sel.attr('aria-expanded');
        if (expanded === 'false') this.show(target, event);else this.hide(target, event);
    },
    getDimension: function getDimension(target) {
        return target.classed(WIDTH) ? 'width' : 'height';
    },
    getContainer: function getContainer(target) {
        var self = this,
            style = target.attr('data-container'),
            element = style ? this.select(target.node().parentNode) : null;

        if (element) {
            var small = this.getSize(target);

            this.select(window).on('resize.' + this.uid, function () {
                small = self.getSize(target, small);
            });

            return {
                show: function show(sizepx) {
                    element.transition().duration(self.duration).style(style, sizepx).on("end", function () {
                        element.classed(SHOW, true).style(style, '');
                    });
                },
                hide: function hide() {
                    element.transition().duration(self.duration).style(style, '0px').on("end", function () {
                        element.classed(SHOW, false);
                    });
                }
            };
        }
    },
    getSize: function getSize(target, prev) {
        var sizepx = this.select('body').style('width'),
            size = +sizepx.substring(0, sizepx.length - 2),
            small = +size < this.smallScreen;
        if (prev === undefined) {
            if (small) target.classed(SHOW, false);
        } else if (small !== prev) {
            if (small) this.hide(target);else this.show(target);
        }
        return small;
    },
    destroy: function destroy() {
        if (this.target) this.target.on('click.' + this.uid, null);
    }
};

//
//  Reusable Sidebar component
//  ================================
//
//  Requires:
//
//  * navbar component
//  * d3-collapse directive
//  * d3-append directive
//  * d3-active directive
//
var index$4 = {
    props: {
        id: 'sidebar',
        brand: 'sidebar',
        classes: 'navbar-sidebar navbar sticky-top navbar-dark bg-primary',
        brandUrl: '/',
        itemAttr: ''
    },

    model: {
        sidebarContent: '',
        primaryItems: [],
        secondaryItems: [],
        // navbar attributes
        navbarTitle: "",
        navbarTitleUrl: "/",
        sidebarToggle: '<i class="ion-android-menu"></i>',
        // collapse action
        $collapse: function $collapse() {
            var collapse = this.$event ? this.$event.currentTarget.d3Collapse : null;
            if (collapse) collapse.hide(collapse.select(this.$event.currentTarget));
        }
    },

    render: function render(props, attrs, el) {
        this.model.primaryItems = asItems(this.model.primaryItems);
        this.model.secondaryItems = asItems(this.model.secondaryItems);
        this.model.sidebarContent = this.select(el).html();
        return this.renderFromDist('d3-view-components', '/sidebar/template.html', props);
    }
};

function asItems(items) {
    return items.map(function (item) {
        if (typeof item === 'string') {
            item = {
                name: item,
                url: item
            };
        }
        if (!item.url) item.url = '#';
        return item;
    });
}

d3View.viewProviders.compileTemplate = Handlebars.compile;

exports.viewComponentsVersion = version;
exports.viewFlatpickr = index;
exports.viewMarked = index$1;
exports.viewModal = index$2;
exports.viewCollapse = index$3;
exports.viewSidebar = index$4;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3-view-components.js.map
