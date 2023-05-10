import { Sequelize, DataTypes } from "sequelize";

export = (sequelize: Sequelize) => {
  const Task = sequelize.define(
    "task",
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: { msg: "ProjectId can't be empty!" } },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: { msg: "TypeId can't be empty!" } },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Description can't be emtpy!" } },
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: { msg: "Status can't be empty!" } },
      },
      milestone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Milestone can't be empty!" } },
      },
    },
    {
      timestamps: false,
    }
  );
  return Task;
};
