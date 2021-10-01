import { Component, reactive, ref } from 'nefbl';

import style from './index.css';
import template from './index.html';

@Component({
    selector: "app-root",
    template,
    styles: [style]
})
export default class {

    $setup() {

        // reactive

        let infoObj = reactive({
            key1: "苹果",
            key2: 1000,
        });

        // ref

        let info = ref(1);

        setTimeout(() => {
            // info.value = 10;
            infoObj.value.key1 = 11;
        }, 1000);

        return {
            infoObj,
            info,
            doit() {
                this.info = Math.random();
            },
            doit2(){
                alert('你点击了我');
            }
        };

    }

    // 生命周期钩子
    $mounted() {
        // console.log('挂载完毕', this);
    }
    $beforeUpdate() {
        // console.log('更新前', this);
    }
    $updated() {
        // console.log('更新后', this);
    }

};
