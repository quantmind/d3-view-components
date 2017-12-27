// d3-view-components Version 0.0.5. Copyright 2017 quantmind.com.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-view'), require('d3-dispatch'), require('d3-ease'), require('d3-let'), require('d3-transition'), require('handlebars')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-view', 'd3-dispatch', 'd3-ease', 'd3-let', 'd3-transition', 'handlebars'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
}(this, (function (exports,d3View,d3Dispatch,d3Ease,d3Let,d3Transition,Handlebars) { 'use strict';

Handlebars = Handlebars && Handlebars.hasOwnProperty('default') ? Handlebars['default'] : Handlebars;

var version = "0.0.5";

var index = {

    //
    // Listen for changes to the currentUrl attribute
    mount: function mount(model) {
        var dir = this;
        model.$on('currentUrl.' + this.uid, function () {
            return dir.refresh(model);
        });
        return model;
    },
    refresh: function refresh(model) {
        var href = this.el.href,
            current = model.currentUrl,
            sel = this.sel;

        sel.classed('active', false);

        if (!href || !current || href !== current.substring(0, href.length)) return;
        if (sel.attr('data-active-strict') !== null && href !== current) return;

        var rel = current.substring(href.length),
            dvd = rel.substring(0, 1);

        if (!rel || dvd === '/' || dvd === '#') this.sel.classed('active', true);
    },


    //
    // Remove listener for changes to the currentUrl attribute
    destroy: function destroy(model) {
        if (model) model.$off('currentUrl.' + this.uid);
    }
};

//
// Make sure the currentUrl attribute is reactive
d3View.viewEvents.on('component-created', function (vm) {
    if (!vm.parent) vm.model.currentUrl = d3View.viewProviders.location.href;
});

var COLLAPSE = 'collapse';
var COLLAPSING = 'd3-collapsing';
var COLLAPSED = 'collapsed';
var WIDTH = 'width';
var SHOW = 'show';

var events = d3Dispatch.dispatch('show-start', 'show-end', 'hide-start', 'hide-end');

var index$1 = {
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

var index$2 = {
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var index$3 = {
    refresh: function refresh(model, doc) {
        var self = this,
            r = d3View.viewProviders.require,
            marked,
            hl;

        self.sel.classed('markdown-body', true);
        Promise.all([r('marked'), r('highlightjs')]).then(function (libs) {
            var _libs = slicedToArray(libs, 2);

            marked = _libs[0];
            hl = _libs[1];

            if (!self._markedOptions) self._markedOptions = self.markedOptions(model, marked, hl);
            self.sel.html(doc ? marked(doc, self._markedOptions) : '');
            model.$emit('markedElement', self.el);
            self.selectChildren().mount();
        });
    },
    markedOptions: function markedOptions(model, marked, hl) {
        if (this._markedOptions) return self._markedOptions;
        var renderer = new marked.Renderer(),
            icon = model.markedAnchorIcon || 'ion-ios-grid-view-outline';

        renderer.heading = heading;

        return {
            renderer: renderer,
            highlight: highlight,
            langPrefix: "hljs "
        };

        function heading(text, level) {
            var id = d3View.viewSlugify(text);
            return '<h' + level + '><a href="#' + id + '" aria-hidden="true" class="anchor" id="content-' + id + '"><i class="' + icon + '"></i></a> ' + text + '</h' + level + '>';
        }

        function highlight(code, lang) {
            lang = hl.getLanguage(lang) ? [lang] : undefined;
            return hl.highlightAuto(code, lang).value;
        }
    }
};

var select = d3View.viewBase.select;

var modalComponent = {
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
    }

};

var modalDirective = {
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
};

var index$4 = {
    modalComponent: modalComponent,
    modalDirective: modalDirective,
    modalOpen: modalOpen,

    install: function install(vm) {
        vm.addComponent('modal', modalComponent);
        vm.addDirective('modal', modalDirective);
        vm.model.$openModal = modalOpen;
    }
};

// function for opening a modal
// inject this method to the root model
function modalOpen(options) {
    if (d3Let.isString(options)) options = optionsFromTarget(options);
    var modal = select('#d3-view-modal');
    if (!modal.size()) select('body').append('modal').mount(options, function (vm) {
        return vm.model.$showModal();
    });else modal.model().$update(options).$showModal();
}

function optionsFromTarget(selector) {
    var sel = select(selector);
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

//
//  Reusable Sidebar component
//  ================================
//
//  Requires:
//
//  * collapse directive
//  * active directive (Optional)
//
var index$5 = {
    props: {
        id: 'sidebar',
        brand: 'sidebar',
        classes: 'navbar-sidebar navbar sticky-top navbar-dark bg-primary',
        brandUrl: '/',
        itemAttr: ''
    },

    model: {
        primaryItems: [],
        secondaryItems: [],
        sidebarToggle: '<i class="ion-android-menu"></i>',
        // navbar attributes
        navbarItems: [],
        navbarTitle: "",
        navbarTitleUrl: "/",
        // collapse action
        $collapse: function $collapse() {
            var collapse = this.$event ? this.$event.currentTarget.d3Collapse : null;
            if (collapse) collapse.hide(collapse.select(this.$event.currentTarget));
        }
    },

    render: function render(props, attrs, el) {
        var model = this.model;
        asItems(model, model.primaryItems);
        asItems(model, model.secondaryItems);
        asItems(model, model.navbarItems);
        props.sidebarContent = this.select(el).html();
        return this.renderFromDist('d3-view-components', '/sidebar/template.html', props);
    }
};

function asItems(model, items) {
    var item = void 0;
    for (var i = 0; i < items.length; ++i) {
        item = items[i];
        if (typeof item === 'string') item = {
            name: item
        };
        if (!(item instanceof d3View.viewModel)) item = model.$new(item);
        if (!item.href) item.$set('href', item.name);
        items[i] = item;
    }
}

var tabClasses = {
    none: null,
    tabs: 'nav-tabs',
    pills: 'nav-pills'
};

//  Reusable Tabs component with Navigo
//
//  Requires:
//
//  * d3-active directive
//
var index$6 = {
    props: {
        tabTransitionDuration: 250
    },

    model: function model() {
        return {
            tabItems: [],
            tabType: 'tabs',
            tabTarget: "",
            tabClass: {
                reactOn: ['tabType'],
                get: function get() {
                    return tabClasses[this.tabType];
                }
            },
            // select a tab
            $selectTab: function $selectTab(tab) {
                if (d3Let.isObject(tab)) tab = tab.href;

                var target = this.targets.get(tab),
                    event = this.$event;

                if (target) {
                    // when local targets are available rather than remote ones
                    this.tabTarget = target;
                    if (event && event.currentTarget) this.currentUrl = event.currentTarget.href;
                } else {
                    // use router if available
                    var router = this.$$view.root.router;
                    if (router && event && event.currentTarget) {
                        event.preventDefault();
                        router.navigate(event.currentTarget.href, true);
                    }
                }
                this.tabItems.forEach(function (item) {
                    item.active = item.href === tab;
                });
            }
        };
    },
    render: function render(props, attrs, el) {
        var self = this,
            model = this.model,
            items = model.tabItems;

        model.targets = new Map();

        items.forEach(function (item, idx) {
            if (d3Let.isString(item)) {
                item = model.$new({ label: item });
                items[idx] = item;
            }
            if (!item.label) item.label = 'item ' + (idx + 1);
            if (!item.id) item.id = d3View.viewSlugify(item.label);
            if (!item.href) item.href = '#' + item.id;
            //
            return item;
        });

        //
        //  cache existing targets if avalable
        this.selectChildren(el).each(function (idx) {
            var sel = self.select(this),
                id = sel.attr('id') || (items[idx] ? items[idx].id : null);
            if (id) model.targets.set('#' + id, sel.html());
        });

        // model.type = data.type;
        return this.renderFromDist('d3-view-components', '/tabs/template.html', props);
    },
    mounted: function mounted() {}
};

function isPushStateAvailable() {
  return !!(typeof window !== 'undefined' && window.history && window.history.pushState);
}

function Navigo(r, useHash, hash) {
  this.root = null;
  this._routes = [];
  this._useHash = useHash;
  this._hash = typeof hash === 'undefined' ? '#' : hash;
  this._paused = false;
  this._destroyed = false;
  this._lastRouteResolved = null;
  this._notFoundHandler = null;
  this._defaultHandler = null;
  this._usePushState = !useHash && isPushStateAvailable();
  this._onLocationChange = this._onLocationChange.bind(this);
  this._genericHooks = null;
  this._historyAPIUpdateMethod = 'pushState';

  if (r) {
    this.root = useHash ? r.replace(/\/$/, '/' + this._hash) : r.replace(/\/$/, '');
  } else if (useHash) {
    this.root = this._cLoc().split(this._hash)[0].replace(/\/$/, '/' + this._hash);
  }

  this._listen();
  this.updatePageLinks();
}

function clean(s) {
  if (s instanceof RegExp) return s;
  return s.replace(/\/+$/, '').replace(/^\/+/, '^/');
}

function regExpResultToParams(match, names) {
  if (names.length === 0) return null;
  if (!match) return null;
  return match.slice(1, match.length).reduce(function (params, value, index) {
    if (params === null) params = {};
    params[names[index]] = decodeURIComponent(value);
    return params;
  }, null);
}

function replaceDynamicURLParts(route) {
  var paramNames = [],
      regexp;

  if (route instanceof RegExp) {
    regexp = route;
  } else {
    regexp = new RegExp(route.replace(Navigo.PARAMETER_REGEXP, function (full, dots, name) {
      paramNames.push(name);
      return Navigo.REPLACE_VARIABLE_REGEXP;
    }).replace(Navigo.WILDCARD_REGEXP, Navigo.REPLACE_WILDCARD) + Navigo.FOLLOWED_BY_SLASH_REGEXP, Navigo.MATCH_REGEXP_FLAGS);
  }
  return { regexp: regexp, paramNames: paramNames };
}

function getUrlDepth(url) {
  return url.replace(/\/$/, '').split('/').length;
}

function compareUrlDepth(urlA, urlB) {
  return getUrlDepth(urlB) - getUrlDepth(urlA);
}

function findMatchedRoutes(url) {
  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return routes.map(function (route) {
    var _replaceDynamicURLPar = replaceDynamicURLParts(clean(route.route)),
        regexp = _replaceDynamicURLPar.regexp,
        paramNames = _replaceDynamicURLPar.paramNames;

    var match = url.replace(/^\/+/, '/').match(regexp);
    var params = regExpResultToParams(match, paramNames);

    return match ? { match: match, route: route, params: params } : false;
  }).filter(function (m) {
    return m;
  });
}

function match(url, routes) {
  return findMatchedRoutes(url, routes)[0] || false;
}

function root(url, routes) {
  var matched = routes.map(function (route) {
    return route.route === '' || route.route === '*' ? url : url.split(new RegExp(route.route + '($|\/)'))[0];
  });
  var fallbackURL = clean(url);

  if (matched.length > 1) {
    return matched.reduce(function (result, url) {
      if (result.length > url.length) result = url;
      return result;
    }, matched[0]);
  } else if (matched.length === 1) {
    return matched[0];
  }
  return fallbackURL;
}

function isHashChangeAPIAvailable() {
  return !!(typeof window !== 'undefined' && 'onhashchange' in window);
}

function extractGETParameters(url) {
  return url.split(/\?(.*)?$/).slice(1).join('');
}

function getOnlyURL(url, useHash, hash) {
  var onlyURL = url,
      split;
  var cleanGETParam = function cleanGETParam(str) {
    return str.split(/\?(.*)?$/)[0];
  };

  if (typeof hash === 'undefined') {
    // To preserve BC
    hash = '#';
  }

  if (isPushStateAvailable() && !useHash) {
    onlyURL = cleanGETParam(url).split(hash)[0];
  } else {
    split = url.split(hash);
    onlyURL = split.length > 1 ? cleanGETParam(split[1]) : cleanGETParam(split[0]);
  }

  return onlyURL;
}

function manageHooks(handler, hooks, params) {
  if (hooks && (typeof hooks === 'undefined' ? 'undefined' : _typeof(hooks)) === 'object') {
    if (hooks.before) {
      hooks.before(function () {
        var shouldRoute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (!shouldRoute) return;
        handler();
        hooks.after && hooks.after(params);
      }, params);
    } else if (hooks.after) {
      handler();
      hooks.after && hooks.after(params);
    }
    return;
  }
  handler();
}

function isHashedRoot(url, useHash, hash) {
  if (isPushStateAvailable() && !useHash) {
    return false;
  }

  if (!url.match(hash)) {
    return false;
  }

  var split = url.split(hash);

  if (split.length < 2 || split[1] === '') {
    return true;
  }

  return false;
}

Navigo.prototype = {
  helpers: {
    match: match,
    root: root,
    clean: clean,
    getOnlyURL: getOnlyURL
  },
  navigate: function navigate(path, absolute) {
    var to;

    path = path || '';
    if (this._usePushState) {
      to = (!absolute ? this._getRoot() + '/' : '') + path.replace(/^\/+/, '/');
      to = to.replace(/([^:])(\/{2,})/g, '$1/');
      history[this._historyAPIUpdateMethod]({}, '', to);
      this.resolve();
    } else if (typeof window !== 'undefined') {
      path = path.replace(new RegExp('^' + this._hash), '');
      window.location.href = window.location.href.replace(/#$/, '').replace(new RegExp(this._hash + '.*$'), '') + this._hash + path;
    }
    return this;
  },
  on: function on() {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[0] === 'function') {
      this._defaultHandler = { handler: args[0], hooks: args[1] };
    } else if (args.length >= 2) {
      if (args[0] === '/') {
        var func = args[1];

        if (_typeof(args[1]) === 'object') {
          func = args[1].uses;
        }

        this._defaultHandler = { handler: func, hooks: args[2] };
      } else {
        this._add(args[0], args[1], args[2]);
      }
    } else if (_typeof(args[0]) === 'object') {
      var orderedRoutes = Object.keys(args[0]).sort(compareUrlDepth);

      orderedRoutes.forEach(function (route) {
        _this.on(route, args[0][route]);
      });
    }
    return this;
  },
  off: function off(handler) {
    if (this._defaultHandler !== null && handler === this._defaultHandler.handler) {
      this._defaultHandler = null;
    } else if (this._notFoundHandler !== null && handler === this._notFoundHandler.handler) {
      this._notFoundHandler = null;
    }
    this._routes = this._routes.reduce(function (result, r) {
      if (r.handler !== handler) result.push(r);
      return result;
    }, []);
    return this;
  },
  notFound: function notFound(handler, hooks) {
    this._notFoundHandler = { handler: handler, hooks: hooks };
    return this;
  },
  resolve: function resolve(current) {
    var _this2 = this;

    var handler, m;
    var url = (current || this._cLoc()).replace(this._getRoot(), '');

    if (this._useHash) {
      url = url.replace(new RegExp('^\/' + this._hash), '/');
    }

    var GETParameters = extractGETParameters(current || this._cLoc());
    var onlyURL = getOnlyURL(url, this._useHash, this._hash);

    if (this._paused) return false;

    if (this._lastRouteResolved && onlyURL === this._lastRouteResolved.url && GETParameters === this._lastRouteResolved.query) {
      if (this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.already) {
        this._lastRouteResolved.hooks.already(this._lastRouteResolved.params);
      }
      return false;
    }

    m = match(onlyURL, this._routes);

    if (m) {
      this._callLeave();
      this._lastRouteResolved = {
        url: onlyURL,
        query: GETParameters,
        hooks: m.route.hooks,
        params: m.params,
        name: m.route.name
      };
      handler = m.route.handler;
      manageHooks(function () {
        manageHooks(function () {
          m.route.route instanceof RegExp ? handler.apply(undefined, toConsumableArray(m.match.slice(1, m.match.length))) : handler(m.params, GETParameters);
        }, m.route.hooks, m.params, _this2._genericHooks);
      }, this._genericHooks, m.params);
      return m;
    } else if (this._defaultHandler && (onlyURL === '' || onlyURL === '/' || onlyURL === this._hash || isHashedRoot(onlyURL, this._useHash, this._hash))) {
      manageHooks(function () {
        manageHooks(function () {
          _this2._callLeave();
          _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._defaultHandler.hooks };
          _this2._defaultHandler.handler(GETParameters);
        }, _this2._defaultHandler.hooks);
      }, this._genericHooks);
      return true;
    } else if (this._notFoundHandler) {
      manageHooks(function () {
        manageHooks(function () {
          _this2._callLeave();
          _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._notFoundHandler.hooks };
          _this2._notFoundHandler.handler(GETParameters);
        }, _this2._notFoundHandler.hooks);
      }, this._genericHooks);
    }
    return false;
  },
  destroy: function destroy() {
    this._routes = [];
    this._destroyed = true;
    clearTimeout(this._listeningInterval);
    if (typeof window !== 'undefined') {
      window.removeEventListener('popstate', this._onLocationChange);
      window.removeEventListener('hashchange', this._onLocationChange);
    }
  },
  updatePageLinks: function updatePageLinks() {
    var self = this;

    if (typeof document === 'undefined') return;

    this._findLinks().forEach(function (link) {
      if (!link.hasListenerAttached) {
        link.addEventListener('click', function (e) {
          var location = self.getLinkPath(link);

          if (!self._destroyed) {
            e.preventDefault();
            self.navigate(location.replace(/\/+$/, '').replace(/^\/+/, '/'));
          }
        });
        link.hasListenerAttached = true;
      }
    });
  },
  generate: function generate(name) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var result = this._routes.reduce(function (result, route) {
      var key;

      if (route.name === name) {
        result = route.route;
        for (key in data) {
          result = result.toString().replace(':' + key, data[key]);
        }
      }
      return result;
    }, '');

    return this._useHash ? this._hash + result : result;
  },
  link: function link(path) {
    return this._getRoot() + path;
  },
  pause: function pause() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this._paused = status;
    if (status) {
      this._historyAPIUpdateMethod = 'replaceState';
    } else {
      this._historyAPIUpdateMethod = 'pushState';
    }
  },
  resume: function resume() {
    this.pause(false);
  },
  historyAPIUpdateMethod: function historyAPIUpdateMethod(value) {
    if (typeof value === 'undefined') return this._historyAPIUpdateMethod;
    this._historyAPIUpdateMethod = value;
    return value;
  },
  disableIfAPINotAvailable: function disableIfAPINotAvailable() {
    if (!isPushStateAvailable()) {
      this.destroy();
    }
  },
  lastRouteResolved: function lastRouteResolved() {
    return this._lastRouteResolved;
  },
  getLinkPath: function getLinkPath(link) {
    return link.getAttribute('href');
  },
  hooks: function hooks(_hooks) {
    this._genericHooks = _hooks;
  },

  _add: function _add(route) {
    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (typeof route === 'string') {
      route = encodeURI(route);
    }
    if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
      this._routes.push({
        route: route,
        handler: handler.uses,
        name: handler.as,
        hooks: hooks || handler.hooks
      });
    } else {
      this._routes.push({ route: route, handler: handler, hooks: hooks });
    }
    return this._add;
  },
  _getRoot: function _getRoot() {
    if (this.root !== null) return this.root;
    this.root = root(this._cLoc().split('?')[0], this._routes);
    return this.root;
  },
  _listen: function _listen() {
    var _this3 = this;

    if (this._usePushState) {
      window.addEventListener('popstate', this._onLocationChange);
    } else if (isHashChangeAPIAvailable()) {
      window.addEventListener('hashchange', this._onLocationChange);
    } else {
      var cached = this._cLoc(),
          current = void 0,
          _check = void 0;

      _check = function check() {
        current = _this3._cLoc();
        if (cached !== current) {
          cached = current;
          _this3.resolve();
        }
        _this3._listeningInterval = setTimeout(_check, 200);
      };
      _check();
    }
  },
  _cLoc: function _cLoc() {
    if (typeof window !== 'undefined') {
      if (typeof window.__NAVIGO_WINDOW_LOCATION_MOCK__ !== 'undefined') {
        return window.__NAVIGO_WINDOW_LOCATION_MOCK__;
      }
      return clean(window.location.href);
    }
    return '';
  },
  _findLinks: function _findLinks() {
    return [].slice.call(document.querySelectorAll('[data-navigo]'));
  },
  _onLocationChange: function _onLocationChange() {
    this.resolve();
  },
  _callLeave: function _callLeave() {
    if (this._lastRouteResolved && this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.leave) {
      this._lastRouteResolved.hooks.leave();
    }
  }
};

