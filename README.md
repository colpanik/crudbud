crudbud
=======

A no-hassle, easy-to-install CRUD interface creator for express js.  


#### Are you:
New to express? A frontend developer looking to build out a backend interface? Used to rails doing everything for you?

Crudbud automatically sets up a database connection, defines CRUD routes and generates html forms based on a few simple options.

## Usage
### In app.js
```javascript
var express = require('express')
  , crudbud = require('crudbud')
  , app = express();

app.condfigure(function() {
  // blah blah blah
})

crudbud(app, {
  models: {
    blogPost: {
      fields: {
        title: { type: String }
        body: { type: String, widget: 'textarea' },
      }
    }
  }
});

```

### Retrieving objects from the database
#### crudbud.get(modelName, callback);

```javascript

// In an express route

app.get('/blog', function(req, res){
  // gets all blogposts saved with crudbud and passes them to the "blog" template
  crudbud.get('blogPost', function(err, posts){
    res.render('blog', { posts: posts })
  });
});
```

## Form Field Widget Types

* Text
* Checkbox
* Select
* Radio Group
* Date


```javascript
crudbud(app, {
  dbName: 'myApp',
  models: {
    person: {
      fields: {
        name: { type: String },
        age: { type: Number },
        sex: { type: String, choices: ['male','female'], widget: 'multipleRadio' },
        eyeColor: { type: String, choices: ['blue','brown','green','hazel'] },
        isMarried: { type: Boolean }
      }
    }
  }
});
```

## To Do:

* Provide basic templates for index show pages (preferably using nunjucks)
* Easy overriding of crudbud templates at project level
* Apply bootstrap styles to auto generated forms (this should be a toggleable option)
* Demonstrate usage with multiple examples
