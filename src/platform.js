import addStylesClient from './tool/addStylesClient';
import mountComponent from './tool/mountComponent';

export default function (options) {

    // 样式生效
    addStylesClient(options.styles || []);

    // 记录根组件
    let rootComponent = null;

    return {
        bootstrap(Module) {

            let module = new Module();

            // 通过启动组件，启动
            rootComponent = mountComponent(options.el, module.__bootstrapComponent__, module);

        }
    };

};
