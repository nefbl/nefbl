
/**
 * 模块
 */

export default function (config) {

    let component = {}, service = [], directive = {};
    let bootstrapComponent = null;

    // 分析出服务，指令和组件
    for (let Item of config.declarations) {

        // 组件
        if (Item.prototype.__type__ == "Component") {
            component[Item.prototype.__selector__] = Item;

            // bootstrap用于标记启动组件
            if (config.bootstrap === Item) {
                bootstrapComponent = Item;
            }
        }

        // 指令
        else if (Item.prototype.__type__ == "Directive") {
            directive[Item.prototype.__selector__] = Item;
        }

        // 服务
        else if (Item.prototype.__type__ == "Service") {
            service.push(new Item());
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
