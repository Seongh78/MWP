/**
 * Created by KIM-ATIV on 2016-12-12.
 */

var app = angular.module('jandiApp', []);


app.controller("LoginCtrl" , function($scope , LoginStorage) {

	$scope.usrChk = function () {
		LoginStorage.login({usr_id:$scope.usr_id, usr_pwd:$scope.usr_pwd});
	}
/*
	$scope.$watch('usr_id' , function(newValue , oldValue) {
		if( newValue === "admin" ){
			$('#frmId').addClass('has-success');
		}else{
			$('#frmId').removeClass('has-success');
			$('#frmId').addClass('has-danger');
		}
	});
*/

});

app.factory("LoginStorage" , function ($http, $q) {
	var usr = {
		login: function (usrFrm) {
			// console.log(usrFrm);
			$http.post('/users/login', usrFrm).then(function success(rs) {
				// alert("RESULT: "+rs.data.result +" / t:"+rs.data.t);
				if(rs.data.result === false){
					alert("이런! 입력한 정보에 오타가 있네요...");
				}else{
					location.href="/";
				}
			});
		}
	}

	return usr;
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.controller('NewTopicCtrl' , function($scope , NewTopicStorage) {

	NewTopicStorage.get().then(function (topics) {
		$scope.topics = topics;
		// console.log($scope.topics);
	});

	$scope.move = function(link) {
		document.location.href=link;
	}

	$scope.skTest = function () {
		NewTopicStorage.post({topicText:$scope.newTopicText});
		// $('#sendBtn').removeClass("disabled");
		$('#newTopicText').val('새 소식을 올려주세요');
		NewTopicStorage.get().then(function (topics) {
		$scope.topics = topics;
		// console.log($scope.topics);
	});
	}
});

app.factory('NewTopicStorage' ,  function($http, $q) {
	// var socket = io.connect("http://10.1.60.74:3000/");
	
	var topic= {
		/*
		on: function (eventName , callback) {
			socket.on(eventName, callback);
		},
		emit: function (eventName , data) {
			socket.emit(eventName , data);
		},*/
		topics:[],

		get: function () {
			var deferred = $q.defer();
			$http.get('/topic/topics')
				.then(function success(rs) {
					// console.log(rs);
					deferred.resolve(angular.copy(rs.data, topic.topics));
			});
			return deferred.promise;
		},
		post: function (data) {
			var deferred = $q.defer();
			$http.post('/topic/insert' , {txt:data.topicText}).then(function success(rs) {
				conosle.log("post result: "+rs.data);
				// topic.get();
			});
			return deferred.promise;
		}
	}
	return topic;
});




/////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.controller('MemberCtrl' , function($scope, MemberStorage) {

	MemberStorage.get().then(function (members) {
		$scope.members = members;
		console.log($scope.members);
		console.log("$scope.members");
		// alert(11);
	});


	$scope.addFrm = function(show) {
		$('#newMemberFrm').css('display',show);
		if(show==="none"){
			$scope.findList=null;
			$scope.searchid=null;
		}
	}

	$scope.request = function(val) {
		// alert(val);
	}

	$scope.$watch('searchid' , function(newValue , oldValue) {
		if(newValue != oldValue){
			// $scope.nv=newValue;
			MemberStorage.find(newValue).then(function(findList) {
				$scope.findList=findList;
			});
		}
	});

});


app.factory('MemberStorage' ,  function($http, $q) {

	var member= {
		members:[],
		findList:[],

		get: function () {
			var deferred = $q.defer();
			$http.get('/users/members').then(function success(result) {
					deferred.resolve(angular.copy(result.data, member.members));
					console.log(members);
			});
			return deferred.promise;
		},
		find: function (like) {
			var deferred = $q.defer();
			$http.get('/users/find/'+like).then(function success(result) {
					deferred.resolve(angular.copy(result.data, member.findList));
					// console.log(findList);
			});
			return deferred.promise;
		},
		teamReq: function (li) {
			$http.post('/users/request', {rid:li}).then(function success(result) {
				// body...
			});
		}
	}
	return member;
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
