const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Album extends Model { }
//Sequelize will create this table if it doesn't exist on startup
Album.init({
 id: {
    type: DataTypes.INTEGER, allowNull: false, autoIncrement:true, primaryKey: true
 },
 title: {
    type: DataTypes.STRING, allowNull: false, required: true
 },
 releaseDate: {
 type: DataTypes.DATE, allowNull: false, required: true
 },
 artist: {
 type: DataTypes.STRING, allowNull: false, required: true
 }},

 {
 sequelize: sequelizeInstance, modelName: 'albums', //use lowercase plural format
 timestamps: true, freezeTableName: true
 }
)

module.exports = Album;