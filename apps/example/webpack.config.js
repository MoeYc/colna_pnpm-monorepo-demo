const path = require("path");
const webpack = require("webpack");
const { MFSU, esbuildLoader } = require("@umijs/mfsu");
const esbuild = require("esbuild");

// [mfsu] 1. init instance
const mfsu = new MFSU({
  implementor: webpack,
  buildDepWithESBuild: true,
  depBuildConfig: {
    loader: {
      '.scss': 'file',
    },
  }
});

const cssLoader = {
  loader: "css-loader",
  options: {
    modules: true,
  }
}

const config = {
  entry: path.join(__dirname, "./src"),
  mode: "development",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    // [mfsu] 2. add mfsu middleware
    setupMiddlewares(middlewares, devServer) {
      middlewares.unshift(...mfsu.getMiddlewares());
      return middlewares;
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: esbuildLoader,
          options: {
            handler: [
              // [mfsu] 3. add mfsu esbuild loader handlers
              ...mfsu.getEsbuildLoaderHandler(),
            ],
            target: "esnext",
            implementation: esbuild,
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          cssLoader,
          "postcss-loader",
        ]
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          cssLoader,
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // modifyVars: theme, // 自定义主题的
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          cssLoader,
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new (require("html-webpack-plugin"))({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
  stats: {
    assets: false,
    moduleAssets: false,
    runtime: false,
    runtimeModules: false,
    modules: false,
    entrypoints: false,
  },
};

// [mfsu] 4. inject mfsu webpack config
const getConfig = async () => {
  await mfsu.setWebpackConfig({ config, depConfig: {} });
  return config;
};

module.exports = getConfig();
