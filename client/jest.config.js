const { defaults } = require("jest-config");
module.exports = {
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy"
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"]
  // ...
};
