export default function (component, data, key, doback) {

    // 记录值
    let value = data.value;

    let getter_setter = {
        get() {
            return value;
        },
        set(newValue) {
            value = newValue;

            // 回调通知组件更新
            doback();
        }
    };

    // setter和getter添加监听
    Object.defineProperty(data, 'value', getter_setter);

    // 组件实例新增属性
    component[key] = value;
    Object.defineProperty(component, key, getter_setter);

};
