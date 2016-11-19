app.factory('Project', function($resource){
    return $resource('/api/project/:id', {
        'id': '@_id'
    }, {});
});
