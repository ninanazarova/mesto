module.exports = {
  plugins: [
    require("autoprefixer")({
      browsers: "last 10 versions",
    }),
    require("cssnano")({
      // подключили cssnano
      preset: "default", // выбрали настройки по умолчанию
    }),
  ],
};
