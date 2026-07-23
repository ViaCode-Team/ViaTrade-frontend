import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import process from 'node:process';

const require = createRequire(import.meta.url);
const ORVAL_PATH = require.resolve('orval/bin/orval');
const ORVAL_PROJECTS = [
	'authApi',
	'usersApi',
	'signalApi',
	'tradeApi',
	'tradeCodeApi',
	'remindApi',
	'strategyApi',
	'noteApi',
];

function generateProject(project) {
	return new Promise((resolve, reject) => {
		const childProcess = spawn(process.execPath, [ORVAL_PATH, '--project', project], {
			stdio: 'inherit',
		});

		childProcess.once('error', reject);
		childProcess.once('exit', (code) => {
			if (code === 0) {
				resolve();
				return;
			}

			reject(new Error(`Orval generation failed for ${project} with code ${code ?? 'unknown'}.`));
		});
	});
}

async function main() {
	for (const project of ORVAL_PROJECTS) {
		await generateProject(project);
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
