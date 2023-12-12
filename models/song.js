const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Song extends Model { }
//Sequelize will create this table if it doesn't exist on startup
Song.init({
 id: {
    type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey: true
 },
 title: {
    type: DataTypes.STRING, allowNull: false, required: true
 }},

 {
 sequelize: sequelizeInstance, modelName: 'songs', //use lowercase plural format
 timestamps: true, freezeTableName: true
 }
)

module.exports = Song;