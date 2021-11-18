import { isFunction } from '@hai2007/tool/type';
import isValidKey from '../tools/isValidKey';
import watcher from '../observe/watcher';
import proxy from '../observe/proxy';
import { evalExpress } from '@hai2007/algorithm/value';

// 用于挂载组件

export default function mountComponent(target, Component, module) {

    let component = new Component();

    let hadWillUpdate = false;

    let observeFunction = () => {
        if (!hadWillUpdate) {
            hadWillUpdate = true;

            setTimeout(() => {
                if (isFunction(component.$beforeUpdate)) component.$beforeUpdate();

                // 触发指令
                for (let directiveInstance of component.__directives) {
                    if (isFunction(directiveInstance.instance.$update)) {

                        directiveInstance.instance.$update(directiveInstance.el, {
                            type: directiveInstance.type,
                            exp: directiveInstance.exp,
                            value: directiveInstance.exp ? evalExpress(component, directiveInstance.exp) : undefined,
                            target: component
                        });

                    }
                }

                if (isFunction(component.$updated)) component.$updated();

                hadWillUpdate = false;
            }, 0);
        }
    };

    if (isFunction(component.$setup)) {

        // 获取当前组件需要双向绑定的数据、方法等
        let instance = component.$setup();

        for (let key in instance) {
            isValidKey(key);

            // ref
            if (instance[key].type == 'ref') {
                watcher(component, instance[key], key, observeFunction);
            }

            // reactive
            else if (instance[key].type == 'reactive') {
                proxy(component, instance[key], key, observeFunction);
            }

            // 方法
            else if (isFunction(instance[key])) {
                component[key] = instance[key];
            }

        }

    }

    // 记录子组件
    component.__children = [];

    // 记录指令
    component.__directives = [];

    let templateObj = component.__template__;

    (function createElement(index, pEl) {

        let vnode = templateObj[index], el = null;

        if (vnode.type == 'tag') {

            // 如果是组件
            if (vnode.name in module.__component__) {

                // 编译子组件并登记
                component.__children.push(mountComponent(pEl, module.__component__[vnode.name], module));

            }

            // 否则就是普通的标签
            else {

                el = document.createElement(vnode.name);
                for (let attrKey in vnode.attrs) {

                    let attrKeys = (attrKey + ":").split(':');

                    // 指令
                    if (attrKeys[0] in module.__directive__) {

                        let directiveInstance = new module.__directive__[attrKeys[0]];

                        let type = attrKeys[1];
                        let exp = vnode.attrs[attrKey];

                        if (isFunction(directiveInstance.$inserted)) {
                            setTimeout(() => {
                                directiveInstance.$inserted(el, {
                                    type,
                                    exp,
                                    value: exp ? evalExpress(component, exp) : undefined,
                                    target: component
                                });
                            });
                        }

                        component.__directives.push({
                            instance: directiveInstance,
                            el,
                            type,
                            exp
                        });
                    }

                    // 普通属性
                    else {
                        el.setAttribute(attrKey, vnode.attrs[attrKey]);
                    }

                }

                if (component.__uniqueId__ != null) {

                    // 配置唯一标识
                    el.setAttribute(component.__uniqueId__, "");
                }

                // 追加孩子
                for (let subVnode of vnode.childNodes) {
                    createElement(subVnode, el);
                }

            }

        } else if (vnode.type == 'text') {
            el = document.createTextNode("");
            el.textContent = vnode.content.replace(/↵/g, '\n')

                // 特殊转义字符进行校对
                .replace(/\&lt;/g, '<')
                .replace(/\&gt;/g, '>')
                .replace(/\&amp;/g, '&');
        }

        if (el != null) {
            // 追加到父亲结点
            pEl.appendChild(el);
        }

    })(0, target);

    if (isFunction(component.$mounted)) component.$mounted();

    return component;
};
