// 统一请求路径前缀在libs/axios.js中修改
import { getRequest, postRequest, putRequest, getNoAuthRequest, postNoAuthRequest } from '@/libs/axios';
import { resolve, reject } from 'core-js/fn/promise';



// 文件上传接口
export const uploadFile = "/xboot/upload/file"
// 验证码渲染图片接口
export const drawCodeImage = "/xboot/common/captcha/draw/"
// 获取菜单
export const getMenuList = "/xboot/permission/getMenuList"
// 获取数据字典
export const getDictData = "/xboot/dictData/getByType/"



// 登陆
export const login = (params) => {
    // return postNoAuthRequest('/login', params)
    return new Promise((resolve, reject) => {
        resolve({ "result": "5f2a2f96ad05403484bf05b07494e389", "code": 200, "success": true, "message": "登录成功", "timestamp": 1592924627027 })
    });
}
// 获取用户登录信息
export const userInfo = (params) => {
    // return getRequest('/user/info', params)
    return new Promise((resolve, reject) => {
        resolve({ "success": true, "message": "success", "code": 200, "timestamp": 1592924627349, "result": { "id": "4363087427670016", "createBy": "", "createTime": "2018-05-03 15:09:42", "updateBy": "test", "updateTime": "2020-06-16 17:26:59", "delFlag": 0, "username": "test", "password": null, "nickname": "游客1", "mobile": "18782059033", "email": "test@exrick.cn", "address": "[\"510000\",\"510300\",\"510303\"]", "street": "", "sex": "男", "passStrength": "弱", "avatar": "http://img.exrick.cn/e38284cd11864bcc92ee39d7548ad829.png", "type": 0, "status": 0, "description": "", "departmentId": "40343262766043136", "departmentTitle": "成都分部", "birth": "2020-04-29", "roles": [{ "id": null, "name": "ROLE_USER", "description": null }], "permissions": [{ "title": "编辑已发送消息", "path": "/xboot/messageSend/update*" }, { "title": "添加按钮测试", "path": "test-add" }, { "title": "编辑按钮测试", "path": "test-edit" }, { "title": "删除按钮测试", "path": "test-delete" }], "defaultRole": null } })
    });
}
// 注册
export const regist = (params) => {
    return postNoAuthRequest('/user/regist', params)
}
// 初始化验证码
export const initCaptcha = (params) => {
    return getNoAuthRequest('/common/captcha/init', params)
}
// IP天气信息
export const ipInfo = (params) => {
    // return getRequest('/common/ip/info', params)
    return new Promise((resolve, reject) => {
        resolve({ "success": true, "message": "success", "code": 200, "timestamp": 1592924627762, "result": "江苏省 无锡市 新吴区" })
    });
}
// 个人中心编辑
export const userInfoEdit = (params) => {
    return postRequest('/user/edit', params)
}
// 个人中心修改密码
export const changePass = (params) => {
    return postRequest('/user/modifyPass', params)
}
// 解锁
export const unlock = (params) => {
    return postRequest('/user/unlock', params)
}




