import { config } from "../config/db.config";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: "mysql",
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully!"))
  .catch((err) => console.log("Unable to connect to the database: ", err));

const db: any = {};
db.sequelize = sequelize;

db.user = require("./users.model")(sequelize, DataTypes);
db.project = require("./projects.model")(sequelize, DataTypes);
db.type = require("./types.model")(sequelize, DataTypes);

db.type.hasMany(db.project, { foreignKey: "typeId" });
db.project.belongsTo(db.type, { foreignKey: "typeId" });

export = db;
