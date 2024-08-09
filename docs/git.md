# Git使用规范

version 1.0.0

为规范仓库分支使用流程，保持工作目录的整洁，正式上线后main分支与dev分支将开启分支保护，无法自由提交代码或者合并其他分支进入，需在Github使用自己的分支发起【合并请求】到main或dev分支，通过审核后方可在Github操作合并进入。

## 分支命名规范

创建新分支时，需遵守内容明确、归属明确的原则，且需要按照分支模版来创建，不符合格式的分支将无法合并进入main或dev。
内容明确是要鲜明的描述出这个分支主要做的更改，或者对应的需求等，方便管理。
归属明确是为了方便快速定位分支的归属，比如需要清理远程分支的时候避免被误删。

### 命名模版

``` sh
[署名]/[内容描述]
```

- 署名：分支创建者的署名，方便定位分支归属人，比如孟智创建的分支，可以使用mengzhi/
- 内容描述：分支的主要更改内容或者对应的需求等，多个单词的话使用连字符分隔，比如更新ESLint配置，可以使用update-eslint-config

#### 示例1

```sh
mengzhi/optimize-homepage
xitu/update-eslint-config
```

## 提交消息规范

规范的提交描述可以更明确的表述更改了哪些文件或做了哪些更改等信息，对于后期需要查找问题时能提供很大帮助，并且方便后续自动生成更新日志等内容，解放生产力。
这里直接引用了使用度最高的Angular提交规范。

### commit message 模版

```sh
[type]([scope]): [subject]
```

- type(必选)：commit类型，主要包含一下详细类型，根据具体更改选择：
  - feat：新增或变更功能
  - fix：修复bug
  - docs：文档或注释类变更，比如更新README.md、函数注释等
  - style：修改代码格式、不影响代码逻辑的变更，如更改缩进、优化代码结构等
  - refactor：代码重构，没有增加新功能或修改bug等
  - perf：优化相关，比如提升性能、提升用户体验等
  - test：测试用例变更，比如集成测试，单元测试等
  - chore：更改构建流程、增加依赖库或工具等
  - revert：回滚到上一个版本
- scope(可选)：涉及到的变更范围，比如具体的文件，如package.json；或者涉及到的工作目录或者模块名，如CasPublicManage；如果涉及到多个目录或文件，可以使用*代替
- subject(必选)：具体的变更描述，描述清楚变更的目的或者做了哪些工作即可，通常不超过50个字符，开头第一个单词可以简单表明操作类型，比如Added Updated Fixed Removed等

#### 示例2

```sh
feat(dashboard): Added new user role detail
fix(permission.js): Fixed user premission handling error
style(*): Updated ESLint error hint
refactor(Dimension): Updated optimize error handling logic for date list retrevial
```
