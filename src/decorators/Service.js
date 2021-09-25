
/**
 * 服务
 */

export default function (config) {

    return function (target) {

        // 对象类型标记
        target.prototype.__type__ = 'Service';

    };

};
