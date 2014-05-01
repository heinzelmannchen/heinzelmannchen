var heinzel = require('../heinzel');
heinzel.installGenerators('pg').then(function() {
    console.log('installed pg');
    heinzel.uninstallGenerators('pg').then(function () {
        console.log('uninstalled pg');
    });
});
