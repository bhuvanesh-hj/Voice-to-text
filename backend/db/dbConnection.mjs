import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

// Test the connection to the database.
sequelize
  .authenticate()
  .then(() => console.log("Connection established successfully."))
  .catch((error) => console.error("Connection failed:", error));

export default sequelize;
