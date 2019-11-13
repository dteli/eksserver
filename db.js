const Seq = require('sequelize');

const seq = new Seq('eksward', 'winfield', '', {
  host: 'localhost',
  dialect: 'postgres'
});

seq.authenticate().then(
  () => console.log('connected to postgres'),
  () => console.log('error connecting to postgres'));


let User = seq.import('./models/user');
let UserPrefs = seq.import('./models/userprefs');
let XW = seq.import('./models/xw');

User.hasOne(UserPrefs);
UserPrefs.belongsTo(User);

User.hasMany(XW);
XW.belongsTo(User);



module.exports = seq;