// 获取用户数据 多条件
export const getUserListData = (params) => {
    // return getRequest('/user/getByCondition', params)
    return new Promise((resolve, reject) => {
        resolve({ "success": true, "message": "success", "code": 200, "timestamp": 1592926201753, "result": { "content": [{ "id": "1275424163900821505", "createBy": null, "createTime": "2020-06-23 21:43:11", "updateBy": null, "updateTime": "2020-06-23 21:43:11", "delFlag": 0, "username": "aa20171", "password": null, "nickname": "aa20171", "mobile": "13026690693", "email": "1157537635@qq.com", "address": null, "street": null, "sex": null, "passStrength": "中", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }, { "id": "1275343428833644545", "createBy": null, "createTime": "2020-06-23 16:22:22", "updateBy": null, "updateTime": "2020-06-23 16:22:22", "delFlag": 0, "username": "way4005", "password": null, "nickname": "匪帅", "mobile": "18983876678", "email": "liufei@ue-one.com", "address": null, "street": null, "sex": null, "passStrength": "中", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }, { "id": "1275266661057957889", "createBy": null, "createTime": "2020-06-23 11:17:20", "updateBy": null, "updateTime": "2020-06-23 11:17:20", "delFlag": 0, "username": "cargo", "password": null, "nickname": "cargo", "mobile": "13602520960", "email": "cargo@qq.com", "address": null, "street": null, "sex": null, "passStrength": "中", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }, { "id": "1275252365049597952", "createBy": null, "createTime": "2020-06-23 10:20:31", "updateBy": null, "updateTime": "2020-06-23 10:20:31", "delFlag": 0, "username": "bestboy", "password": null, "nickname": "bestboy", "mobile": "18301530809", "email": "944952110@qq.com", "address": null, "street": null, "sex": null, "passStrength": "中", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }, { "id": "1275239836265091072", "createBy": null, "createTime": "2020-06-23 09:30:44", "updateBy": null, "updateTime": "2020-06-23 09:30:44", "delFlag": 0, "username": "woobliss", "password": null, "nickname": "test", "mobile": "18503025018", "email": "woobliss@163.com", "address": null, "street": null, "sex": null, "passStrength": "弱", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }, { "id": "1275224977444048897", "createBy": null, "createTime": "2020-06-23 08:31:41", "updateBy": null, "updateTime": "2020-06-23 08:31:41", "delFlag": 0, "username": "leedon", "password": null, "nickname": "ledo", "mobile": "15666619788", "email": "11841994@qq.com", "address": null, "street": null, "sex": null, "passStrength": "弱", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }, { "id": "1275055162003689473", "createBy": null, "createTime": "2020-06-22 21:16:54", "updateBy": null, "updateTime": "2020-06-22 21:16:54", "delFlag": 0, "username": "qq34384878", "password": null, "nickname": "子非鱼", "mobile": "18120440747", "email": "fangyu_wh@163.com", "address": null, "street": null, "sex": null, "passStrength": "中", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }, { "id": "1275053231399112704", "createBy": null, "createTime": "2020-06-22 21:09:14", "updateBy": null, "updateTime": "2020-06-22 21:09:14", "delFlag": 0, "username": "test123", "password": null, "nickname": "zhangsan", "mobile": "15200221552", "email": "1945623533@qq.com", "address": null, "street": null, "sex": null, "passStrength": "弱", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }, { "id": "1275028007039406081", "createBy": null, "createTime": "2020-06-22 19:29:00", "updateBy": null, "updateTime": "2020-06-22 19:29:00", "delFlag": 0, "username": "medo", "password": null, "nickname": "medo", "mobile": "18792561815", "email": "a1373721@163.com", "address": null, "street": null, "sex": null, "passStrength": "中", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }, { "id": "1274976493017108481", "createBy": null, "createTime": "2020-06-22 16:04:18", "updateBy": null, "updateTime": "2020-06-22 16:04:18", "delFlag": 0, "username": "Greensharp", "password": null, "nickname": "快刀青衣", "mobile": "13018993533", "email": "503982746@qq.com", "address": null, "street": null, "sex": null, "passStrength": "中", "avatar": "https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png", "type": 0, "status": 0, "description": null, "departmentId": null, "departmentTitle": null, "birth": null, "roles": [{ "id": "496138616573953", "name": "ROLE_USER", "description": null }], "permissions": null, "defaultRole": null }], "pageable": { "sort": { "sorted": true, "unsorted": false, "empty": false }, "pageSize": 10, "pageNumber": 0, "offset": 0, "paged": true, "unpaged": false }, "totalElements": 244, "last": false, "totalPages": 25, "sort": { "sorted": true, "unsorted": false, "empty": false }, "numberOfElements": 10, "first": true, "size": 10, "number": 0, "empty": false } })
    })
}
// 通过用户名搜索
export const searchUserByName = (username, params) => {
    return getRequest('/user/searchByName/' + username, params)
}
// 获取全部用户数据
export const getAllUserData = (params) => {
    return getRequest('/user/getAll', params)
}
// 通过部门获取全部用户数据
export const getUserByDepartmentId = (id, params) => {
    return getRequest(`/user/getByDepartmentId/${id}`, params)
}
// 添加用户
export const addUser = (params) => {
    return postRequest('/user/admin/add', params)
}
// 编辑用户
export const editUser = (params) => {
    return postRequest('/user/admin/edit', params)
}
// 启用用户
export const enableUser = (id, params) => {
    return postRequest(`/user/admin/enable/${id}`, params)
}
// 禁用用户
export const disableUser = (id, params) => {
    return postRequest(`/user/admin/disable/${id}`, params)
}
// 删除用户
export const deleteUser = (params) => {
    return postRequest('/user/delByIds', params)
}
// 重置用户密码
export const resetUserPass = (params) => {
    return postRequest('/user/resetPass', params)
}



