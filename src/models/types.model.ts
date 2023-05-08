import { DataTypes, Sequelize } from "sequelize";

export = (sequelize: Sequelize) => {
  const Type = sequelize.define(
    "type",
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "description can't be empty!" } },
      },
    },
    {
      timestamps: false,
    }
  );
  return Type;
};
