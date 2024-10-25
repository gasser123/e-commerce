const DataSource = require("typeorm").DataSource;
const dotenv = require("dotenv");
const path = require("node:path");
dotenv.config({
  path:
    process.env.NODE_ENV === "development"
      ? "./.env.development.local"
      : process.env.NODE_ENV === "test"
        ? "./.env.test.local"
        : path.resolve(process.cwd(), ".env"),
});
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;
const dbConfig = {
  synchronize: false,
  type: "postgres",
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  entities: ["**/*.entity.js"],
  migrations: ["migrations/*.js"],
};

const AppDataSource = new DataSource(dbConfig);
module.exports = AppDataSource;
