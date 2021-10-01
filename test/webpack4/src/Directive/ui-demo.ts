import { Directive } from 'nefbl';

@Directive({
    selector: "ui-demo"
})
export default class {
    $inserted(el, binding) {
        console.log('第一次在页面生效', el, binding);
    }
    $update(el, binding) {
        console.log('数据更新导致的执行', el, binding);
    }
};
