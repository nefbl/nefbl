
// 用于挂载组件

export default function mountComponent(target, Component) {

    let templateObj = Component.__template__;

    (function createElement(index, pEl) {

        let vnode = templateObj[index], el;

        if (vnode.type == 'tag') {
            el = document.createElement(vnode.name);
            for (let attrKey in vnode.attrs) {
                el.setAttribute(attrKey, vnode.attrs[attrKey]);
            }
            // 配置唯一标识
            el.setAttribute(Component.__uniqueId__, "");

            // 追加孩子
            for (let subVnode of vnode.childNodes) {
                createElement(subVnode, el);
            }


        } else if (vnode.type == 'text') {
            el = document.createTextNode("");
            el.textContent = vnode.content.replace(/↵/g, '\n');
        }

        // 追加到父亲结点
        pEl.appendChild(el);


    })(0, target);

};
