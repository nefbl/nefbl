import addStylesClient from './component/addStylesClient';
import mountComponent from './component/mountComponent';

export default function (options) {

    // 样式生效
    addStylesClient(options.styles || []);

    // 记录根组件
    let rootComponent = null;

    return {
        bootstrap(Module) {

            let module = new Module();

            // 在所有的指令和组件中登记所在模块
            let allList = { ...module.__component__, ...module.__directive__ };
            for (let key in allList) {
                allList[key].prototype._module = module;
            }

            // 通过启动组件，启动
            rootComponent = mountComponent(options.el, module.__bootstrapComponent__, module);

            return {

                // 根组件
                rootComponent,

                // 当前模块对象
                module
            };

        }
    };

};
