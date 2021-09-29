import { Component } from 'nefbl';
import style from './index.scss';

@Component({
    selector: "ui-sub2",
    template: `<span>sub2</span><ui-sub1></ui-sub1>`,
    styles: [style]
})
export default class {

};