// 获取一级部门
export const initDepartment = (params) => {
    // return getRequest('/department/getByParentId/0', params)
    return new Promise((resolve, reject) => {
        resolve({ "success": true, "message": "success", "code": 200, "timestamp": 1592926201734, "result": [{ "id": "40322777781112832", "createBy": "", "createTime": "2018-08-10 20:40:40", "updateBy": "", "updateTime": "2018-08-11 00:03:06", "delFlag": 0, "title": "总部", "parentId": "0", "isParent": true, "sortOrder": 1.00, "status": 0, "parentTitle": "一级部门", "mainHeader": ["682265633886208"], "viceHeader": ["682265633886208", "16739222421508096"] }, { "id": "40343262766043136", "createBy": "", "createTime": "2018-08-10 22:02:04", "updateBy": "", "updateTime": "2018-08-11 00:02:53", "delFlag": 0, "title": "成都分部", "parentId": "0", "isParent": true, "sortOrder": 2.00, "status": 0, "parentTitle": "一级部门", "mainHeader": [], "viceHeader": [] }, { "id": "40652270295060480", "createBy": "", "createTime": "2018-08-11 18:29:57", "updateBy": "", "updateTime": "2018-09-22 00:07:05", "delFlag": 0, "title": "人事部", "parentId": "0", "isParent": true, "sortOrder": 3.00, "status": 0, "parentTitle": "一级部门", "mainHeader": [], "viceHeader": [] }] })
    });
}
// 加载部门子级数据
export const loadDepartment = (id, params) => {
    return getRequest(`/department/getByParentId/${id}`, params)
}
// 添加部门
export const addDepartment = (params) => {
    return postRequest('/department/add', params)
}
// 编辑部门
export const editDepartment = (params) => {
    return postRequest('/department/edit', params)
}
// 删除部门
export const deleteDepartment = (params) => {
    return postRequest('/department/delByIds', params)
}
// 搜索部门
export const searchDepartment = (params) => {
    return getRequest('/department/search', params)
}



// 获取全部角色数据
export const getAllRoleList = (params) => {
    // return getRequest('/role/getAllList', params)
    return new Promise((resolve, reject) => {
        resolve({ "success": true, "message": "success", "code": 200, "timestamp": 1592926201733, "result": [{ "id": "496138616573952", "createBy": "", "createTime": "2018-04-22 23:03:49", "updateBy": "admin", "updateTime": "2018-11-15 23:02:59", "delFlag": 0, "name": "ROLE_ADMIN", "defaultRole": null, "dataType": 0, "description": "超级管理员 拥有所有权限", "permissions": null, "departments": null }, { "id": "496138616573953", "createBy": "", "createTime": "2018-05-02 21:40:03", "updateBy": "admin", "updateTime": "2018-11-01 22:59:48", "delFlag": 0, "name": "ROLE_USER", "defaultRole": true, "dataType": 0, "description": "普通注册用户 路过看看", "permissions": null, "departments": null }, { "id": "16457350655250432", "createBy": "", "createTime": "2018-06-06 00:08:00", "updateBy": "admin", "updateTime": "2018-11-02 20:42:24", "delFlag": 0, "name": "ROLE_TEST", "defaultRole": null, "dataType": 1, "description": "测试权限按钮显示", "permissions": null, "departments": null }] })
    })
}
// 分页获取角色数据
export const getRoleList = (params) => {
    return getRequest('/role/getAllByPage', params)
}
// 添加角色
export const addRole = (params) => {
    return postRequest('/role/save', params)
}
// 编辑角色
export const editRole = (params) => {
    return postRequest('/role/edit', params)
}
// 设为或取消注册角色
export const setDefaultRole = (params) => {
    return postRequest('/role/setDefault', params)
}
// 分配角色权限
export const editRolePerm = (params) => {
    return postRequest('/role/editRolePerm', params)
}
// 分配角色数据权限
export const editRoleDep = (params) => {
    return postRequest('/role/editRoleDep', params)
}
// 删除角色
export const deleteRole = (params) => {
    return postRequest('/role/delByIds', params)
}



