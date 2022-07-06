import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export const nextJsExport = () => {
    const nextJsAppRoot = `${process.cwd()}/../app`;
    [`${nextJsAppRoot}/.next`, `${nextJsAppRoot}/out`].forEach(dir => {
        if (fs.existsSync(dir)) {
            fs.rmdirSync(dir, {
                recursive: true,
            });
        }
    });

    ['yarn build', 'yarn export',].forEach((cmd => {
        childProcess.execSync(cmd, {
            cwd: `${nextJsAppRoot}`,
            stdio: ['ignore', 'inherit', 'inherit'],
            env: { ...process.env },
            shell: 'bash'
        });
    }));
    fs.readdirSync(`${nextJsAppRoot}/src/public`)
        .map(file => path.basename(file))
        .filter(file => file !== '.DS_Store')
        .forEach(file => fs.copyFileSync(`${nextJsAppRoot}/src/public/${file}`, `${nextJsAppRoot}/out/${file}`));
};
