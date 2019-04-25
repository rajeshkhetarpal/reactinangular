var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");

module.exports = {
  context: __dirname, //path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    bundle: [
      "./main.js",
      "./src/angular/reactDirective.js",
      "./src/cra-app/craDirective.js"
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].min.js"
  },
  plugins: debug
    ? []
    : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
      ]
};
