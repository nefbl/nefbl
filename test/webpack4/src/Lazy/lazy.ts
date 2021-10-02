import { Directive, mountComponent } from 'nefbl';

@Directive({
    selector: "lazy"
})
export default class {

    _module: any;

    $inserted(el, binding) {
        // console.log(binding);
    }
    $update(el, binding) {
        // console.log(new binding.value.default());
        // console.log(this._module);
        el.innerHTML="";
        mountComponent(el, binding.value.default, this._module);
    }
};
