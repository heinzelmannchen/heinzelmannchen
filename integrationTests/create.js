var heinzel = require('../heinzel');
heinzel.create('extViews.formView', {
    override: true,
    ensurePathExists: true,
    filters: {
        tables: ['heinzel', 'occupation']
    }
}).then(function(files) {
    console.log('done', files);
}).fail(function() {
    console.trace();
    console.log(arguments);
});
