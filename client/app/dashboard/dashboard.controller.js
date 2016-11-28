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
    
    $scope.caughtHTTPcodes = {
        "100" : "Continue","101" : "Switching Protocols","102" : "Processing","200" : "OK","201" : "Created","202" : "Accepted","203" : "Non-Authoritative Information","204" : "No Content","205" : "Reset Content","206" : "Partial Content","207" : "Multi-Status","208" : "Already Reported","226" : "IM Used","300" : "Multiple Choices","301" : "Moved Permanently","302" : "Found","303" : "See Other","304" : "Not Modified","305" : "Use Proxy","307" : "Temporary Redirect","308" : "Permanent Redirect","400" : "Bad Request","401" : "Unauthorized","402" : "Payment Required","403" : "Forbidden","404" : "Not Found","405" : "Method Not Allowed","406" : "Not Acceptable","407" : "Proxy Authentication Required","408" : "Request Timeout","409" : "Conflict","410" : "Gone","411" : "Length Required","412" : "Precondition Failed","413" : "Payload Too Large","414" : "URI Too Long","415" : "Unsupported Media Type","416" : "Range Not Satisfiable","417" : "Expectation Failed","421" : "Misdirected Request","422" : "Unprocessable Entity","423" : "Locked","424" : "Failed Dependency","426" : "Upgrade Required","428" : "Precondition Required","429" : "Too Many Requests","431" : "Request Header Fields Too Large","451" : "Unavailable For Legal Reasons","500" : "Internal Server Error","501" : "Not Implemented","502" : "Bad Gateway","503" : "Service Unavailable","504" : "Gateway Timeout","505" : "HTTP Version Not Supported","506" : "Variant Also Negotiates","507" : "Insufficient Storage","508" : "Loop Detected","510" : "Not Extended","511" : "Network Authentication Required"
    };

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
