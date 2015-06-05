navigator.seriviceWorker.register('./test.js').then(function(registration) {
    console.log('success: '+ registration.scope);
});
