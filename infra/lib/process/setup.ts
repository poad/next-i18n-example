import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export const nextJsExport = () => {
  [`${process.cwd()}/../app/.next`, `${process.cwd()}/../app/out`].forEach(
    (dir) => {
      if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, {
          recursive: true,
        });
      }
    },
  );

  ['pnpm -r build'].forEach((cmd) => {
    childProcess.execSync(cmd, {
      cwd: `${process.cwd()}/../app`,
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env },
      shell: 'bash',
    });
  });
  fs.copyFileSync(
    `${process.cwd()}/../app/public/favicon.ico`,
    `${process.cwd()}/../app/out/favicon.ico`,
  );

  ['function'].forEach((f) => {
    fs.readdirSync(`${process.cwd()}/${f}`, {
      withFileTypes: true,
    })
      .filter(
        (p) =>
          p.isFile() && (p.name.endsWith('.js') || p.name.endsWith('.d.ts')),
      )
      .map((p) => `${process.cwd()}/${f}/${p.name}`)
      .forEach((file) => {
        if (fs.existsSync(file)) {
          fs.rmSync(file, {
            recursive: true,
          });
        }
      });
    ['pnpm -r install'].forEach((cmd) => {
      childProcess.execSync(cmd, {
        cwd: `${process.cwd()}/${f}/`,
        stdio: ['ignore', 'inherit', 'inherit'],
        env: { ...process.env },
        shell: process.env.SHELL || 'bash',
      });
    });
  });

  ['function'].forEach((f) => {
    childProcess.execSync('pnpm build', {
      cwd: path.resolve(`${process.cwd()}/${f}/`),
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env },
      shell: process.env.SHELL || 'bash',
    });
  });
};
