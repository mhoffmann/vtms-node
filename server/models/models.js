'use strict';
let db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');

let models = {};

models.Sequelize = Sequelize;
models.db = db;

models.Series = require('./Series.js');
models.LanguageSeries = require('./LanguageSeries.js');
models.Lesson = require('./Lesson.js');
models.Language = require('./Language.js');
models.Level = require('./Level.js');
models.Shot = require('./Shot.js');
models.User = require('./User.js');
models.Shift = require('./Shift.js');
models.Activity = require('./Activity.js');
models.Channel = require('./Channel.js');
models.Talent = require('./Talent.js');
models.Task = require('./Task.js');
models.Issue = require('./Issue.js');
models.TaskGlobal = require('./TaskGlobal.js');
models.TeamMember = require('./TeamMember.js');
models.PublishDate = require('./PublishDate.js');
models.Platform = require('./Platform.js');

models.Series.hasMany(models.LanguageSeries, {constraints: false, foreignKey: 'fkSeries'});
models.Series.hasMany(models.TaskGlobal, {constraints: false, foreignKey: 'fkSeries'});

models.LanguageSeries.belongsTo(models.Series, {constraints: false, foreignKey: 'fkSeries'});
models.LanguageSeries.belongsTo(models.Language, {constraints: false, foreignKey: 'fkLanguage'});
models.LanguageSeries.belongsTo(models.Level, {constraints: false, foreignKey: 'fkLevel'});
models.LanguageSeries.belongsTo(models.Talent, {constraints: false, foreignKey: 'fkTalent'});
models.LanguageSeries.belongsTo(models.Channel, {constraints: false, foreignKey: 'fkChannel'});
models.LanguageSeries.hasMany(models.Lesson, {constraints: false, foreignKey: 'fkLanguageSeries'});

models.Lesson.belongsTo(models.LanguageSeries, {constraints: false, foreignKey: 'fkLanguageSeries'});
models.Lesson.hasMany(models.Shot, {constraints: false, foreignKey: 'fkLesson'});
models.Lesson.hasMany(models.Task, {constraints: false, foreignKey: 'fkLesson'});
models.Lesson.hasMany(models.PublishDate, {constraints: false, foreignKey: 'fkLesson'});
models.Lesson.hasMany(models.Issue, {constraints: false, foreignKey: 'fkLesson'});
models.Lesson.belongsTo(models.Task, {
    constraints: false,
    as: 'lastTask',
    constraints: false,
    foreignKey: 'fkLastTask'
});
models.Lesson.belongsTo(models.Issue, {as: 'lastIssue', constraints: false, foreignKey: 'fkLastIssue'});

models.Language.hasMany(models.LanguageSeries, {constraints: false, foreignKey: 'fkLanguage'});

models.Level.hasMany(models.LanguageSeries, {constraints: false, foreignKey: 'fkLevel'});

models.Shot.belongsTo(models.Lesson, {constraints: false, foreignKey: 'fkLesson'});
models.Shot.belongsTo(models.Talent, {constraints: false, foreignKey: 'fkTalent'});

models.User.belongsTo(models.TeamMember, {constraints: false, foreignKey: 'fkTeamMember'});

models.Shift.hasMany(models.Activity, {constraints: false, foreignKey: 'fkShift'});
models.Shift.belongsTo(models.TeamMember, {constraints: false, foreignKey: 'fkTeamMember'});

models.Activity.belongsTo(models.Shift, {constraints: false, foreignKey: 'fkShift'});
models.Activity.belongsTo(models.Task, {constraints: false, foreignKey: 'fkTask'});
models.Activity.belongsTo(models.TeamMember, {constraints: false, foreignKey: 'fkTeamMember'});
models.Activity.hasMany(models.Issue, {constraints: false, foreignKey: 'fkActivity'});
// Activity Foreign Keys may need to be modeled differently

models.Channel.hasMany(models.LanguageSeries, {constraints: false, foreignKey: 'fkChannel'});

models.Talent.hasMany(models.Shot, {constraints: false, foreignKey: 'fkTalent'});

models.Task.belongsTo(models.TaskGlobal, {constraints: false, foreignKey: 'fkTaskGlobal'});
models.Task.belongsTo(models.Lesson, {constraints: false, foreignKey: 'fkLesson'});
models.Task.belongsTo(models.TeamMember, {constraints: false, foreignKey: 'fkTeamMember'});
models.Task.hasMany(models.Activity, {constraints: false, foreignKey: 'fkTask'});
models.Task.hasMany(models.Issue, {constraints: false, foreignKey: 'fkTask'});

models.Issue.belongsTo(models.Task, {constraints: false, foreignKey: 'fkTask'});
models.Issue.belongsTo(models.Lesson, {constraints: false, foreignKey: 'fkLesson'});
models.Issue.belongsTo(models.Activity, {constraints: false, foreignKey: 'fkActivity'});

models.TaskGlobal.hasMany(models.Task, {constraints: false, foreignKey: 'fkTaskGlobal'});
models.TaskGlobal.belongsTo(models.Series, {constraints: false, foreignKey: 'fkSeries'});

//models.TeamMember.hasMany(models.User, { constraints: false, foreignKey: 'fkTeamMember' } );
models.TeamMember.hasMany(models.Shift, {constraints: false, foreignKey: 'fkTeamMember'});
models.TeamMember.hasMany(models.Task, {constraints: false, foreignKey: 'fkTeamMember'});
models.TeamMember.hasMany(models.Activity, {constraints: false, foreignKey: 'fkTeamMember'});

models.PublishDate.belongsTo(models.Lesson, {constraints: false, foreignKey: 'fkLesson'});
models.PublishDate.belongsTo(models.Platform, {constraints: false, foreignKey: 'fkPlatform'});

models.Platform.hasMany(models.PublishDate, {constraints: false, foreignKey: 'fkPlatform'});

module.exports = models;