// 获取全部权限数据
export const getAllPermissionList = (params) => {
    return getRequest('/permission/getAllList', params)
}
// 添加权限
export const addPermission = (params) => {
    return postRequest('/permission/add', params)
}
// 编辑权限
export const editPermission = (params) => {
    return postRequest('/permission/edit', params)
}
// 删除权限
export const deletePermission = (params) => {
    return postRequest('/permission/delByIds', params)
}
// 搜索权限
export const searchPermission = (params) => {
    return getRequest('/permission/search', params)
}



// 获取全部字典
export const getAllDictList = (params) => {
    return getRequest('/dict/getAll', params)
}
// 添加字典
export const addDict = (params) => {
    return postRequest('/dict/add', params)
}
// 编辑字典
export const editDict = (params) => {
    return postRequest('/dict/edit', params)
}
// 删除字典
export const deleteDict = (params) => {
    return postRequest('/dict/delByIds', params)
}
// 搜索字典
export const searchDict = (params) => {
    return getRequest('/dict/search', params)
}
// 获取全部字典数据
export const getAllDictDataList = (params) => {
    return getRequest('/dictData/getByCondition', params)
}
// 添加字典数据
export const addDictData = (params) => {
    return postRequest('/dictData/add', params)
}
// 编辑字典数据
export const editDictData = (params) => {
    return postRequest('/dictData/edit', params)
}
// 删除字典数据
export const deleteData = (params) => {
    return postRequest('/dictData/delByIds', params)
}
// 通过类型获取字典数据
export const getDictDataByType = (type, params) => {
    return new Promise((resolve, reject) => {
        resolve({ "success": true, "message": "success", "code": 200, "timestamp": 1592018024310, "result": [{ "id": "75158227712479232", "createBy": "admin", "createTime": "2018-11-14 23:44:19", "updateBy": "admin", "updateTime": "2019-04-01 23:53:13", "delFlag": 0, "title": "男", "value": "男", "sortOrder": 0.00, "status": 0, "description": "", "dictId": "75135930788220928" }, { "id": "75159254272577536", "createBy": "admin", "createTime": "2018-11-14 23:48:24", "updateBy": "admin", "updateTime": "2019-04-01 23:53:17", "delFlag": 0, "title": "女", "value": "女", "sortOrder": 1.00, "status": 0, "description": "", "dictId": "75135930788220928" }] })
    })
    // return getRequest(`/dictData/getByType/${type}`, params)
}



// 分页获取日志数据
export const getLogListData = (params) => {
    return getRequest('/log/getAllByPage', params)
}
// 删除日志
export const deleteLog = (params) => {
    return postRequest('/log/delByIds', params)
}
// 清空日志
export const deleteAllLog = (params) => {
    return postRequest('/log/delAll', params)
}


// 分页获取Redis数据
export const getRedisData = (params) => {
    return getRequest('/redis/getAllByPage', params)
}
// 通过key获取Redis信息
export const getRedisByKey = (key, params) => {
    return getRequest(`/redis/getByKey/${key}`, params)
}
// 获取Redis键值数量
export const getRedisKeySize = (params) => {
    return getRequest('/redis/getKeySize', params)
}
// 获取Redis内存
export const getRedisMemory = (params) => {
    return getRequest('/redis/getMemory', params)
}
// 获取Redis信息
export const getRedisInfo = (params) => {
    return getRequest('/redis/info', params)
}
// 添加编辑Redis
export const saveRedis = (params) => {
    return postRequest('/redis/save', params)
}
// 删除Redis
export const deleteRedis = (params) => {
    return postRequest('/redis/delByKeys', params)
}
// 清空Redis
export const deleteAllRedis = (params) => {
    return postRequest('/redis/delAll', params)
}



// 分页获取定时任务数据
export const getQuartzListData = (params) => {
    return getRequest('/quartzJob/getAllByPage', params)
}
// 添加定时任务
export const addQuartz = (params) => {
    return postRequest('/quartzJob/add', params)
}
// 编辑定时任务
export const editQuartz = (params) => {
    return postRequest('/quartzJob/edit', params)
}
// 暂停定时任务
export const pauseQuartz = (params) => {
    return postRequest('/quartzJob/pause', params)
}
// 恢复定时任务
export const resumeQuartz = (params) => {
    return postRequest('/quartzJob/resume', params)
}
// 删除定时任务
export const deleteQuartz = (params) => {
    return postRequest('/quartzJob/delByIds', params)
}



// base64上传
export const base64Upload = (params) => {
    return postRequest('/upload/file', params)
}