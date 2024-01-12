import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/dbConnection.mjs";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: DataTypes.STRING,
    district: DataTypes.STRING,
    village: DataTypes.STRING,
    panNumber: DataTypes.STRING,
    aadhaarNumber: DataTypes.BIGINT,
  },
  {
    timestamps: true,
  }
);

export default User;
