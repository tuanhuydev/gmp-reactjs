const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    "storybook-css-modules",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.module.css$/i,
      exclude: [/\.css$/i],
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            module: true,
          },
        },
      ],
      include: path.resolve(__dirname, "../src"),
    });
    console.log(config.module.rules);

    return config;
  },
};
