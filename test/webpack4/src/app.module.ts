import { Module } from 'nefbl';

// 组件
import AppComponent from './App/index';
import Sub1 from './App/sub1/index';
import Sub2 from './App/sub2/index';

// 指令
import uiDemo from './Directive/ui-demo';

// 模块
import ModuleA from './Module/A/a.module';
import ModuleB from './Module/B/b.module';

@Module({

    // 声明本模块具有的组件，指令
    // 【组件，指令】在本模块的任何地方，都可以直接使用
    declarations: [
        AppComponent, uiDemo, Sub1, Sub2
    ],

    // 在这里引入别的模块，
    // 引入就意味着，本模块具有引入模块的组件，指令（需要在exports中登记）
    imports: [
        ModuleA, ModuleB
    ],

    // 暴露的内容，如果别的模块想用本模块的内容，需要本模块这此处暴露
    exports: [
        uiDemo
    ],

    // 启动组件，只有主模块需要配置
    bootstrap: AppComponent

})
export default class {

};
