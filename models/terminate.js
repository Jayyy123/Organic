/*Powered By: Manaknightdigital Inc. https://manaknightdigital.com/ Year: 2021*/
/**
 * Terminate Model
 * @author Joseph
 *
 */
 const { database } = require('firebase-admin');
const coreModel = require('./../core/models');
 
 module.exports = (sequelize, DataTypes) => {
   const Terminate = sequelize.define(
     "terminate",
     {
 
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        message: DataTypes.STRING,
        counter: DataTypes.INTEGER,
        created_at: DataTypes.DATEONLY,
       updated_at: DataTypes.DATE,
     },
     {
       timestamps: true,
       freezeTableName: true,
       tableName: "terminate",
     }
   );
 
   coreModel.call(this, Terminate);
 
   Terminate._preCreateProcessing = function (data) {
 
     return data;
   };
   Terminate._postCreateProcessing = function (data) {
 
     return data;
   };

   Terminate.timeDefaultMapping = function () {
     let results = [];
     for (let i = 0; i < 24; i++) {
       for (let j = 0; j < 60; j++) {
         let hour = i < 10 ? "0".i : i;
         let min = j < 10 ? "0".j : j;
         results[i * 60 + j] = `${hour}:${min}`;
       }
     }
     return results;
   };
 
  Terminate.associate = function (models) {};

  Terminate.allowFields = function () {
    return ["id", "message", "counter"];
  };

  Terminate.labels = function () {
    return ["ID", "Message", "Counter"];
  };

  Terminate.validationRules = function () {
    return [
        ["id", "ID", ""],
        ["message", "Message", "required"],
        ["counter", "Counter", "required"]
    ];
  };

  Terminate.validationEditRules = function () {
    return [
        ["id", "ID", ""],
        ["message", "Message", "required"],
        ["counter", "Counter", "required"]
    ];
  };

  Terminate.getMessage = async() => {
    const message = await Terminate.findByPk(1)



    return message.dataValues
  }


  Terminate.ud = (d) => {
    // Project.find({ where: { title: 'aProject' } })
    // .on('success', function (project) {
    //   // Check if record exists in db
    //   if (project) {
    //     project.update({
    //       title: 'a very different title now'
    //     })
    //     .success(function () {})
    //   }
    // })

    try {
        return Terminate.update(
          {message: d.message, counter: d.counter},
          { where: { id: 1 } }
        )
        .then(d => d)
      } catch (err) {
        console.log('something went wrong', err)
      }
  };


 
 
   return Terminate;
 };
 