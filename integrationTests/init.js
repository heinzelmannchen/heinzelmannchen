var heinzel = require('../heinzel');
heinzel.init('git+http://github.com/heinzelmannchen/heinzelmannchen-tpl-default-config', 'heinzelrc.tpl', {}).then(function() {
    console.log('done');
}).fail(function() {
    console.trace();
    console.log(arguments);
});
