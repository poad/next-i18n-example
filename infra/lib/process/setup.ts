import * as childProcess from 'child_process';
import * as fs from 'fs';

export const nextJsExport = () => {
    [`${process.cwd()}/../app/.next`, `${process.cwd()}/../app/out`].forEach(dir => {
        if (fs.existsSync(dir)) {
            fs.rmdirSync(dir, {
                recursive: true,
            });
        }
    });

    ['yarn release',].forEach((cmd => {
        childProcess.execSync(cmd, {
            cwd: `${process.cwd()}/../app`,
            stdio: ['ignore', 'inherit', 'inherit'],
            env: { ...process.env },
            shell: 'bash'
        });
    }));
    fs.copyFileSync(`${process.cwd()}/../app/public/favicon.ico`, `${process.cwd()}/../app/out/favicon.ico`);
};
