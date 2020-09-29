const config = require("config");
module.exports = {
  mongoURI: config.get("mongoURI"),
};
