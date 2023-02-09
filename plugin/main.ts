/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2023-02-08 12:54:50
 * @LastEditTime: 2023-02-08 18:00:19
 * @LastEditors: 最爱白菜吖
 * @FilePath: \electron-nest-vue\plugin\main.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2023 by 武汉跃码教育, All Rights Reserved.
 */
import { Plugin, ViteDevServer, build, ResolvedConfig } from 'vite';
import { AddressInfo } from 'net';
import electron from 'electron';
import { spawn } from 'child_process';
import { resolve, join } from 'path';
import { builtinModules } from 'module';
import fs from 'fs';
async function buildElectron() {
  await build({
    root: resolve(__dirname, '..', 'dist'), // 指向主进程目录
    build: {
      outDir: resolve(__dirname, '..', 'dist', 'electron'),
      lib: {
        entry: [
          resolve(__dirname, '..', 'electron', 'main.ts'),
          resolve(__dirname, '..', 'electron', 'preload.ts'),
        ], // Electron 目前只支持 CommonJs 格式
        formats: ['cjs'],
        fileName: () => '[name].cjs',
      },
      rollupOptions: {
        external: [
          // 告诉 Rollup 不要打包内建 API
          'electron',
          ...builtinModules,
        ],
      },
    },
  });
  fs.copyFileSync(
    join(__dirname, '..', 'favicon_256.ico'),
    join(__dirname, '..', 'dist', 'electron', 'favicon_256.ico'),
  );
}
export default (): Plugin => {
  let _config: ResolvedConfig;
  return {
    name: 'vite-plugin-electron',
    configResolved(resolvedConfig: ResolvedConfig) {
      _config = resolvedConfig;
    },
    async configureServer(server: ViteDevServer) {
      await buildElectron();
      const nestProcess = spawn('nest start --watch', {
        stdio: 'inherit',
        shell: true,
      });
      server.httpServer.once('listening', () => {
        const addressInfo = server.httpServer.address() as AddressInfo;
        const address = `http://localhost:${addressInfo.port}`;
        const electronProcess = spawn(
          electron.toString(),
          ['./dist/electron/main.cjs', address],
          {
            cwd: process.cwd(),
            stdio: 'inherit',
          },
        );
        electronProcess.on('close', () => {
          electronProcess.kill();
          nestProcess.kill();
          server.close();
          process.exit();
        });
      });
    },
    async writeBundle() {
      const buildServerProcess = spawn('nest build', {
        stdio: 'inherit',
        shell: true,
      });
      const res = await new Promise<boolean>((r, e) => {
        buildServerProcess.on('close', () => {
          r(true);
        });
        buildServerProcess.on('error', (err: Error) => {
          console.log(err);
          r(false);
        });
      });
      if (!res) {
        process.exit();
      }
      await buildElectron();
      const electronProcess = spawn(
        electron.toString(),
        ['./dist/electron/main.cjs'],
        {
          cwd: process.cwd(),
          stdio: ['ipc'],
          env: {
            NODE_ENV: 'building',
            ..._config.env,
          },
        },
      );
      electronProcess.on('message', (msg) => {
        electronProcess.kill();
        spawn('electron-builder', {
          stdio: 'inherit',
          shell: true,
        });
      });
    },
  };
};
