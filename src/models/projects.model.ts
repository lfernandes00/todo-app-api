import { Sequelize, DataTypes } from "sequelize";

export = (sequelize: Sequelize) => {
  const Project = sequelize.define(
    "project",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: { msg: "UserId can't be empty!" } },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Name can't be emtpy!" } },
      },
      isFavourite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: { notNull: { msg: "isFavourite can't be emtpy!" } },
      },
    },
    {
      timestamps: false,
    }
  );
  return Project;
};
