import addStylesClient from './tool/addStylesClient';
import mountComponent from './tool/mountComponent';

export default function (options) {

    // 样式生效
    addStylesClient(options.styles || []);

    return {
        bootstrap(Module) {

            let module = new Module();

            mountComponent(options.el, module.__bootstrapComponent__);

        }
    };

};
