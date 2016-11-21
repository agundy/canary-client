app.factory('Project', function($resource){
    return $resource('/api/project/:id/:controller:eventid', {
        'id': '@id'
    }, {
        regenToken: {
            method: 'PUT',
            params: {
                controller: 'regentoken'
            }
        }
    }, {
        pollEvent(lastEvent): {
            method: 'GET',
            params: {
                controller: 'event?event_id=',
                eventid: lastEvent
            }
        }
    });
});
