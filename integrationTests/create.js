var heinzel = require('../heinzel');
heinzel.create('extViews.formView', {
    override: true
}).then(function(files) {
    console.log('done', files);
}).fail(function() {
    console.log(arguments);
});
