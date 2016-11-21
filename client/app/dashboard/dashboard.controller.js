//Controls UI components for dashboard page
app.controller('DashboardCtrl', function($scope, $location, Auth, Project, User) {
    //Array for data source selection options
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
        console.log($scope.selectedProject);
    }
    
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
});
