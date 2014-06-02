![logo](https://raw.githubusercontent.com/heinzelmannchen/heinzelmannchen/master/Heinzelmannchen.png)
<a href="http://promises-aplus.github.com/promises-spec">
    <img src="http://promises-aplus.github.com/promises-spec/assets/logo-small.png"
         align="right" valign="top" alt="Promises/A+ logo" />
</a>

Heinzelmannchen is a little helper for your daily work. It is used to create code from your templates.
This module acts as a facade for the underlying heinzelmannchen functionality, exposing an easy to use promise based API.
If you like to use Heinzelmannchen in your workflow checkout [heinzelmannchen-cli](https://github.com/heinzelmannchen/heinzelmannchen-cli).

[![Build Status](https://travis-ci.org/heinzelmannchen/heinzelmannchen.png?branch=master)](https://travis-ci.org/heinzelmannchen/heinzelmannchen)

Usage as a node module
----------------------
```javascript
var heinzel = require('heinzelmannchen');

//1. check local installed templates
heinzel.listTemplates()
  .then(function(templates) {
    console.log(templates);
  });

//2. explore installable templates, it searches in npm, automatically adding the corresponding prefix 'heinzelmannchen-tpl-'
heinzel.searchTemplates('templateName')
    .then(onSearched)
    .fail(onFail);

//if your template doesn't use standard heinzelmannchen prefixes, use:
heinzel.search('templateName')
    .then(onSearched)
    .fail(onFail);

//3. install desired template
heinzel.install('heinzelmannchen-tpl-templateName')
    .then(onInstalled)
    .fail(onFail);

//4. check local installed generators
heinzel.listGenerators()
    .then(onLoadedGenerators)
    .fail(onFail);

//5. explore installable generators. As you can guess, it also searches in npm with following prefix: 'heinzelmannchen-gen-'
heinzel.searchGenerator('generatorName')
    .then(onSearched)
    .fail(onFail);

//6. install your generator
heinzel.install('heinzelmannchen-gen-generatorName')
    .then(onInstalled)
    .fail(onFail);
```

After installing you need to link the templates to their corresponding generators, here's an example (See [Wiki](https://github.com/heinzelmannchen/BA-Stuff/wiki/Konfiguration---Heinzel) for explanations):
```
{
    "domains": {
        "extViews": {
            "formView": {
                "template": "heinzelmannchen-template/examples/tableTemplate.tpl",
                "generator": {
                    "name": "heinzelmannchen-gen-pg",
                    "config": {
                        "database": "heinzel"
                    }
                }
            },
            "output": "./foo/bar/<%= table_name %>.md"
        }
    },
    "generators": {
        "heinzelmannchen-gen-pg": {
            "npm": "heinzelmannchen-gen-pg",
            "config": {
                "charset": "utf8",
                "host": "127.0.0.1",
                "password": "password",
                "user": "user"
            }
        }
    },
    "templates": {
        "formView": "http://yourrepo.com/formView.git#1.0.1",
        "foobar": "http://yourrepo.com/formView.git#1.0.1"
    }
}
```

now you can generate

```javascript
//7. run your generators, as defined in your config
var heinzel = require('heinzelmannchen');

heinzel.create('extViews.formView', {
    override: true,
    ensurePathExists: true
}).then(function(files) {
    console.log('done', files);
}).fail(function() {
    console.log(arguments);
});

```
