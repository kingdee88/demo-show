/**
 * @author KdZhao/dongwenzhao@lngtop.com
 * @date 2019-04-04 09:21:40
 * @Description: 发布脚本
 */

const fs = require('fs');
const path = require('path');

// const envfile = process.env.NODE_ENV === 'production' ? '../.env.prod' : '../.env.sit';

// env环境变量的路径
const envPath = 'production';
// env对象
const envObj = 'production';
// const SERVER_ID = parseInt(envObj['VUE_APP_SERVER_ID']);
const SERVER_ID = 0;

function parse (src) {
    // 解析KEY=VAL的文件
    const res = {};
    src.split('\n').forEach(line => {
        // matching "KEY' and 'VAL' in 'KEY=VAL'
        // eslint-disable-next-line no-useless-escape
        const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
        // matched?
        if (keyValueArr != null) {
            const key = keyValueArr[1];
            let value = keyValueArr[2] || '';

            // expand newlines in quoted values
            const len = value ? value.length : 0;
            if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
                value = value.replace(/\\n/gm, '\n');
            }

            // remove any surrounding quotes and extra spaces
            value = value.replace(/(^['"]|['"]$)/g, '').trim();

            res[key] = value;
        }
    });
    return res;
}

/*
 *定义多个服务器账号 及 根据 SERVER_ID 导出当前环境服务器账号
 */
const SERVER_LIST = [
    {
        id: 0,
        name: '测试环境',
        domain: '', // 域名
        host: '111.229.101.152', // ip
        port: 22, // 端口
        username: 'root', // 登录服务器的账号
        password: '2}-/3;{Cf4uasFmS', // 登录服务器的账号
        path: '/usr/share/nginx/html/demo-show'// 发布至静态服务器的项目路径

    }
];

module.exports = SERVER_LIST[SERVER_ID];
