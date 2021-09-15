module.exports = {

    // 当前配置文件的相对路径上下文
    path: __dirname,

    // package.json路径
    pkg: '.',

    // 注册任务
    task: function (nodejs, pkg, rootPath) {

        ["./dist/nefbl.js", "./dist/nefbl.min.js"].forEach(item => {

            let filePath = require('path').join(rootPath, item);

            let banner = `/*!
 * ${pkg.name} - ${pkg.description}
 *
 * ${pkg.repository.url}
 *
 * author ${pkg.author} < https://hai2007.gitee.io/sweethome >
 *
 * version ${pkg.version}
 *
 * Copyright (c) 2019-${new Date().getFullYear()} hai2007 走一步，再走一步。
 * Released under the ${pkg.license} license
 *
 * Date:${new Date()}
 */`;

            require('fs').writeFileSync(filePath, banner + "\n" + require('fs').readFileSync(filePath));

        });

    }

};
