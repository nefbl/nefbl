
// 用于挂载组件

export default function mountComponent(target, Component, module) {

    let component = new Component();

    // 记录子组件
    component.__children = [];

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
                    el.setAttribute(attrKey, vnode.attrs[attrKey]);
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
            el.textContent = vnode.content.replace(/↵/g, '\n');
        }

        if (el != null) {
            // 追加到父亲结点
            pEl.appendChild(el);
        }

    })(0, target);

    return component;
};
