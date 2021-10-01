import { isObject } from '@hai2007/tool/type';
import ref from './ref'

export default function (data) {

    // 如果是对象
    if (isObject(data)) {
        return {
            value: data,
            type: 'reactive'
        };
    }

    // 否则，还是用ref
    else {
        return ref(data);
    }

};
