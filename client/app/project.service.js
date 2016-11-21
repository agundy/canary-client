//Factory for Project related requests
app.factory('Project', function($resource){
    return $resource('/api/project/:id/:controller', {
        'id': '@id'
    }, {
        //Request for token regeneration
        regenToken: {
            method: 'PUT',
            params: {
                controller: 'regentoken'
            }
        },
        //Request to poll for Events
        pollEvent: {
            method: 'GET',
            params: {
                controller: 'event',
                event_id: 'event_id'
            }
        }
    });
});
