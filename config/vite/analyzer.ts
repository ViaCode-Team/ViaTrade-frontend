import type { AnalyzerPluginOptions } from 'vite-bundle-analyzer';

export const analyzerConfig: AnalyzerPluginOptions = {
	openAnalyzer: false,
	exclude: [
		/\.(?:woff|woff2|ttf|eot)$/i,
	],
};
