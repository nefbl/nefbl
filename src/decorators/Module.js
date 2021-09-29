
/**
 * 模块
 */

export default function (config) {

    let component = {}, service = [], directive = {};
    let bootstrapComponent = null;

    // 分析出服务，指令和组件
    for (let Item of config.declarations) {
        let instance = new Item();

        // 组件
        if (instance.__type__ == "Component") {
            component[instance.__selector__] = instance;

            // bootstrap用于标记启动组件
            if (config.bootstrap === Item) {
                bootstrapComponent = instance;
            }
        }

        // 指令
        else if (instance.__type__ == "Directive") {
            directive[instance.__selector__] = instance;
        }

        // 服务
        else if (instance.__type__ == "Service") {
            service.push(instance);
        }

    }

    return function (target) {

        // 对象类型标记
        target.prototype.__type__ = 'Module';

        // 登记所有的指令、组件和服务（包括依赖的模块的）
        target.prototype.__component__ = component;
        target.prototype.__directive__ = directive;
        target.prototype.__service__ = service;

        // 可能还有启动组件
        target.prototype.__bootstrapComponent__ = bootstrapComponent;

    };

};
