
/**
 * 指令
 */

export default function (config) {

    return function (target) {

        // 对象类型标记
        target.prototype.__type__ = 'Directive';

        // 登记选择器
        target.prototype.__selector__ = config.selector;

    };

};
