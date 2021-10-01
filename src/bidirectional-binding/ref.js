export default function (data) {

    // 如果是定义的数据，不好监听，嵌套一层壳
    return {
        value: data,
        type: 'ref'
    };

};
