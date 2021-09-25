import { evalExpress } from "@hai2007/algorithm/value";

/**
 * 指令
 */

export default function (config) {

    return function (target) {

         // 对象类型标记
         target.prototype.__type__ = 'Directive';

    };

};
