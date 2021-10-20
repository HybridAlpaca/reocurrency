import path from 'path';

const commonConfig = {
    mode: 'development',
    output: {
        filename: '[name].cjs',
        chunkFilename: '[chunkhash].js',
        path: path.resolve('static/scripts/'),
    },
    watchOptions: {
        ignored: ['**/node_modules', 'server/'],
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: ['ts-loader?transpileOnly=true'], // transpile only for performance
        }],
    },
};

/* Utility function for specializing `commonConfig` */
const createConfig = (opts) => ({ ...commonConfig, ...opts });

export default [
    createConfig({
        // browser/client script config
        name: 'client',
        entry: {
            client: './src/client.ts',
        },
    }),
    createConfig({
        // electron renderer config
        target: 'electron-renderer',
        name: 'renderer',
        entry: {
            renderer: './src/renderer.ts',
        },
    }),
    createConfig({
        // electron main config
        target: 'electron-main',
        name: 'app',
        entry: {
            app: './src/app.ts',
        },
    }),
];
