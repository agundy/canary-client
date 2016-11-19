app.factory('Project', function($resource){
    return $resource('/api/project/:id/:controller', {
        'id': '@_id'
    }, {
        method: 'PUT',
        params: {
            controller: 'regentoken'
        }
    });
});
