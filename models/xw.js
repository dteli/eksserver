
const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class XW extends Model {}

  XW.init({
    // stats
    title: {
      type: DT.STRING,
      //allowNull: false
    },
    author: { type: DT.STRING },
    //date: { type: DT.DATE },
    copyright: { type: DT.STRING },

    //stats: { type: DT.JSON },

    numSquares: { type: DT.INTEGER },
    dims: { type: DT.ARRAY(DT.INTEGER) },
    // width: { type: DT.INTEGER },
    // height: { type: DT.INTEGER },

    clues: { type: DT.JSON },
    // acrossClues: { type: DT.JSON },
    // downClues: { type: DT.JSON },

    // 
    squares: { type: DT.JSON },


    solved: { type: DT.BOOLEAN },
  }, {
    sequelize: seq,
    modelName: 'xw'
  })

  return XW;
};