Navigo.PARAMETER_REGEXP = /([:*])(\w+)/g;
Navigo.WILDCARD_REGEXP = /\*/g;
Navigo.REPLACE_VARIABLE_REGEXP = '([^\/]+)';
Navigo.REPLACE_WILDCARD = '(?:.*)';
Navigo.FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
Navigo.MATCH_REGEXP_FLAGS = '';

function index$7 (vm, config) {
    config = config || {};
    var events = d3Dispatch.dispatch('before', 'after', 'leave'),
        baseUrl = vm.providers.resolve(config.basePath || '/'),
        router = new Navigo(baseUrl);

    vm.router = router;
    vm.routerEvents = events;
    vm.updatePageLinks = d3View.viewDebounce(function () {
        vm.logDebug('update page links');
        vm.router.updatePageLinks();
    });
    if (config.routes) config.routes(vm);

    router.hooks({
        before: function before(done, params) {
            events.call('before', undefined, vm, params);
            done();
        },
        after: function after(params) {
            // var url = router.lastRouteResolved().url;
            var url = vm.providers.location.href;
            vm.model.$set('currentUrl', url);
            events.call('after', undefined, vm, params);
        },
        leave: function leave(params) {
            events.call('leave', undefined, vm, params);
        }
    });

    d3View.viewEvents.on('component-mounted', function (cm) {
        var root = cm.root;
        if (root === vm) {
            vm.updatePageLinks();
            if (cm === vm && config.autoResolve !== false) {
                vm.logDebug('Resolve route with router');
                vm.router.resolve();
            }
        }
    });

    return vm;
}

d3View.viewProviders.compileTemplate = Handlebars.compile;

exports.viewComponentsVersion = version;
exports.viewActive = index;
exports.viewCollapse = index$1;
exports.viewFlatpickr = index$2;
exports.viewMarked = index$3;
exports.viewModal = index$4;
exports.viewSidebar = index$5;
exports.viewTabs = index$6;
exports.viewRouter = index$7;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3-view-components.js.map
