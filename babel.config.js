const presets = [
  [
    "@babel/env",
    {
      useBuiltIns: "usage",
      corejs: "3.4.1",
    },
  ],
];

const plugins = [
  [
    "@babel/plugin-proposal-class-properties",
    {
      loose: true,
    },
  ],
];

module.exports = { presets, plugins };
