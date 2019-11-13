
const Model = require('sequelize').Model;

module.exports = (seq, DT) => {
  class UserPrefs extends Model {}

  UserPrefs.init({
    // store prefs here
  }, {
    sequelize: seq,
    modelName: 'userprefs'
  });

  return UserPrefs;
};