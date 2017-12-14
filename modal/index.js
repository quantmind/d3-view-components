import {select} from 'd3-selection';
import {easeExpOut} from 'd3-ease';


export default {
    props: {
        transitionDuration: 300
    },

    model: {
        modalTitle: "d3-view modal",
        modalBody: '',
        modalDisabled: false,
        modalActions: [
            {
                label: "Close"
            }
        ],
        showModal: false,
        $showModal () {
            this.showModal = true;
        },
        $hideModal () {
            this.showModal = false;
        },
        $actionClass (action) {
            return action.level ? `btn-${action.level}` : 'btn-secondary';
        },
        $action (action) {
            if (action.$action) action.$action();
            else this.$hideModal();
        },
        $actionLabel (action) {
            var html = action.icon ? `<i class='${action.icon}'></i> ` : '';
            return `${html}${action.label}`;
        }
    },

    render: function (props) {
        return this.renderFromDist('d3-view-components', '/modal/template.html', props);
    },

    // function for opening a modal
    // inject this method to the root model
    $openModal (options) {
        var modal = select('#d3-view-modal');
        if (!modal.size())
            select('body').append('modal').mount(options, v => v.model.$showModal());
        else
            modal.model().$update(options).$showModal();
    },

    $directive: {
        refresh (model, show) {
            if (!this.passes) return;
            var sel = this.sel,
                modal = sel.classed('modal');
            let height;
            if (show) {
                sel.style('display', 'block').classed('show', true);
                if (modal) {
                    height = sel.style('height');
                    sel.style('top', '-' + height);
                    this.transition(sel).ease(easeExpOut).style('top', '0px');
                }
            }
            else {
                var op = sel.style('opacity'),
                    t = this.transition(sel);
                sel.classed('show', false);
                if (modal) {
                    height = sel.style('height');
                    t.style('top', '-' + height).on('end', function () {
                        sel.style('display', 'none');
                    });
                } else
                    t.style('opacity', 0);
                t.on('end', function () {
                    sel.style('display', 'none').style('opacity', op);
                });
            }
        }
    }
};
