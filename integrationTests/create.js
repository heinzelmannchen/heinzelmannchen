var heinzel = require('../heinzel');
heinzel.create('extViews.formView', {
    override: true,
    ensurePathExists: true
}).then(function(files) {
    console.log('done', files);
}).fail(function() {
    console.log(arguments);
});
