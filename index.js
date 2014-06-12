var async = require('async')
  , $ = require('jquery')
  , _ = require('underscore')
  , mongoose = require('mongoose')
  , forms = require('forms')
  , fields = forms.fields
  , widgets = forms.widgets
  , mongo = require('./db/mongo-store');

var schemas = {};
var schemaNames = [];
var classes = {};

module.exports = function(app, options) {
  mongo({ dbName: options.dbName || null });

  var models = options.models;
  // create a mongoose schema for each of our user defined models
  _.each(options.models, function(model, modelName){
    // I will eventually want to add some keys to model.fields.
    // Probably will be auto-generating slug and createdAt
    model.formFields = {};

    _.each(model.fields, function(field, f){
      var field = model.fields[f];
      var choices;
      var widget;

      if(field.choices) {
        choices = {};
        _.each(field.choices, function(choice, c){
          choices[choice] = choice;
        });

        widget = widgets.select();
      }

      if(field.widget) {
        widget = widgets[field.widget]();
      }

      model.formFields[f] = fields[field.type.name.toLowerCase()]({
        required: field.required || false,
        choices: choices || null,
        widget: widget || null
      });

      delete model.fields[f].widget;
      delete model.fields[f].choices;
    });

    schemas[modelName] = mongoose.Schema(model.fields);
    schemaNames.push(modelName);
    module.exports[modelName] = classes[modelName] = mongoose.model(modelName, schemas[modelName]);
  });

  
  // loop through each of our models and create routes for them
  async.eachSeries(schemaNames, function(modelName, callback) {
    // we use Caolan's forms module to generate markup for our
    var formFields = forms.create(models[modelName].formFields);

    var $form = $('<form action="/'+modelName+'/new" method="POST"></form>');
    $form.append(formFields.toHTML());
    $form.append('<input type="submit">');

    var markup = $('<div>').append($form).clone().html(); 

    // app.get('/'+modelName, function(req, res) {
    //   res.send(markup);
    // });

    app.get('/'+modelName+'/new', function(req, res) {
      res.send(markup);
    });

    app.post('/'+modelName+'/new', function(req, res) {
      var instance = new classes[modelName](req.body);

      instance.save(function(err){
        console.log(err)
        res.redirect(modelName+'/new');
      });
    });

    app.get('/'+modelName+'/json', function(req, res){
      classes[modelName].find({}, function(err, items){
        res.send(items);
      });
    });

    callback();
  }, function(err) {
    console.log('Crudbud initialized');
  });
}

module.exports.get = function(model, callback) {
  classes[model].find({}, callback);
}