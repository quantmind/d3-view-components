
const icons = {
    //  map icon name to svg src
    //  by default use feather icons
    default: 'droplet',

    src (name) {
        return `https://unpkg.com/feather-icons/dist/icons/${name}.svg`;
    },

    install (vm) {
        vm.addComponent('icon', icon);
    }
};


//
//  Icon component
export const icon = {
    props: {
        name: null,
        src: null
    },

    render (props) {
        const name = props.name || icons.default;
        const src = props.src ? props.src : icons.src(name);
        if (!name) return '<i/>';
        return this.createElement('img')
            .attr('alt', name)
            .attr('src', src);
    }
};


export default icons;
