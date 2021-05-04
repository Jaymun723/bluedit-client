const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const TerserJSPlugin = require("terser-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const CopyPlugin = require("copy-webpack-plugin")

const outPath = path.resolve(__dirname, "dist")

module.exports = (_, config) => {
  const dev = config.mode === "development"

  return {
    entry: "./src/index",
    devtool: "source-map",
    output: {
      filename: "[name].js",
      chunkFilename: "[name].bundle.js",
      path: outPath,
      publicPath: "/",
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: !dev,
      }),
      new CleanWebpackPlugin(),
      // !dev && new BundleAnalyzerPlugin({ analyzerMode: "static" }),
      new Dotenv({
        systemvars: !dev,
      }),
      new CopyPlugin({
        patterns: [{ from: "static", to: outPath }],
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          use: [{ loader: "babel-loader" }],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // hmr: dev,
              },
            },
            {
              loader: "css-loader",
              options: { sourceMap: dev },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // hmr: dev,
              },
            },
            {
              loader: "css-loader",
              options: { sourceMap: dev },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
          use: [{ loader: "file-loader" }],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".json", ".js"],
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 3000,
      historyApiFallback: true,
      // publicPath: "/",
    },
    optimization: {
      minimizer: [!dev && new TerserJSPlugin({}), !dev && new CssMinimizerPlugin()].filter(Boolean),
      runtimeChunk: {
        name: "runtime",
      },
      splitChunks: {
        chunks: "all",
      },
    },
  }
}
