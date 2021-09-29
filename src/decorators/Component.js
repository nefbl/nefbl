import xhtmlToJson from '@hai2007/algorithm/xhtmlToJson';
import addStylesClient from '../tool/addStylesClient'

/**
 * 组件
 */

let index = 0;

export default function (config) {

    let uniqueId = "nefbl-scoped-" + (Math.random() * index++).toFixed(0);

    // 加载css
    addStylesClient(config.styles, uniqueId);

    let template = xhtmlToJson("<nefbl-component>" + config.template + "</nefbl-component>");

    return function (target) {

        // 对象类型标记
        target.prototype.__type__ = 'Component';

        // 登记选择器
        target.prototype.__selector__ = config.selector;

        // 登记模板对象
        target.prototype.__template__ = template;

        // 记录唯一标识
        target.prototype.__uniqueId__ = uniqueId;

    };

};
