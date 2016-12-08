//Controls UI components for dashboard page
app.controller('DashboardCtrl', function($scope, $location, Auth, Project, User, $interval, $q) {
    //Array of default data sources
    $scope.source_array = [
        { code: "404", description : "Not Found" },
        { code: "403", description : "Forbibben" },
        { code: "500", description : "Internal Server Error" },
        { code: "503", description : "Service Unavailable" },
        { code: "504", description : "Gateway Timeout" }
    ];

    //Organizes current data sources into a square grid format 
    $scope.doSquaredSources = function(){
        var squared = [[]];
        for (i = 0; i < $scope.source_array.length; i++) {
            if (i % Math.floor(Math.sqrt($scope.source_array.length)) == 0) { squared.push([]); }
            if ($scope.source_array[i]) { squared[Math.floor(i / Math.floor(Math.sqrt($scope.source_array.length)))].push($scope.source_array[i])}
        }
        return squared;
    }
    
		//Square grid of current data sources
    $scope.squaredSources = $scope.doSquaredSources();
    
    //Set of valid HTTP response codes, description, and state
    $scope.caughtHTTPcodes = {
        "100" : ["Continue", 0 ], "101" : ["Switching Protocols", 0 ], "102" : ["Processing", 0 ], 
        "200" : ["OK", 0 ], "201" : ["Created", 0 ], "202" : ["Accepted", 0 ], 
        "203" : ["Non-Authoritative Information", 0 ], "204" : ["No Content", 0 ], "205" : ["Reset Content", 0 ], 
        "206" : ["Partial Content", 0 ], "207" : ["Multi-Status", 0 ], "208" : ["Already Reported", 0 ], 
        "226" : ["IM Used", 0 ], 
        "300" : ["Multiple Choices", 0 ], "301" : ["Moved Permanently", 0 ], "302" : ["Found", 0 ], 
        "303" : ["See Other", 0 ], "304" : ["Not Modified", 0 ], "305" : ["Use Proxy", 0 ], 
        "307" : ["Temporary Redirect", 0 ], "308" : ["Permanent Redirect", 0 ], 
        "400" : ["Bad Request", 0 ], "401" : ["Unauthorized", 0 ], "402" : ["Payment Required", 0 ], 
        "403" : ["Forbidden", 0 ], "404" : ["Not Found", 0 ], "405" : ["Method Not Allowed", 0 ], 
        "406" : ["Not Acceptable", 0 ], "407" : ["Proxy Authentication Required", 0 ], "408" : ["Request Timeout", 0 ], 
        "409" : ["Conflict", 0 ], "410" : ["Gone", 0 ], "411" : ["Length Required", 0 ], 
        "412" : ["Precondition Failed", 0 ], "413" : ["Payload Too Large", 0 ], "414" : ["URI Too Long", 0 ], 
        "415" : ["Unsupported Media Type", 0 ], "416" : ["Range Not Satisfiable", 0 ], "417" : ["Expectation Failed", 0 ], 
        "421" : ["Misdirected Request", 0 ], "422" : ["Unprocessable Entity", 0 ], "423" : ["Locked", 0 ], 
        "424" : ["Failed Dependency", 0 ], "426" : ["Upgrade Required", 0 ], "428" : ["Precondition Required", 0 ], 
        "429" : ["Too Many Requests", 0 ], "431" : ["Request Header Fields Too Large", 0 ], "451" : ["Unavailable For Legal Reasons", 0 ], 
        "500" : ["Internal Server Error", 0 ], "501" : ["Not Implemented", 0 ], "502" : ["Bad Gateway", 0 ], 
        "503" : ["Service Unavailable", 0 ], "504" : ["Gateway Timeout", 0 ], "505" : ["HTTP Version Not Supported", 0 ], 
        "506" : ["Variant Also Negotiates", 0 ], "507" : ["Insufficient Storage", 0 ], "508" : ["Loop Detected", 0 ], 
        "510" : ["Not Extended", 0 ], "511" : ["Network Authentication Required", 0]
    };

    //Visibility state of project selection menu
    $scope.showSelector = false;
    $scope.nonUniqueSource = false;
    
		//Logout button function
    $scope.logOut = function() { Auth.logout();};
    
    //Toggles visibility of project selection menu
    $scope.toggleSelector = function() {
        $scope.showSelector = !$scope.showSelector;
        $scope.nonUniqueSource = false;
    }

    //Set of values for new data sources (only code needed)
    $scope.newDataSource = {
        code : ""
    };

    //Array for Cell colors in hex
    $scope.colors = [ //(off,on)
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
    
    //Array for Cell colors in HSL
    $scope.colorsHSL = [ //(off,on)
	[ "hsl(180,100%,75%)" , "hsl(180,100%,50%)" ],
	[ "hsl(120,100%,75%)" , "hsl(120,100%,50%)" ],
	[ "hsl(260,100%,75%)" , "hsl(260,100%,50%)" ],
	[ "hsl(30,100%,75%)" , "hsl(30,100%,50%)" ],
  [ "hsl(0,100%,75%)" , "hsl(0,100%,50%)" ]
    ];
    
    //Gets the color for a data source
    $scope.getColor = function(httpCode){
        return { 'background-color' : $scope.colorsHSL[Math.floor(Number(httpCode) / 100) - 1][$scope.caughtHTTPcodes[httpCode][1]] };
    }
    
    //Adds data source to selected Project
    $scope.addSource = function() {
        if (angular.isDefined($scope.caughtHTTPcodes[$scope.newDataSource.code])) {
            var newData = {
                code: $scope.newDataSource.code,
                description : $scope.caughtHTTPcodes[$scope.newDataSource.code][0]
            };
            $scope.source_array.push(newData);
            $scope.squaredSources = angular.copy($scope.doSquaredSources());
        }else if ($scope.newDataSource.code != ""){ alert("please use only defined HTTP codes");}
    };
    
    

    //Pops last data source from selected Project
    $scope.popSource = function(source) {
        var index = $scope.source_array.indexOf(source);
        $scope.source_array.splice(index, 1);
        $scope.squaredSources = angular.copy($scope.doSquaredSources());
    };

    //Currently selected Project
    $scope.projects = Project.query({}, function(){
        $scope.selectedProject = $scope.projects[0];
    });
    //Currently logged in User
    $scope.user = User.me();
    
    //Set of values associated with latest Event polled
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
                var a = $scope.projects.length
                $scope.projects = Project.query();
                if (a == $scope.projects.length) { $scope.nonUniqueSource = true;}
            });
        }
    };
    
    //Polling refresh rate
    $scope.refreshRate = 1000;
    
    //Toggle the state of Cells given some data source
    $scope.toggleDataSource = function(someSource) {
        $scope.caughtHTTPcodes[someSource][1] = ($scope.caughtHTTPcodes[someSource][1] + 1) % 2;
        $scope.squaredSources = angular.copy($scope.doSquaredSources());
    };
    
    //Poll for new Events
    $scope.poll = function(){
        Project.pollEvent({
            id: $scope.selectedProject.id,
            event_id: $scope.lastEvent.id
        }, function(e){
            $q.resolve(e);
            if (e.id) {
                $scope.lastEvent = e;
                $scope.toggleDataSource(String($scope.lastEvent.code));
                setTimeout(function() { $scope.toggleDataSource(String($scope.lastEvent.code)) },$scope.refreshRate);
            }
        });
    };
    
    //Boolean for controlling Event polling
    $scope.isPolling = $interval($scope.poll, $scope.refreshRate);
});

