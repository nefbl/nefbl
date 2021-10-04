import { isArray } from '@hai2007/tool/type';

/**
 * 模块
 */
export default function (config = {}) {

    let component = {}, directive = {};
    let bootstrapComponent = null;

    let exports = {
        component: {},
        directive: {}
    };

    if (isArray(config.declarations)) {

        // 分析出指令和组件
        for (let Item of config.declarations) {

            let needExports = false;

            if (isArray(config.exports)) {

                // 判断是否需要暴露
                /**
                 * 为什么这里暴露出去的需要从declarations中取？
                 * 因为考虑到后期改造的时候，可能新增一些需要在本模块实例化等，
                 * 这样的好处是保罗出去的和内置使用的保持一致，不会乱。
                 */
                for (let ExportItem of config.exports) {
                    if (ExportItem === Item) {
                        needExports = true;
                        break;
                    }
                }

            }

            // 组件
            if (Item.prototype.__type__ == "Component") {
                component[Item.prototype.__selector__] = Item;

                // bootstrap用于标记启动组件
                if (config.bootstrap === Item) {
                    bootstrapComponent = Item;
                }

                if (needExports) {
                    exports.component[Item.prototype.__selector__] = Item;
                }
            }

            // 指令
            else if (Item.prototype.__type__ == "Directive") {
                directive[Item.prototype.__selector__] = Item;

                if (needExports) {
                    exports.directive[Item.prototype.__selector__] = Item;
                }
            }

        }

    }

    if (isArray(config.imports)) {

        // 分析导入的模块
        for (let module of config.imports) {

            // 组件
            for (let key in module.prototype.__exports__.component) {
                component[key] = module.prototype.__exports__.component[key];
            }

            // 指令
            for (let key in module.prototype.__exports__.directive) {
                directive[key] = module.prototype.__exports__.directive[key];
            }

        }

    }

    return function (target) {

        // 对象类型标记
        target.prototype.__type__ = 'Module';

        // 登记所有的指令、组件（包括依赖的模块的）
        target.prototype.__component__ = component;
        target.prototype.__directive__ = directive;

        // 暴露出去的
        target.prototype.__exports__ = exports;

        // 可能还有启动组件
        target.prototype.__bootstrapComponent__ = bootstrapComponent;

    };

};
