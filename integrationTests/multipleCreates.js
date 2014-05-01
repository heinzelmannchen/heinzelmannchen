var heinzel = require('../heinzel'),
    Q = require('q'),
    i,
    promises = [];

for (i=0;i<100;i++){
    promises.push(heinzel.create('extViews.formView', {
        override: true,
        ensurePathExists: true,
        filters: {
            tables: ['heinzel', 'occupation']
        }
    }));
}
Q.allSettled(promises).then(function (files) {
    console.log('done', files);
}).fail(function () {
    console.trace();
    console.log(arguments);
});
