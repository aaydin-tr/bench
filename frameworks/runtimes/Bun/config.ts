import type { Env, RuntimeConfig } from '@typings/runtime';
import { $ } from 'bun';
import { dbPath } from '@db';

const env: Env = {
    NODE_ENV: 'production',
    DB_PATH: dbPath,

    BUN_JSC_jitPolicyScale: '0.0',
    BUN_JSC_thresholdForOptimizeSoon: '0.0',
    BUN_JSC_thresholdForJITSoon: '0.0',
};

const config: RuntimeConfig = {
    run: (path, cwd) => Bun.spawn(['bun', 'run', path], { env, cwd, stdout: 'inherit' }),

    async build(cwd) {
        console.log('Installing dependencies...');
        await $`cd ${cwd} && bun update`;
    },

    version: Bun.version
};

export default config;
