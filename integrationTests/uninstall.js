var heinzel = require('../heinzel');
heinzel.uninstallGenerators('pg', true).then(function() {
    console.log('uninstalled');
});
