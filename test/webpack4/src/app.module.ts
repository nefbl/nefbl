import { Module } from 'nefbl';

// 组件
import AppComponent from './App/index';

@Module({

    // 声明本模块具有的组件，指令，管道
    declarations: [
        AppComponent
    ],

    // 在这里引入别的模块，
    // 引入就意味着，本模块具有引入模块的组件，指令，管道
    imports: []
})
export default class {

};
