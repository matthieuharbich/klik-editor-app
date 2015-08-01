'use strict';

angular.module('msrsApp')
  .factory('projects', function($http){
	   
	        return{
	            
	            
	           getProjects: function(callback) {
	              $http({
	                  method: 'GET',
	                  url: 'api/projects/'
	                }).success(function(projects) {

	                  callback(null, projects);
	                 

	                }).error(function(err){
	                  callback(err);
	                });
	          },

	          getLastProject: function(callback) {
	              $http({
	                  method: 'GET',
	                  url: 'api/projects/last'
	                }).success(function(project) {

	                  callback(null, project);
	                 console.log(project);

	                }).error(function(err){
	                  callback(err);
	                });
	          }
	        };
	        

	  })

	.controller('ProjectsCtrl', function (projects, $window, $scope, $http, ngDialog, Upload) {
			$scope.message = 'Hello';
			$scope.projects = [];
			console.log('helloo')

			 $scope.$watch('files', function () {
		        $scope.upload($scope.files);
		    });
		    $scope.log = '';

		   $scope.upload = function (files) {
		        if (files && files.length) {
		            for (var i = 0; i < files.length; i++) {
		                var file = files[i];
		                Upload.upload({
		                    url: 'api/projects/upload',
		                    fields: {'username': $scope.username},
		                    file: file
		                }).progress(function (evt) {
		                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
		                    $scope.progress = progressPercentage;
		                }).success(function (data, status, headers, config) {
		                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
		                    console.log(data);
		                    var pathArray = data.file.path.split( '/' );
		                    var length = pathArray[0].length;

		                    var videoPath = data.file.path.substring(length + 1, data.file.path.length);
		                    $scope.videoPath = videoPath;
		                    var replaceImage = videoPath.replace('videos','images');
		                    $scope.thumbPath = replaceImage.substring(0, replaceImage.length - 4);
		                    console.log($scope.videoPath);
		                    console.log($scope.thumbPath);

		     //                if(!$scope.$$phase) {
							//    $scope.$apply(function(){
		     //                	var videoPath = data.file.path.substring(length + 1, data.file.path.length);
		     //                $scope.videoPath = videoPath;
		     //                var replaceImage = videoPath.replace('videos','images');
		     //                $scope.thumbPath = replaceImage.substring(0, replaceImage.length - 4);
		     //                console.log($scope.videoPath);
		     //                console.log($scope.thumbPath);
		     //                })
							// }

		                });
		            }
		        }
		    };

			projects.getProjects(function(err, projects){
		      if (err) {

		      } else{
		        $scope.projects = projects;
		      }
		    });


			
			

		     $scope.openParamDialog = function(project) {
			        $scope.project = project;

			        ngDialog.open({
				      template: 'app/modal/paramForm.html',
				      className: 'ngdialog-theme-default',
				      scope: $scope,
				      closeByEscape: true,
				      closeByDocument: true,
				      showClose: true
				    });
			        
			  };

			  $scope.openDeleteDialog = function(project) {
			        $scope.project = project;
			        
			        ngDialog.close();
			        ngDialog.open({
				      template: 'app/modal/deleteForm.html',
				      className: 'ngdialog-theme-default',
				      scope: $scope,
				      closeByEscape: true,
				      closeByDocument: true,
				      showClose: true
				    });
			        
			  };

			  $scope.openNewProjectDialog = function() {
			  		
			        ngDialog.open({
				      template: 'app/modal/newProjectForm.html',
				      className: 'ngdialog-theme-default',
				      data: $scope,
				      controller: 'ProjectsCtrl',
				      closeByEscape: true,
				      closeByDocument: true,
				      showClose: true
				    });
			        
			    };

			    $scope.deleteProject = function(project){
        
			        var index = $scope.projects.indexOf(project);
			        $http.delete('api/projects/' + project._id);
			        $scope.projects.splice(index,1);			        

			    };


		    $scope.updateProject = function(id, name, description){
		    	var projectToUpdate = {
		    		_id: id,
		    		name: name,
		    		description: description
		    	};

		    	console.log(projectToUpdate);

		    	$http.put('/api/projects/' + projectToUpdate._id, projectToUpdate);
		    }

		     $scope.addProject = function(name, description){
		    	var newProject = {
		    		name: name,
		    		description: description,
		    		videoPath: $scope.videoPath,
		    		thumbPath: $scope.thumbPath
		    	}		            	
		    	$http({
		              method: 'POST',
		              url: 'api/projects',
		              data: newProject
		            }).success(function(project) {
		            	$scope.projects.push(project);
		            }).error(function(err) {			              
		              alert(err);			              
		            });
            

		    	

		    	

			     console.log($scope.projects);
				  	

		};
	});
