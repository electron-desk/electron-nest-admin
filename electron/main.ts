/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2023-02-08 16:23:05
 * @LastEditTime: 2023-02-09 20:00:40
 * @LastEditors: 最爱白菜吖
 * @FilePath: \electron-nest-admin\electron\main.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2023 by 武汉跃码教育, All Rights Reserved.
 */
require('v8-compile-cache');
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  nativeImage,
  shell,
  Tray,
} from 'electron';
import * as bytenode from 'bytenode';
import { writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { ChildProcess, fork } from 'child_process';
const isMac = process.platform === 'darwin';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
let mainWindow: BrowserWindow;
let nestServer: ChildProcess;

function createServer() {
  nestServer = fork(resolve(__dirname, '..', 'server/main.js'), [
    '--subprocess',
  ]);
}
const createMenu = () => {
  const template: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      label: '接口文档',
      submenu: [
        {
          label: 'vue3-pinia+vite-antv接口文档',
          click: async () => {
            await mainWindow.webContents.session.clearStorageData();
            await shell.openExternal('http://localhost:3008/api');
          },
        },
      ],
    },
    {
      role: 'help',
      label: '帮助中心',
      submenu: [
        {
          label: '我的主页',
          click: async () => {
            await shell.openExternal('https://space.bilibili.com/388985971');
          },
        },
        { label: '刷新', role: 'reload' },
      ],
    },
  ];

  if (isMac) {
    template.unshift({
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
const createTray = () => {
  const icon = nativeImage.createFromPath(
    resolve(__dirname, '..', '..', 'favicon_256.ico'),
  );
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: () => {
        if (process.platform !== 'darwin') {
          app.quit();
        } else {
          app.exit();
        }
      },
    },
  ]);
  tray.setToolTip('codedesktop\n开放API');
  tray.setTitle('codedesktop');
  tray.on('click', () => {
    mainWindow.show();
  });
  tray.on('right-click', () => {
    tray.setContextMenu(contextMenu);
  });
};
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
function createWindow() {
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
}
app.whenReady().then(() => {
  createTray();
  createMenu();
  createWindow();
  if (app.isPackaged) {
    createServer();
  }
  if (process.env.NODE_ENV === 'building') {
    encryptFile();
  }
});
app.on('before-quit', () => {
  // 关闭所有的web服务
  nestServer.kill();
});