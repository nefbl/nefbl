
/**
 * 模块
 */

export default function (config) {

    console.log(config);



    return function (target) {

        // 对象类型标记
        target.prototype.__type__ = 'Module';

    };

};
