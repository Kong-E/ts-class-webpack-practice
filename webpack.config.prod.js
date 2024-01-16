const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production", // 코드 최적화, 최소화 등을 지시할 수 있습니다.
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js", // bundle.{contenthash}.js를 넣어 웹팩이 자동으로 빌드마다 고유한 해시를 생성하도록 하여 브라우저 캐시를 효율적으로 관리할 수 있습니다.
    path: path.resolve(__dirname, "dist"), // path.resolve()를 사용하여 상대 경로를 절대 경로로 변환합니다.
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // .ts 확장자로 끝나는 모든 파일이면 아래 로더를 사용합니다.
        use: "ts-loader", // ts-loader가 처리하도록 합니다.
        exclude: /node_modules/, // node_modules 폴더는 제외합니다.
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // .ts와 .js 파일을 처리합니다.
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(), // 빌드(build) 이전 결과물을 제거합니다.
  ],
};
