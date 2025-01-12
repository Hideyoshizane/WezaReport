// next.config.js
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default {
	webpack(config, { isServer }) {
		if (!isServer) {
			// Add the BundleAnalyzerPlugin only for client-side builds
			config.plugins.push(new BundleAnalyzerPlugin());
		}

		return config;
	},
};
