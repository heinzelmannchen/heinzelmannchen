var heinzel = require('../heinzel');
heinzel.create('extViews.formView', {
    override: true
}).then(function() {
    console.log('done');
}).fail(function() {
    console.log(arguments);
});
