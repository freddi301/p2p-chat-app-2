// const webpack = require("webpack");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isProd = false;

module.exports = {
  mode: isProd ? "production" : "development",
  devtool: isProd ? "source-map" : "inline-source-map",
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      path: false,
      crypto: false,
      // buffer: require.resolve("buffer/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["macros", !isProd ? require("react-refresh/babel") : false].filter(Boolean),
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: "55",
                  },
                },
              ],
              "@babel/react",
              "@babel/typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg/,
        type: "asset/inline",
      },
    ],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   Buffer: ["buffer", "Buffer"],
    // }),
    // new webpack.EnvironmentPlugin({
    //   PORT: null,
    // }),
    !isProd ? new ReactRefreshWebpackPlugin() : false,
  ].filter(Boolean),
  devServer: {
    client: {
      overlay: { errors: true, warnings: false },
    },
    hot: true,
    // port: Number(process.env.PORT),
    // proxy: {
    //   [LOCAL_RPC_WEBSOCKET_PATH]: {
    //     target: `http://localhost:${LOCAL_RPC_WEBSOCKET_PORT}`,
    //     ws: true,
    //     changeOrigin: true,
    //   },
    // },
  },
};
