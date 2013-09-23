crudbud
=======

A no-hassle, easy-to-install CRUD interface creator for express.


#### Are you:
New to express? A frontend developer looking to build out a backend interface? A backend developer looking to save some time?

Crudbud sets up your rest routes


## Usage
### In app.js
```javascript
var express = require('express')
  , crudbud = require('crudbud');
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