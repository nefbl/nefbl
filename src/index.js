
/**
 * 一些用来定义特殊对象的装饰器
 */

// 模块
import Module from './decorators/Module';

// 组件
import Component from './decorators/Component';

// 指令
import Directive from './decorators/Directive';

/**
 * 核心方法
 */

// 平台实例工厂
import platform from './platform';

/**
 * 双向绑定
 */

import ref from './bidirectional-binding/ref';
import reactive from './bidirectional-binding/reactive';

/**
 * 整理好对象并对外暴露调用接口
 */

let Nefbl = {

    // 装饰器
    Module,
    Component,
    Directive,

    // 核心方法
    platform,

    // 暴露的一些有用的方法
    ref,
    reactive

};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Nefbl;
} else {
    window.Nefbl = Nefbl;
}

