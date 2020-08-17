1. 修改package.json 中代理服务器的目标地址为 http://localhost:5000 

2. 自定义Test组件 在pages/Edu 下添加新的Test 组件 然后在   config 文件夹下 asyncComps 文件内引入并导出该组件 然后去页面中权限管理 -> 菜单管理 -> 添加该组件到对应的菜单，然后去角色管理 给角色admin添加权限给该组件权限打勾 

3. subjectList 组件 
   - config 文件夹下 asyncComps 文件内引入并导出该文件 然后就能在页面显示该文件 
   - 完成静态页面 