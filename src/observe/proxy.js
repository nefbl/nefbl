export default function (component, data, key, doback) {

    let proxy = new Proxy(data.value, {
        get(_target, _key) {
            return _target[_key];
        },
        set(_target, _key, _value) {

            // 回调通知组件更新
            doback();

            return Reflect.set(_target, _key, _value);

        }
    });

    data.value = proxy;
    component[key] = proxy;

};
