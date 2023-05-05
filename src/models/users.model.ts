import { DataTypes, Sequelize } from "sequelize";

export = (sequelize: Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Email can't be empty!" } },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Name can't be empty!" } },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Password can't be empty!" } },
      },
    },
    { timestamps: false }
  );
  return User;
};
