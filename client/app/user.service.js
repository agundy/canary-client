//Factory for User related requests
app.factory('User', function($resource) {
    return $resource('/api/user/:id', {
        'id': '@_id'
    }, {
        //Request for User properties
        me: {
            method: 'GET',
            params: {
                id: 'me'
            }

        }
    });
});
