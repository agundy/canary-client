app.controller('DashboardCtrl', function($scope, $location, Auth, $http) {
    $scope.source_array = [
        {value: "404", text: "404"},
        {value: "d404", text: "404 Rate"},
        {value: "lod", text: "Page Loads"},
        {value: "dlod", text: "Page Load Rate"},
        {value: "lat", text: "Latency"},
        {value: "usr0", text: "API 1"},
        {value: "usr1", text: "API 2"},
        {value: "usr2", text: "API 3"},
        {value: "usr3", text: "API 4"}
    ];

    var colors = ["red","orange","yellow","green","blue","indigo","violet"];

    $scope.addSource = function() {
    };

    $scope.popSource = function() {
    };

    $scope.refreshSources = function() {
    };

    $http.get('/api/project').then(function(resp){
        $scope.projects = resp.data;
    });

});
