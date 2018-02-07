
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


const icon = {
    props: {
        name: null
    },

    render (props) {
        const name = props.name || icons.default;
        if (!name) return '<i/>';
        return this.createElement('img')
            .attr('alt', name)
            .attr('src', icons.src(name));
    }
};


export default icons;
