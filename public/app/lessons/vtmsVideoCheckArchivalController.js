angular.module('vtms').controller('vtmsVideoCheckArchivalController', function($scope, vtmsLesson) {

  $scope.videoCheckLessonsConfig = {
    title: 'Check These',
    type: 'videoCheckLessons',
    update: function() {
      return vtmsLesson.getVideoCheckLessons();
    },
    actions: {
      removeFromRenderQueue: false,
      markAsVideoChecked: true,
	  markAsVideoNotChecked: false,
      markAsLanguageChecked: false,
	  markAsNotLanguageChecked: true,
      goToCheckingInterface: true,
    },
    columns: {
      actions: true,
      shortLesson: true,
      dueDate: true,
      status: true
    }
  };

  $scope.archivableLessonsConfig = {
    title: 'Move These',
    type: 'archivableLessons',
    update: function() {
      return vtmsLesson.getArchivableLessons();
    },
    actions: {
      markAsArchived: true,
      goToCheckingInterface: true,
    },
    columns: {
      actions: true,
      shortLesson: true,
      dueDate: true
    }
  };

});
