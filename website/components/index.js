import formData from './form-data';
import markedPage from './marked';

export default {

    install (vm) {
        vm.addComponent('form-data', formData);
        vm.addComponent('markdown-content', markedPage);
    }

};
