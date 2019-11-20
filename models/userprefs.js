
const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class UserPrefs extends Model {}

  UserPrefs.init({
    // store prefs here
    firstName: {
      type: DT.STRING
    },
    lastName: {
      type: DT.STRING
    }
  }, {
    sequelize: seq,
    modelName: 'userprefs'
  });

  return UserPrefs;
};