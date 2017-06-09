## 模块发布须知

## 包发布须知

1. 模块名添加`@xmly/`前缀，以指明是内部模块(package.json : `name`)
2. 模块须提供测试、预览
3. 模块必须有README.md

    * 模块使用（调用）说明
    * 模块参数详细说明
    * API接口说明

4. package.json添加指定信息

    * 添加模块源码地址` "homepage": "http://gitlab.ximalaya.com/xiangsai.huang/sinopia"`
    * 添加模块标签 `"tags": "vue,react-native"` 
    * 添加更新说明 `"updateInfo": "本次更新了xxxxxx"` （可选）
    * 添加测试预览地址 `"testUrl": "http://static2.test.ximalaya.com/xxx/xxx"` 

