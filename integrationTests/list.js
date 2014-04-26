var heinzel = require('../heinzel');

heinzel.listGenerators().then(function(data) {
    console.log('GENERATORS: ', data);
}).fail(function() {
    console.log(arguments);
});
heinzel.listTemplates().then(function(data) {
    console.log('TEMPLATES: ', data);
}).fail(function() {
    console.log(arguments);
});

heinzel.listDomains().then(function(data) {
    console.log('DOMAINS: ', data);
}).fail(function() {
    console.log(arguments);
});
