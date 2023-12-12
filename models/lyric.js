const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Lyric extends Model { }
//Sequelize will create this table if it doesn't exist on startup
Lyric.init({
 id: {
    type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey: true
 },
 paragraph: {
    type: DataTypes.STRING, allowNull: false, required: true
 },
 index: {
   type: DataTypes.INTEGER, allowNull: false
 }},

 {
 sequelize: sequelizeInstance, modelName: 'lyrics', //use lowercase plural format
 timestamps: true, freezeTableName: true
 }
)

module.exports = Lyric;