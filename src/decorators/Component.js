import xhtmlToJson from '@hai2007/algorithm/xhtmlToJson';

/**
 * 组件
 */

export default function (config) {

    let template = xhtmlToJson(config.template);

    console.log(template);

    return function (target) {

        // 对象类型标记
        target.prototype.__type__ = 'Component';

    };

};
