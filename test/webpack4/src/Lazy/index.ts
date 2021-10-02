import { Component, ref } from 'nefbl';

import style from './index.scss';
import template from './index.html';

let pages = {
    a: () => import('./pages/a'),
    b: () => import('./pages/b')
};

@Component({
    selector: "ui-lazy",
    template,
    styles: [style]
})
export default class {

    $setup() {

        console.log(pages);

        let comp = ref(null);

        setTimeout(() => {
            pages['a']().then(data => {
                comp.value = data;
                setTimeout(() => {
                    pages['b']().then(data => {
                        comp.value = data;
                    });
                }, 3000)
            });
        }, 1000)

        return {
            comp
        };

    }


};
