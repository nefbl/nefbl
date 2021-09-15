let Nefbl = {};

// 根据运行环境，导出接口
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Nefbl;
} else {
    window.Nefbl = Nefbl;
}
