var heinzel = require('../heinzel');
//heinzel.install('burnhub').then(function() {
    //console.log('installed');
//});
heinzel.installGenerators('pg').then(function() {
    console.log('installed');
});
