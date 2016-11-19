app.factory('User', function($resource) {
    return $resource('/api/user/:id', {
        'id': '@_id'
    }, {
        me: {
            method: 'GET',
            params: {
                id: 'me'
            }

        }
    });
});
