app.controller('DashboardCtrl', function($scope, $location, Auth, Project, User) {
    $scope.source_array = [
        {value: "200", text: "Page Load"},
        {value: "400", text: "400: Bad Request"},
        {value: "403", text: "403: Access Denied"},
        {value: "404", text: "404: Not Found"},
        {value: "500", text: "500: Server Error"},
        {value: "usr0", text: "API 1"},
        {value: "usr1", text: "API 2"},
        {value: "usr2", text: "API 3"},
        {value: "usr3", text: "API 4"},
        {value: "del", text: "Delete Source"}
    ];
    
    $scope.caughtHTTPcodes = [200, 400, 403, 404, 500];
    
    $scope.colors = [ //(on,off)
	[ "#d27979" , "#ff4d4d" ],
	[ "#d2b579" , "#ffc34d" ],
	[ "#b5d279" , "#c3ff4d" ],
	[ "#79d279" , "#4dff4d" ],
	[ "#79d2b5" , "#4dffc3" ],
	[ "#79b5d2" , "#4dc3ff" ],
	[ "#7979d2" , "#4d4dff" ],
	[ "#b579d2" , "#c44dff" ],
    [ "#d279b5" , "#ff4dc3" ]
    ];
    
    $scope.showSelector = false;
    
    $scope.toggleSelector = function() { $scope.showSelector = !$scope.showSelector; }

    $scope.addSource = function() {
    };

    $scope.popSource = function() {
    };

    $scope.refreshSources = function() {
    };

    $scope.projects = Project.query({}, function(){
        $scope.selectedProject = $scope.projects[0];
    });
    $scope.user = User.me();
    
    $scope.lastEvent = {
            "host":"",
            "code":0,
            "duration":0,
            "endpoint":"",
            "project_id":0,
            "timestamp":""
    };
    $scope.newProject = {
        name : ""
    };
    $scope.newToken = function(project) {
        project.$regenToken({}, function(){ 
            $scope.projects = Project.query({}, function(){
                $scope.selectedProject = $scope.projects[$scope.projects.length - 1];
            });
        });
    };
    
    $scope.selectProject = function(project) {
        $scope.selectedProject = project;
        console.log($scope.selectedProject);
    }
    
    $scope.addProject = function(){
        if ($scope.newProject.name != "") {
            var project = {
                name: $scope.newProject.name
            };
            Project.save(project, function(){
                $scope.projects = Project.query();
            });
        }
    };
    
    $scope.poll = function(){
        $scope.lastEvent = $scope.selectedProject.$pollEvent({id:$scope.lastEvent.id});
    }
    
    $scope.updateDash = function() { 
        a = $scope.lastEvent.id;
        $scope.poll();
        if (( a != $scope.lastEvent.id) && ($scope.caughtHTTPcodes.indexOf($scope.lastEvent.code) > -1 )){
            source_light_on($scope.lastEvent.code);
            setTimeout(function() { source_light_off($scope.lastEvent.code); },1000);
        }
            
    }
});
