app.factory('Project', function($resource){
    return $resource('/api/project/:id/:controller', {
        'id': '@id'
    }, {
        regenToken: {
            method: 'PUT',
            params: {
                controller: 'regentoken'
            }
        },
        pollEvent: {
            method: 'GET',
            params: {
                controller: 'event',
                event_id: 'event_id'
            }
        }
    });
});
