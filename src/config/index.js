//in charge of reading of env
//two types of env, one is optinals, one is required (if connect to database, it requires connection string,for local dev use localhost:27017)

require("dotenv").config();

const optionalConfigs = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "dev",
};

const requiredConfigs = {
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
};

//requiredConfigs error handler: if some of the requiredConfigs have no values

for (const key in requiredConfigs) {
  //== null means if it's null or undefined
  if (requiredConfigs[key] == null) {
    throw new Error(`Missing value for enviroment varialbe ${key}`);
  }
}

module.exports = {
  ...optionalConfigs,
  ...requiredConfigs,
};
