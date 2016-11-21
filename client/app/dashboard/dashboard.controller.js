app.controller('DashboardCtrl', function($scope, $location, Auth, Project, User, $interval, $q) {
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

    //Array for Cell colors
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
    
    //Visibility state of project selection menu
    $scope.showSelector = false;
    
    //Toggles visibility of project selection menu
    $scope.toggleSelector = function() { $scope.showSelector = !$scope.showSelector; }

    //Adds new data source to selected project
    //Currently not ported from dash_settings
    $scope.addSource = function() {
    };

    //Pops last data source from selected project
    //Currently not ported from dash_settings
    $scope.popSource = function() {
    };

    //Refreshes Tables to reflect changes in dashboard settings
    //Currently not ported from dash_settings
    $scope.refreshSources = function() {
    };

    //Currently selected project
    $scope.projects = Project.query({}, function(){
        $scope.selectedProject = $scope.projects[0];
    });
    $scope.user = User.me();
    

    $scope.lastEvent = {
            "id":0,
            "host":"",
            "code":0,
            "duration":0,
            "endpoint":"",
            "project_id":0,
            "timestamp":""
    };

    //Value for new projects credentials
    $scope.newProject = {
        name : ""
    };
    
    //Creates a new token for the selected project
    $scope.newToken = function(project) {
        project.$regenToken({}, function(){ 
            $scope.projects = Project.query({}, function(){
                $scope.selectedProject = $scope.projects[$scope.projects.length - 1];
            });
        });
    };
    
    //Selects project from project selection menu
    $scope.selectProject = function(project) {
        $scope.selectedProject = project;
        $scope.updateDash();
    };
    
    //Adds new project if given unique project name
    //Otherwise, does nothing
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
        Project.pollEvent({
            id: $scope.selectedProject.id,
            event_id: $scope.lastEvent.id
        }, function(e){
            $q.resolve(e);
            if (e.id) {
                $scope.lastEvent = e;
                source_light_on($scope.lastEvent.code);
                setTimeout(function() { source_light_off($scope.lastEvent.code); },1000);
            }
        });
    };
    
    
    
    $scope.updateDash = function() { 
        a = $scope.lastEvent.id;
        $scope.poll();
        if (angular.isUndefined($scope.isPolling)) {
            $scope.isPolling = $interval($scope.poll, 1000);
        }
        if (( a != $scope.lastEvent.id) && ($scope.caughtHTTPcodes.indexOf($scope.lastEvent.code) > -1 )){
            source_light_on($scope.lastEvent.code);
        }
            
    };
});
