var heinzel = require('../heinzel');
heinzel.create('extViews.formView').then(function() {
    console.log('done');
}).fail(function() {
    console.log(arguments);
});
