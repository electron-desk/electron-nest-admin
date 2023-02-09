/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2023-02-08 16:23:05
 * @LastEditTime: 2023-02-08 18:28:14
 * @LastEditors: 最爱白菜吖
 * @FilePath: \electron-nest-vue\electron\main.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2023 by 武汉跃码教育, All Rights Reserved.
 */
require('v8-compile-cache');
import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import * as bytenode from 'bytenode';
import { writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { ChildProcess, fork } from 'child_process';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
let mainWindow: BrowserWindow;
let nestServer: ChildProcess;

function createServer() {
  nestServer = fork(resolve(__dirname, '..', 'server/main.js'), [
    '--subprocess',
  ]);
}
function encryptFile() {
  // 加密electron入口文件
  bytenode.compileFile({
    filename: __dirname + '/main.cjs',
    output: __dirname + '/main.jsc',
  });
  const tpl = `require('bytenode');
require(__dirname + '/main.jsc');`;
  writeFileSync(__dirname + '/main.cjs', tpl);

  // 加密 nest server文件
  const nestServer = resolve(__dirname, '..', 'server');
  bytenode.compileFile({
    filename: nestServer + '/main.js',
    output: nestServer + '/main.jsc',
  });
  writeFileSync(nestServer + '/main.js', tpl);

  // 告诉编译插件加密完成，插件收到消息开始打包
  process.send!('加密完成');
}
app.whenReady().then(() => {
  let config: BrowserWindowConstructorOptions = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
    backgroundColor: '#F5F5F5',
    show: process.env.NODE_ENV !== 'building',
    icon: join(__dirname, 'favicon_256.ico'),
  };
  mainWindow = new BrowserWindow(config);
  if (process.argv[2]) {
    mainWindow.webContents.openDevTools({ mode: 'undocked' });
    mainWindow.loadURL(process.argv[2]);
  } else {
    mainWindow.loadURL(`file://${join(__dirname, '..', 'view', 'index.html')}`);
  }
  if (app.isPackaged) {
    createServer();
  }
  if (process.env.NODE_ENV === 'building') {
    encryptFile();
  }
});
