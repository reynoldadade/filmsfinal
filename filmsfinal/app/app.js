'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngStorage',
  'ngRoute',
  'ngJsonExportExcel',
  'chart.js'
]);

app.config(['$locationProvider', '$routeProvider','$httpProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');


   $routeProvider.when('/',{
        templateUrl: 'transactions/login.html',
        controller: 'login_Ctrl'
  })
    .when('/paid_deals', {
    templateUrl: 'transactions/paid_deals.html',
    controller: 'paid_deals_Ctrl',
     resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/cancelled_requests', {
    templateUrl: 'transactions/cancelled_requests.html',
    controller: 'cancelled_requests_Ctrl',
     resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/e-pay_pending', {
    templateUrl: 'transactions/pending_e-pay.html',
    controller: 'pending_payments_Ctrl',
    resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/tprs_pending', {
    templateUrl: 'transactions/pending_tprs.html',
    controller: 'pending_qc_Ctrl',
    resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/tprs_rejected', {
    templateUrl: 'transactions/tprs_rejected.html',
    controller: 'rejected_deals_Ctrl',
    resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/e-pay_rejected', {
    templateUrl: 'transactions/rejected_e-pay.html',
    controller: 'rejected_payments_Ctrl',
    resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/dashboard', {
    templateUrl: 'transactions/dashboard.html',
    controller: 'dashboard_Ctrl',
    resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                //var t2=($sessionStorage.logged_in.admin).toString();
                if(t!=="true" /*&& t2!=="true"*/)
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/settings', {
    templateUrl: 'transactions/settings.html',
    controller: 'settings_Ctrl',
    resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                //var t2=($sessionStorage.logged_in.admin).toString();
                if(t!=="true" /*&& t2!=="true"*/)
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/statistics', {
    templateUrl: 'transactions/statistics.html',
    controller: 'statistics_Ctrl',
    resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                //var t2=($sessionStorage.logged_in.admin).toString();
                if(t!=="true" /*&& t2!=="true"*/)
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/admin', {
    templateUrl: 'transactions/admin.html',
    controller: 'dashboard_Ctrl',
    resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
  })

    .when('/login', {
    templateUrl: 'transactions/login.html',
    controller: 'login_Ctrl'
  })

    .when('/kyc',{
           templateUrl: 'transactions/kyc.html',
           controller:'kyc_Ctrl',
           resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
       })

    .when('/kyc_rejected',{
           templateUrl: 'transactions/rejected_kyc.html',
           controller:'rejected_kyc_Ctrl',
           resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
       })

    .when('/eligibility',{
           templateUrl: 'transactions/eligibility.html',
           controller:'eligibility_Ctrl',
           resolve:
    {
            mess:function($location,$sessionStorage)
            {
                var t=($sessionStorage.logged_in.allow).toString();
                if(t!=="true")
                {
                    $location.path('/login');
                    //redirectTo: '/login';
                }
            }

    }
       })

    .when('/logout', {
    templateUrl: 'transactions/login.html',
    controller: 'logout_Ctrl'
});

  $routeProvider.otherwise({redirectTo: '/login'});
}]);

/***************************************************************************************************************************/
//login controller
app.controller('login_Ctrl',['$rootScope','$sessionStorage','$scope','$http','$location',function ($rootScope,$sessionStorage,$scope,$http,$location) {
$scope.login= function () {
    $scope.signIn = true;
    var input = {
        "username": $scope.username,
        "password": $scope.password
    };
    $http({
        method: 'POST',
        url: 'http://52.91.63.84/FilmsWeb/api/web/loginuser',
        params: input,
        headers: {'Content-Type': 'application/json',
                   'Accept': 'application/json'
        }
    }).success(function(response) {
        $scope.user_data = response;


    if ($scope.user_data === null){
     $scope.error = true;
     $scope.message = 'incorrect username/password';
     $scope.signIn = false;
     }
     else if($scope.user_data.Permission === "True") {
         $sessionStorage.lastLogin = $scope.user_data['LastLogin'];
         $sessionStorage.user = $scope.user_data.Name;
         $sessionStorage.user_id = $scope.user_data.Id;
         $sessionStorage.branch = $scope.user_data.Branch;
         $sessionStorage.role = $scope.user_data.Role;
         $sessionStorage.allow = true;
         $sessionStorage.showMenu = true;

         if ($scope.user_data.Role === 'KYC') {
             $sessionStorage.kyc = true;
         }

         else if ($scope.user_data.Role === 'QC') {

             $sessionStorage.qc = true;
         }

         else if ($scope.user_data.Role === 'ADMIN') {

             $sessionStorage.admin = true;
             $sessionStorage.all = true;
         }
         else if ($scope.user_data.Role === 'EPAY') {

             $sessionStorage.epay = true;

         }

         $sessionStorage.logged_in = {
             'showMenu': $sessionStorage.showMenu,
             'admin': $sessionStorage.admin,
             'qc': $sessionStorage.qc,
             'epay': $sessionStorage.epay,
             'kyc': $sessionStorage.kyc,
             'LastLogin': $sessionStorage.lastLogin,
             'user': $sessionStorage.user,
             'user_id': $sessionStorage.user_id,
             'allow': $sessionStorage.allow,
             'role': $sessionStorage.role,
             'all':$sessionStorage.all,
             'branch':$sessionStorage.branch
         };

         var branches = {

             "Accra": false,
             "Akatsi": false,
             "Bolga": false,
             "Cape Coast": false,
             "Ho": false,
             "Koforidua": false,
             "Kumasi": false,
             "Sunyani": false,
             "Takoradi": false,
             "Tamale": false,
             "Wa": false,
             "Head Office": false
         };
         var paymentMethod = {
             'MTN Mobile Money': false,
             'GCB': false,
             'Tigo Cash': false,
             'GN Bank': false,
             'Cheque': false,
             'Vodafone Cash': false,
             'GhIPSS': false
         };



        var branch_array = $scope.user_data.Branch.split(",");

          var payment_array  = $scope.user_data.PaymentMethod.split(",");

      for(var i=0; i< branch_array.length; i++) {
          if (branches.hasOwnProperty(branch_array[i])) {
              branches[branch_array[i]] = true;
          }
      }

      for(var j=0; j < payment_array.length; j++){
          if(paymentMethod.hasOwnProperty(payment_array[j])){
              paymentMethod[payment_array[j]] = true;
          }
      }





        $sessionStorage.branches = branches;
         $sessionStorage.paymentMethod = paymentMethod;
         $location.path('/settings');
     }

     else{
     $scope.error = true;
     $scope.message = 'Your account is locked';
     $scope.signIn= false;
     }



   }).error(function(){
         console.log('api call failed')
    })


     };

}]);

/******************************************************************************************************************************************************/
//Dashboard
app.controller('dashboard_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$filter',function ($scope,$rootScope,$sessionStorage,$http,$filter) {
 $rootScope.logged_in = $sessionStorage.logged_in;
 $rootScope.branches = $sessionStorage.branches;
 $rootScope.form_data = $sessionStorage.form_data;
 $rootScope.paymentMethod  = $sessionStorage.paymentMethod;
 $scope.loaded = true;
$scope.today = new Date();
$scope.submit=function () {
    $scope.found=true;
    var start_day = new Date($scope.start_date).getDate();
    var start_month = new Date($scope.start_date).getMonth() + 1;
    var start_year = new Date($scope.start_date).getFullYear();
    var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
    var end_day = new Date($scope.end_date).getDate();
    var end_month = new Date($scope.end_date).getMonth() + 1;
    var end_year = new Date($scope.end_date).getFullYear();
    var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();

   var input = {start:start_full_year,end:end_full_year};
        $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/getallactiverequests',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.details = response.data;
             $scope.loaded = false;
            $scope.found=false;
            $scope.pending_tprs =($filter('filter')($scope.details,{TransactionStatus:'pending_tprs'})).length;
            $scope.kyc_rejected =($filter('filter')($scope.details,{TransactionStatus:'kyc_rejected'})).length;
            $scope.pending_epay =($filter('filter')($scope.details,{TransactionStatus:'pending_epay'})).length;
            $scope.epay_rejected =($filter('filter')($scope.details,{TransactionStatus:'epay_rejected'})).length;
            $scope.paid =($filter('filter')($scope.details,{TransactionStatus:'paid'})).length;
            $scope.kyc_pending =($filter('filter')($scope.details,{TransactionStatus:'kyc_pending'})).length;
            $scope.cancelled =($filter('filter')($scope.details,{TransactionStatus:'cancelled'})).length;
            $scope.tprs_rejected =($filter('filter')($scope.details,{TransactionStatus:'tprs_rejected'})).length;
            $scope.labels = ['KYC','KYC Rejected','TPRS Pending','TPRS Rejected','EPAY Validation','EPAY Rejected','Cancelled'];


$scope.data = [$scope.kyc_pending,$scope.kyc_rejected,$scope.pending_tprs,$scope.tprs_rejected,$scope.pending_epay,$scope.epay_rejected,$scope.cancelled];
//$scope.data = [4,3,10,5,20,8,3];
        }, function () {
             $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
        });
    };









}]);

/*****************************************************************************************************************************/
//Settings
app.controller('settings_Ctrl',['$scope','$rootScope','$sessionStorage','$timeout','$location',function ($scope,$rootScope,$sessionStorage,$timeout,$location) {
 $rootScope.logged_in = $sessionStorage.logged_in;
 $rootScope.branches = $sessionStorage.branches;
 $rootScope.paymentMethod  = $sessionStorage.paymentMethod;

$scope.submit = function () {
    $scope.filtering = true;
    $scope.form_data = {
        mtn: $scope.checkbox.mtn,
        gcb :$scope.checkbox.gcb,
        tigo: $scope.checkbox.tigo,
        gn: $scope.checkbox.gn,
        ghipss: $scope.checkbox.ghipss,
        vodafone: $scope.checkbox.vodafone,
        cheque: $scope.checkbox.cheque,
        headoffice: $scope.checkbox.headoffice,
        tamale: $scope.checkbox.tamale,
        wa: $scope.checkbox.wa,
        bolgatanga: $scope.checkbox.bolgatanga,
        accra: $scope.checkbox.accra,
        akatsi: $scope.checkbox.akatsi,
        ho: $scope.checkbox.ho,
        sunyani: $scope.checkbox.sunyani,
        kumasi: $scope.checkbox.kumasi,
        koforidua: $scope.checkbox.koforidua,
        capecoast: $scope.checkbox.capecoast,
        takoradi: $scope.checkbox.takoradi,
        filtered: true
    };
$sessionStorage.form_data = $scope.form_data;
$scope.set = true;
$scope.filtering = false;

    $location.path('/statistics');
};


$scope.checkbox = {
    mtn : 'none',
    gcb : 'none',
    tigo: 'none',
    gn: 'none',
    cheque: 'none',
    vodafone: 'none',
    ghipss: 'none',
    headoffice:'none',
    tamale: 'none',
    wa:'none',
    bolgatanga:'none',
    accra:'none',
    akatsi:'none',
    ho:'none',
    sunyani:'none',
    kumasi:'none',
    koforidua:'none',
    capecoast:'none',
    takoradi:'none'


};

}]);

/***************************************************************************************************************************/
//Admin
app.controller('admin_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$route',function ($scope,$rootScope,$sessionStorage,$http,$route) {
 $rootScope.logged_in = $sessionStorage.logged_in;
 $rootScope.branches = $sessionStorage.branches;
 $rootScope.paymentMethod  = $sessionStorage.paymentMethod;
 $scope.action = $sessionStorage.action;


 $scope.inputType= 'password';

                $scope.setSelected = function(selected){
                     $scope.selected = $scope.details.indexOf(selected);
                };

    var updateView = function () {

                   $http({
                       method: 'GET',//or POST
                       url: 'http://52.91.63.84/FilmsWeb/api/web/getusers',
                       headers: {
                           'Content-Type': 'application/json',
                           'Accept': 'application/json'
                       }
                   }).then(function (response) {
                            $scope.details = response.data;
                            $scope.found = false;
                            if ($scope.details.length === 0){
                                $scope.empty = true;
                            }


                   }, function () {
                       $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
                   });
               };
  updateView();



 $scope.new = function () {

        var input ={usercode: $scope.code,role: $scope.selected_role,teamcode:$scope.team_code,name: $scope.name};

     $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/adduser',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            console.log(response.data);
             $route.reload();
      })
 };

 var getRoles = function () {
      $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/getroles',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            $scope.roles = response.data;
      })
 };
 getRoles();



 $scope.edit_payment = function () {
 var payment = [];
  $scope.payment ={
            mtn: $scope.checkbox.mtn,
            gcb :$scope.checkbox.gcb,
            tigo: $scope.checkbox.tigo,
            gn: $scope.checkbox.gn,
            ghipss: $scope.checkbox.ghipss,
            vodafone: $scope.checkbox.vodafone,
            cheque: $scope.checkbox.cheque
        };
  angular.forEach($scope.payment,function(value){
      if (value !== undefined && value!== 'none')
        this.push(value)
  },payment);
  var string_payment = payment.toString();
    var input = {userid: $scope.details[$scope.selected].UserCode,paymentmethod: string_payment};
      $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/updatepaymentmethod',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {

            if (response.data === true){
                $sessionStorage.action = {
                   message: 'Payments Change Successfully',
                   success: true,
                   failure : false,
                   network: false
                };
                 $route.reload();
            }

      })
 };

 $scope.change_branch = function () {
      var branch = [];
      $scope.branch = {
        headoffice: $scope.checkbox.headoffice,
        tamale: $scope.checkbox.tamale,
        wa: $scope.checkbox.wa,
        bolgatanga: $scope.checkbox.bolgatanga,
        accra: $scope.checkbox.accra,
        akatsi: $scope.checkbox.akatsi,
        ho: $scope.checkbox.ho,
        sunyani: $scope.checkbox.sunyani,
        kumasi: $scope.checkbox.kumasi,
        koforidua: $scope.checkbox.koforidua,
        capecoast: $scope.checkbox.capecoast,
        takoradi: $scope.checkbox.takoradi
    };
       angular.forEach($scope.branch,function(value){
              if (value !== undefined && value!== 'none')
                this.push(value)
          },branch);
       var string_branch = branch.toString();
//changing the branch
        var input = {code: $scope.details[$scope.selected].UserCode,branchlist: string_branch};
      $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/updateBranch',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            if (response.data === true){
                $sessionStorage.action = {
                   message: 'Branch Change Successful',
                   success: true,
                   failure : false,
                   network: false
                };
                 $route.reload();
            }
      })
 };


 $scope.change_password = function () {
     var input = {userid: $scope.details[$scope.selected].UserCode,newpass: $scope.new_password};
      $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/changepasswordadmin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
             if (response.data === true){
                $sessionStorage.action = {
                   message: 'Password Change Successful',
                   success: true,
                   failure : false,
                   network: false
                };
                 $route.reload();
            }
      })
 };

 $scope.change_role = function(){
     var input = {userid: $scope.details[$scope.selected].UserCode,newrole: $scope.selected_role};
      $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/changeuserrole',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            if (response.data === true) {
                $sessionStorage.action = {
                    message: 'Role Changed Successfully',
                    success: true,
                    failure: false,
                    network: false
                };
                 $route.reload();
            }

      })
 };

 $scope.lock_account = function(){
        var input = {userid: $scope.details[$scope.selected].UserCode,pemission: $scope.permission};
      $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/changepermission',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            if (response.data === true){
                if ($scope.permission === true){
                     $sessionStorage.action = {
                   message: 'Account Unlocked Successfully',
                   success: true,
                   failure : false,
                   network: false
                }
                 $route.reload();
                }
                else {

                    $sessionStorage.action = {
                        message: 'Account Locked Successfully',
                        success: true,
                        failure: false,
                        network: false
                    };
                     $route.reload();
                }
            }
      });

 };

  $scope.close_alerts = function () {
      $sessionStorage.action = {
          message: '',
          success: false,
          failure: false,
          network: false
      }
  }

}]);

/******************************************************************************************************************************************************/
//kyc
app.controller('kyc_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$route','$filter','updateStatus_factory', function ($scope,$rootScope,$sessionStorage,$http,$timeout,$route,$filter,updateStatus_factory) {
             $rootScope.logged_in = $sessionStorage.logged_in;
            $rootScope.form_data = $sessionStorage.form_data;
             $scope.action = $sessionStorage.action;
             $scope.sortType = 'CreatedByDate';
                $scope.sortReverse = false;
                $scope.found = true;  //for the spinner



                $scope.setSelected = function(selected){
                     $scope.selected = $scope.details.indexOf(selected);
                };


               var updateView = function () {
                   var input = {status: 'pending_kyc'};
                   updateStatus_factory.getStatus(input).then(function (response) {
                            $scope.details = $filter('views_filter')(response.data,$scope.form_data);
                            $scope.found = false;
                            if ($scope.details.length === 0){
                                $scope.empty = true;
                            }

                       $timeout(updateView,300000);
                   }, function () {
                       $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
                   });
               };
  updateView();

  $scope.call_images = function(){
        $scope.images = [];
        $scope.picture= true;
        $scope.selfie = 'Loading Selfie...';
        $scope.passport = 'Loading Passport...';
      var input = {id: $scope.details[$scope.selected].Id};

      updateStatus_factory.getImages(input).then(function (response) {
           // this callback will be called asynchronously
           // when the response is available
           $scope.images = response.data;

           $scope.picture = false;
            $scope.passport = 'No Passport Image';
            $scope.selfie = 'No Selfie Image';

       });
  };


    var error_codes =   function () {
        var input = {Id: 0};

       updateStatus_factory.getError(input).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.error_codes = response.data;
        }, function () {
             $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
        });
    };
    error_codes();






//to approve a kyc deal




    var approve = function () {

            var input = {
                id: $scope.details[$scope.selected].Id,
                status: 'pending_tprs',
                username: $rootScope.logged_in.user
            };
            updateStatus_factory.updateStatus(input)
                .then(function (response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data === true) {
                    $sessionStorage.action = {
                        message: $scope.details[$scope.selected].ClientRefId + ' Successfully Approved',
                        success: true,
                        failure: false,
                        network: false
                    };
                    $route.reload();
                }
                else {
                    $sessionStorage.action = {
                        message: $scope.details[$scope.selected].ClientRefId + '  Approval Failed',
                        success: false,
                        failure: true,
                        network: false
                    };
                    $route.reload();
                }

            }, function () {
                $sessionStorage.action = {
                    message: '',
                    success: false,
                    failure: false,
                    network: true
                };

            })
        };

//to reject a kyc deal
            var reject = function(){
                var input = {id:$scope.details[$scope.selected].Id,status: 'kyc_rejected',username:$rootScope.logged_in.user};

              updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                     if (response.data === true){
                        $scope.rej = response.data;

                    }
                    else{
                          $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                    }
                },function(){
                      $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };

              });

              //add error_code
                var rej = {id:$scope.details[$scope.selected].Id,error_Code:$scope.selected_error};
                $http({
                     method: 'POST',//or POST
                    url: 'http://52.91.63.84/FilmsWeb/api/web/seterrorcode',
                    params: rej,
                    headers: {'Content-Type': 'application/json',
                               'Accept': 'application/json'
                    }
                }).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                     if (response.data === true){
                        $scope.rej2 = response.data;

                    }
                    else {
                        $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                     }
                },function(){
                      $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
                });

                if ($scope.rej === $scope.rej2){
                     $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Successfully Rejected',
                           success: true,
                           failure : false,
                           network: false
                        };
                     $route.reload();

                }else{
                     $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                     $route.reload();
                }
            };
            $scope.close_alerts = function () {
                            $sessionStorage.action={
                            message: '',
                           success: false,
                           failure : false,
                           network: false
                            }
            };



//scope.approve()
$scope.approve = function(){

     var input = {
        id: $scope.details[$scope.selected].Id
    };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                if ($scope.id_status === 'cancelled'){
                $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
    }
    else if($scope.id_status === 'pending_kyc'){
                approve();
                }
    else {
             $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
        }
});
};

//$scope.reject()
$scope.reject = function () {
    var input = {
        id: $scope.details[$scope.selected].Id
    };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                    if ($scope.id_status === 'cancelled') {
                         $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
    }
    else if($scope.id_status === 'pending_kyc'){
                        reject()
                    }
    else {
             $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
        }
    })
};


$scope.check_eligibility = function () {
    var input ={ StaffId: $scope.details[$scope.selected].ClientRefId};

     $http({
                    method: 'POST',//or POST
                    url: 'http://52.91.63.84/FilmsWeb/api/web/qccreditcheck',
                    params: input,
                    headers: {'Content-Type': 'application/json',
                               'Accept': 'application/json'
                    }
                }).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                   $scope.message = response.data;
                   $scope.alert = $scope.message.Status === "NOT ELIGIBLE";
                   $scope.found = $scope.message.Status === "ELIGIBLE";
                   $scope.search = false;
                })
};


var getQuestions =  function () {
    var input = {Id:1};
    $http({
                     method: 'GET',//or POST
                    url: 'http://52.91.63.84/FilmsWeb/api/web/getquestions',
                    params: input,
                    headers: {'Content-Type': 'application/json',
                               'Accept': 'application/json'
                    }
                }).then(function(response) {
    // this callback will be called asynchronously
    // when the response is available
            $scope.questions = response.data;
//$scope.questions = [{QuestionName:'who are you'},{QuestionName: 'where do u stay'}]

});
};
getQuestions();


/*$scope.answers = function (data) {
    var arr = [];
    for(var i in data){
        if(data[i].selected === true){
            arr.push(data[i].selected)
        }
    }
    $scope.score = arr.length;

}*/



}]);

/************************************************************************************************************************************/
//Rejected kyc
app.controller('rejected_kyc_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$route','$filter','updateStatus_factory',function ($scope,$rootScope,$sessionStorage,$http,$route,$filter,updateStatus_factory) {
 $rootScope.logged_in = $sessionStorage.logged_in;
 $scope.action = $sessionStorage.action;
 $rootScope.form_data = $sessionStorage.form_data;

            $scope.sortType = 'StatusDate';
                $scope.sortReverse = false;
                $scope.found = true;  //for the spinner

  $scope.setSelected = function(selected){
            $scope.selected = $scope.details.indexOf(selected);
          };

            var  input = {status : 'kyc_rejected'};
            updateStatus_factory.getStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                            $scope.details = $filter('views_filter')(response.data,$scope.form_data);
                             if ($scope.details.length === 0){
                                $scope.empty = true;
                            }
                            $scope.found = false;

                },function(){
                    $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
              });


             $scope.call_images = function(){
                 $scope.images = [];
      var input = {id: $scope.details[$scope.selected].Id};
       updateStatus_factory.getImages(input).then(function (response) {
           // this callback will be called asynchronously
           // when the response is available
           $scope.images = response.data;
       });
  };


//recall
            var recall = function () {
                 var input = {id:$scope.details[$scope.selected].Id,status: 'pending_kyc',username:$rootScope.logged_in.user};
                updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    if (response.data === true){
                         $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Successfully Recalled',
                           success: true,
                           failure : false,
                           network: false
                        };
                         $route.reload();

                    }
                    else{
                        $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Recall Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                         $route.reload();
                    }

                },function(){
                    $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
              });

            };
            
            
            $scope.recall = function () {
                 var input = {
                    id: $scope.details[$scope.selected].Id
                };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                if ($scope.id_status === 'cancelled'){
                $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
                }
                 else if($scope.id_status === 'kyc_rejected'){
                            recall();
                }
                else {
                 $sessionStorage.action = {
                                   message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                                   success: false,
                                   failure : true,
                                   network: false
                                };
                         $route.reload();
                     }
            });
            };

             $scope.close_alerts = function () {
                            $sessionStorage.action={
                            message: '',
                           success: false,
                           failure : false,
                           network: false
                            }
            }
}]);

/***********************************************************************************************************************************/
//pending qc
app.controller('pending_qc_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$route','$filter','updateStatus_factory',function ($scope,$rootScope,$sessionStorage,$http,$timeout,$route,$filter,updateStatus_factory) {
 $rootScope.logged_in = $sessionStorage.logged_in;
 $rootScope.form_data = $sessionStorage.form_data;
 $scope.action = $sessionStorage.action;
             $scope.sortType = 'StatusDate';
                $scope.sortReverse = false;
                $scope.found = true;  //for the spinner

                $scope.setSelected = function(selected){

                    $scope.selected = $scope.details.indexOf(selected);
                };
    var updateView = function () {


        var input = {status: 'pending_tprs'};
       updateStatus_factory.getStatus(input).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available

               $scope.details = $filter('views_filter')(response.data,$scope.form_data);
               $scope.found = false;
                if ($scope.details.length === 0){
                                $scope.empty = true;
                            }
                $timeout(updateView,300000)

        }, function () {
             $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
        });
    };
    updateView();


     $scope.call_images = function(){
                $scope.images = [];
                 $scope.picture= true;
                $scope.selfie = 'Loading Selfie...';
                $scope.passport = 'Loading Passport...';

      var input = {id: $scope.details[$scope.selected].Id};
      updateStatus_factory.getImages(input).then(function (response) {
           // this callback will be called asynchronously
           // when the response is available
           $scope.images = response.data;
                $scope.picture = false;
                $scope.passport = 'No Passport Image';
                $scope.selfie = 'No Selfie Image';

       });
  };


    //error_codes
    var error_codes =   function () {

        var input = {Id: 0};
        updateStatus_factory.getError(input).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.error_codes = response.data;
        }, function () {
             $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
        });
    };
    error_codes();
//approve
            var approve=function () {
                var input = {id:$scope.details[$scope.selected].Id,status: 'pending_epay',username:$rootScope.logged_in.user };
              updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    if (response.data === true){
                         $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Successfully Approved',
                           success: true,
                           failure : false,
                           network: false
                        };
                        $route.reload();
                    }
                    else{
                        $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Approval Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                        $route.reload();
                    }

                },function(){
                    $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
              });

            };
//reject
            var reject = function(){

                var input = {id:$scope.details[$scope.selected].Id,status: 'tprs_rejected',username:$rootScope.logged_in.user};
             updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                     if (response.data === true){
                        $scope.rej = response.data;

                    }
                    else{
                         $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                    }
                },function(){
                    $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
              });

                                            //add error_code
                var rejected = {id:$scope.details[$scope.selected].Id,error_Code:$scope.selected_error};
               updateStatus_factory.setError(rejected).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                     if (response.data === true){
                        $scope.rej2 = response.data;

                    }
                    else {
                         $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                     }
                },function(){
                      $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
                });

                if ($scope.rej === $scope.rej2){
                    $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Successfully Rejected',
                           success: true,
                           failure : false,
                           network: false
                        };
                         $route.reload();
                }else{

                        $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                        $route.reload();
                }

            };
             $scope.close_alerts = function () {
                            $sessionStorage.action={
                            message: '',
                           success: false,
                           failure : false,
                           network: false
                            }
            };





$scope.approve = function(){

     var input = {
        id: $scope.details[$scope.selected].Id
    };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                if ($scope.id_status === 'cancelled'){
                $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
    }
     else if($scope.id_status === 'pending_tprs'){
                approve();
                }
    else {
             $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
        }
});
};


//$scope.reject()
$scope.reject = function () {
    var input = {
        id: $scope.details[$scope.selected].Id
    };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                    if ($scope.id_status === 'cancelled') {
                         $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
    }
    else if($scope.id_status === 'pending_tprs'){
                reject();
                }
    else {
             $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at'+$scope.id_status,
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
        }
    })
};


}]);

/****************************************************************************************************************************************/
//rejected tprs
app.controller('rejected_deals_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$route','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$route,$filter,updateStatus_factory) {
 $rootScope.logged_in = $sessionStorage.logged_in;
 $rootScope.form_data = $sessionStorage.form_data;

 $scope.action = $sessionStorage.action;
            $scope.sortType = 'StatusDate';
                $scope.sortReverse = false;
                $scope.found = true;  //for the spinner

  $scope.setSelected = function(selected){
             $scope.selected = $scope.details.indexOf(selected);
          };

            var  input = {status : 'tprs_rejected'};

            updateStatus_factory.getStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                            $scope.details = $filter('views_filter')(response.data,$rootScope.form_data);
                             if ($scope.details.length === 0){
                                $scope.empty = true;
                            }
                            $scope.found = false;

                },function(){
                    $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
              });

 $scope.call_images = function(){
                $scope.images = [];
                $scope.picture= true;
                $scope.selfie = 'Loading Selfie...';
                $scope.passport = 'Loading Passport...';
      var input = {id: $scope.details[$scope.selected].Id};
      updateStatus_factory.getImages(input).then(function (response) {
           // this callback will be called asynchronously
           // when the response is available
           $scope.images = response.data;
           $scope.picture = false;
            $scope.passport = 'No Passport Image';
            $scope.selfie = 'No Selfie Image';
       });
  };

//recall
            var recall = function () {
                 var input = {id:$scope.details[$scope.selected].Id,status: 'pending_tprs',username:$rootScope.logged_in.user};
                 updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    if (response.data === true){
                        $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Sucessfully Recalled',
                           success: true,
                           failure : false,
                           network: false
                        };
                         $route.reload();

                    }
                    else{
                        $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Recall Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                         $route.reload();

                    }

                },function(){
                    $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
              });

            };

             $scope.recall = function () {
                 var input = {
                    id: $scope.details[$scope.selected].Id
                };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                if ($scope.id_status === 'cancelled'){
                $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
                }
               else if($scope.id_status === 'tprs_rejected'){
                recall();
                }
                else {
                         $sessionStorage.action = {
                                           message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                                           success: false,
                                           failure : true,
                                           network: false
                                        };
                                 $route.reload();
                    }
            });
            };

             $scope.close_alerts = function () {
                            $sessionStorage.action={
                            message: '',
                           success: false,
                           failure : false,
                           network: false
                            }
            }
}]);

//pending_epay
/************************************************************************************************************************************/
app.controller('pending_payments_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$route','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$route,$filter,updateStatus_factory) {
                 $rootScope.logged_in = $sessionStorage.logged_in;
                 $scope.action = $sessionStorage.action;
                 $rootScope.form_data = $sessionStorage.form_data;

               $scope.sortType = 'StatusDate';
                $scope.sortReverse = false;
                $scope.found = true;  //for the spinner

        $scope.setSelected = function(selected){
                    $scope.selected = $scope.details.indexOf(selected);
                  };

var updateView = function () {
    var input = {status: 'pending_epay'};
    updateStatus_factory.getStatus(input).then(function (response) {
        // this callback will be called asynchronously
        // when the response is available

                           $scope.details = $filter('views_filter')(response.data,$scope.form_data);
                           $scope.gcb_details = $filter('filter')($scope.details,{PaymentMethod: 'GCB'});
                           $scope.tigo_details = $filter('filter')($scope.details,{PaymentMethod: 'Tigo Cash'});
                           $scope.gn_details = $filter('filter')($scope.details,{PaymentMethod: 'GN Bank'});
                           $scope.mtn_details = $filter('filter')($scope.details,{PaymentMethod: 'MTN Mobile Money'});

                            if ($scope.details.length === 0){
                                $scope.empty = true;
                            }
                            $scope.found = false;

                       //}
        $timeout(updateView,300000);
        //console.log($scope.details);

    });
};
//run function
updateView();

 $scope.call_images = function(){
     $scope.images = [];
     $scope.picture = true;
     $scope.selfie = 'Loading...';
     $scope.passport = 'Loading...';
      var input = {id: $scope.details[$scope.selected].Id};

       updateStatus_factory.getImages(input).then(function (response) {
           // this callback will be called asynchronously
           // when the response is available
           $scope.images = response.data;
           $scope.picture = false;
           $scope.passport = 'No Passport Image';
           $scope.selfie = 'No Selfie Image'
       });
  };

var error_codes =   function () {

        var input = {Id: 1};
        updateStatus_factory.getError(input).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.error_codes = response.data;
        }, function () {
            $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
        });
    };
    error_codes();


                //reject function

                 var reject = function(){
                var input = {id:$scope.details[$scope.selected].Id,status:'epay_rejected',username:$rootScope.logged_in.user};
             updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                     if (response.data === true){
                        $scope.rej = response.data;

                    }
                    else{
                         $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                    }
                },function(){
                    $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
              });

              //add error_code
                 var rejected = {id:$scope.details[$scope.selected].Id,error_code:$scope.selected_error};
               updateStatus_factory.setError(rejected).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                     if (response.data === true){
                        $scope.rej2 = response.data;

                    }
                    else {
                         $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                     }
                },function(){
                    $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
                });

                if ($scope.rej === $scope.rej2){
                    $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Successfully Rejected',
                           success: true,
                           failure : false,
                           network: false
                        };
                     $route.reload();

                }else{
                    $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                     $route.reload();

                }

            };

        //approve
                 var approve = function () {
                   var input = {id:$scope.details[$scope.selected].Id,status: 'paid',username:$rootScope.logged_in.user };
              updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                   if (response.data === true){
                       $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Successfully Approved',
                           success: true,
                           failure : false,
                           network: false
                        };
                        $route.reload();

                    }
                    else{
                       $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Approval Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                        $route.reload();
                    }


                },function(){
                    $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Recall Failed',
                           success: false,
                           failure : false,
                           network: true
                        };
              });

                 };

                  $scope.close_alerts = function () {
                            $sessionStorage.action={
                            message: '',
                           success: false,
                           failure : false,
                           network: false
                            }
            };





$scope.approve = function(){

     var input = {
        id: $scope.details[$scope.selected].Id
    };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                if ($scope.id_status === 'cancelled'){
                $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
    }
    else if($scope.id_status === 'pending_epay'){
                approve();
                }
    else {
             $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
        }
});
};


//$scope.reject()
$scope.reject = function () {
    var input = {
        id: $scope.details[$scope.selected].Id
    };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                    if ($scope.id_status === 'cancelled') {
                         $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
    }
   else if($scope.id_status === 'pending_epay'){
                reject();
                }
    else {
             $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
        }
    })
};
}]);

//paid deals
app.controller('paid_deals_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$filter,updateStatus_factory) {

      $rootScope.logged_in = $sessionStorage.logged_in;
      $rootScope.form_data = $sessionStorage.form_data;
      $scope.today = new Date();
      $scope.sortType = 'StatusDate';
      $scope.sortReverse = false;


    $scope.setSelected = function(selected){
    $scope.selected = $scope.details.indexOf(selected);
  };
       $scope.submit = function(){
                $scope.found = true;  //for the spinner
                var start_day = new Date($scope.start_date).getDate();
                var start_month = new Date($scope.start_date).getMonth() + 1;
                var start_year = new Date($scope.start_date).getFullYear();
                var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
                var end_day = new Date($scope.end_date).getDate() + 1;
                var end_month = new Date($scope.end_date).getMonth() + 1;
                var end_year = new Date($scope.end_date).getFullYear();
                var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();

                var input = {status: 'paid',datefrom: start_full_year,dateto: end_full_year};
                $http({
                    method: 'POST',//or POST
                    url: 'http://52.91.63.84/FilmsWeb/api/web/getstatusbydate',
                    params: input,
                    headers: {'Content-Type': 'application/json',
                               'Accept': 'application/json'
                    }
                }).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available


                            $scope.details = $filter('views_filter')(response.data,$scope.form_data);
                            console.log($scope.details);
                            //
                             if ($scope.details.length === 0){
                                $scope.empty = true;
                            }
                            $scope.found = false;


                });
};

       $scope.call_images = function(){
     $scope.images = [];
     $scope.picture = true;
     $scope.selfie = 'Loading...';
     $scope.passport = 'Loading...';
      var input = {id: $scope.details[$scope.selected].Id};
       $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/getimages',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
           // this callback will be called asynchronously
           // when the response is available
           $scope.images = response.data;
           $scope.picture = false;
           $scope.passport = 'No Passport Image';
           $scope.selfie = 'No Selfie Image'
       });
  };

         $scope.close_alerts = function () {
                            $sessionStorage.action={
                            message: '',
                           success: false,
                           failure : false,
                           network: false
                            }
            }



}]);
/******************************************************************************************************************************************/
//rejected payments
app.controller('rejected_payments_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$route','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$route,$filter,updateStatus_factory) {

      $rootScope.logged_in = $sessionStorage.logged_in;
      $rootScope.form_data = $sessionStorage.form_data;
      $scope.action = $sessionStorage.action;
     $scope.sortType = 'StatusDate';
     $scope.sortReverse = false;
     $scope.found = true;  //for the spinner

    $scope.setSelected = function(selected){
     $scope.selected = $scope.details.indexOf(selected);
  };

var updateView = function () {

    var input = {status: 'epay_rejected'};
    updateStatus_factory.getStatus(input).then(function (response) {
        // this callback will be called asynchronously
        // when the response is available

            $scope.details = $filter('views_filter')(response.data,$scope.form_data);
             if ($scope.details.length === 0){
                                $scope.empty = true;
                            }
                            $scope.found = false;

        $timeout(updateView,300000);

    }, function () {
        $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };
    });
};

updateView();


 $scope.call_images = function(){
                $scope.images = [];
                $scope.picture= true;
                $scope.selfie = 'Loading Selfie...';
                $scope.passport = 'Loading Passport...';
      var input = {id: $scope.details[$scope.selected].Id};

       updateStatus_factory.getImages(input).then(function (response) {
           // this callback will be called asynchronously
           // when the response is available
           $scope.images = response.data;
           $scope.picture = false;
            $scope.passport = 'No Passport Image';
            $scope.selfie = 'No Selfie Image';
       });
  };

    var recall = function () {
         var input = {id:$scope.details[$scope.selected].Id,status:'pending_epay',username:$rootScope.logged_in.user};
             updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                   if (response.data === true){
                       $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+' Successfully Recalled',
                           success: true,
                           failure : false,
                           network: false
                        };
                        $route.reload();
                    }
                    else{
                       $sessionStorage.action = {
                           message: $scope.details[$scope.selected].ClientRefId+'  Recall Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                        $route.reload();
                    }
                   //reload the route

                },function(){
                    $sessionStorage.action = {
                           message: '',
                           success: false,
                           failure : false,
                           network: true
                        };

              });
    };

     $scope.recall = function () {
                 var input = {
                    id: $scope.details[$scope.selected].Id
                };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                if ($scope.id_status === 'cancelled'){
                $sessionStorage.action = {
                               message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                               success: false,
                               failure : true,
                               network: false
                            };
                     $route.reload();
                }
                else if($scope.id_status === 'epay_rejected'){
                recall();
                }
            else {
                     $sessionStorage.action = {
                                       message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                                       success: false,
                                       failure : true,
                                       network: false
                                    };
                             $route.reload();
                }
            });
            };

     $scope.close_alerts = function () {
                            $sessionStorage.action={
                            message: '',
                           success: false,
                           failure : false,
                           network: false
                            }
            }
}]);

/**********************************************************************************************************************************/
//statistics
app.controller('statistics_Ctrl',['$scope','$http','$rootScope','$sessionStorage','$filter',function ($scope,$http,$rootScope,$sessionStorage,$filter) {
     $rootScope.logged_in = $sessionStorage.logged_in;
     $rootScope.form_data = $sessionStorage.form_data;
     $rootScope.branches = $sessionStorage.branches;
     $rootScope.paymentMethod = $sessionStorage.paymentMethod;
    $scope.today= new Date();

     $scope.labels = ['KYC', 'TPRS', 'E-PAY'];
  $scope.series = ['Approved', 'Rejected'];

  var quotes = function () {
      $http({
           method: 'GET',//or POST
                    url: 'http://quotes.rest/qod',
                    headers: {'Content-Type': 'application/json',
                               'Accept': 'application/json'
                    }
            }).then(function (response) {
              $scope.quote = response.data.contents.quotes[0];

          });
  };
  quotes();


  $scope.submit = function () {
      $scope.found = true;  //for the spinner
      var start_day = new Date($scope.start_date).getDate();
    var start_month = new Date($scope.start_date).getMonth() + 1;
    var start_year = new Date($scope.start_date).getFullYear();
    var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
    var end_day = new Date($scope.end_date).getDate() +1;
    var end_month = new Date($scope.end_date).getMonth() + 1;
    var end_year = new Date($scope.end_date).getFullYear();
    var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();

      var input = {userId: $rootScope.logged_in.user_id, datefrom: start_full_year, dateto: end_full_year};
      $http({
           method: 'GET',//or POST
                    url: 'http://52.91.63.84/FilmsWeb/api/web/getqcrequests',
                    params:input,
                    headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                    }

            }).then(function (response) {
             $scope.details = response.data;
             if ($scope.details.length === 0){
                                $scope.empty = true;
                            }
                            $scope.found = false;


            $scope.pending_tprs =($filter('filter')($scope.details,{TransactionStatus:'pending_tprs'})).length;
            $scope.kyc_rejected =($filter('filter')($scope.details,{TransactionStatus:'kyc_rejected'})).length;
            $scope.pending_epay =($filter('filter')($scope.details,{TransactionStatus:'pending_epay'})).length;
            $scope.epay_rejected =($filter('filter')($scope.details,{TransactionStatus:'epay_rejected'})).length;
            $scope.paid =($filter('filter')($scope.details,{TransactionStatus:'paid'})).length;
            $scope.kyc_pending =($filter('filter')($scope.details,{TransactionStatus:'kyc_pending'})).length;

            $scope.tprs_rejected =($filter('filter')($scope.details,{TransactionStatus:'tprs_rejected'})).length;
            $scope.labels = ['KYC','TPRS','EPAY'];
            $scope.series = ['Approved','Rejected'];


            $scope.data = [[$scope.kyc_pending,$scope.pending_tprs,$scope.pending_epay],[$scope.kyc_rejected,$scope.tprs_rejected,$scope.epay_rejected]];
          });
  };
  
  $scope.change_password = function () {
      var input = {userid: $rootScope.logged_in.user_id, oldpass: $scope.old_password, newpass: $scope.new_password};
      $http({
           method: 'GET',//or POST
                    url: 'http://52.91.63.84/FilmsWeb/api/web/changepassword',
                    params:input,
                    headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                    }

            }).then(function (response) {
          if (response.data === 'true'){
              $scope.change_success = true;
          }
          else{
              $scope.change_failed = true;
          }

      });
  }
}]);
/**********************************************************************************************************************************/
//cancelled requests
app.controller('cancelled_requests_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$filter,updateStatus_factory) {

      $rootScope.logged_in = $sessionStorage.logged_in;
      $rootScope.form_data = $sessionStorage.form_data;

      $scope.sortType = 'StatusDate';
      $scope.sortReverse = false;
      $scope.found = true;  //for the spinner

    $scope.setSelected = function(selected){
     $scope.selected = $scope.details.indexOf(selected);
  };
        var updateView = function () {


                var input = {status: 'cancelled'};
                updateStatus_factory.getStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                            $scope.details = $filter('views_filter')(response.data,$scope.form_data);
                             if ($scope.details.length === 0){
                                $scope.empty = true;
                            }
                            $scope.found = false;

                    $timeout(updateView,300000)
                });
};
        updateView();


 $scope.close_alerts = function () {
                            $sessionStorage.action={
                            message: '',
                           success: false,
                           failure : false,
                           network: false
                            }
            }

}]);

/**********************************************************************************************************************************/
//logout
app.controller('logout_Ctrl',['$location','$sessionStorage',function ($location,$sessionStorage) {

                $sessionStorage.logged_in.showMenu = false;
                if ($sessionStorage.form_data !== undefined){
                     $sessionStorage.form_data.filtered = false;
                }

                $sessionStorage.$reset();

                $location.path('/login');

}]);

//app filters
app.filter('views_filter', function () {
    return function (inputs, checkbox_data) {
        var out = [];
        var out2 = [];
        //do filter here
        angular.forEach(inputs, function(input){
           if(input.PaymentMethod === checkbox_data.mtn || input.PaymentMethod === checkbox_data.tigo || input.PaymentMethod === checkbox_data.vodafone
           || input.PaymentMethod === checkbox_data.gn || input.PaymentMethod === checkbox_data.cheque || input.PaymentMethod=== checkbox_data.gcb || input.PaymentMethod===checkbox_data.ghipss){
               out.push(input)
           }

        });

        angular.forEach(out, function (input) {
            if(input.Branch === checkbox_data.ho || input.Branch === checkbox_data.akatsi || input.Branch === checkbox_data.wa || input.Branch === checkbox_data.accra
            || input.Branch === checkbox_data.kumasi || input.Branch === checkbox_data.koforidua || input.Branch === checkbox_data.sunyani || input.Branch === checkbox_data.bolgatanga
            || input.Branch === checkbox_data.takoradi || input.Branch === checkbox_data.capecoast){
                out2.push(input)
            }
        });
    return out2;
    };

});
app.filter('role_filter',function(){
    return function(inputs){
        var output;
        if (inputs ===1){
            return output= 'QC'
        }
        else if(inputs ===2){
            return output = 'TL'
        }
        else if(inputs ===3){
            return output = 'DP'
        }
        else if(inputs ===4){
            return output = 'KYC'
        }
        else if(inputs ===5){
            return output ='ADMIN'
        }
        else if(inputs ===6){
            return output = 'EPAY'
        }
         else if(inputs ===7){
            return output = 'SM'
        }
         else if(inputs ===8){
            return output = 'ASM'
        }
        return output;
    }
});
app.filter('status_filter',function () {
    return function (inputs) {
        var output;
        if (inputs === 'pending_kyc'){
            return output= 'Pending KYC'
        }
        else  if (inputs === 'pending_tprs'){
            return output= 'Pending TPRS'
        }
        else  if (inputs === 'pending_epay'){
            return output= 'E-Pay Validation'
        }
         else  if (inputs === 'kyc_rejected'){
            return output= 'Rejected At KYC'
        }
         else  if (inputs === 'epay_rejected'){
            return output= 'Rejected At E-Pay'
        }
         else  if (inputs === 'tprs_rejected'){
            return output= 'Rejected At TPRS'
        }
         else  if (inputs === 'paid'){
            return output= 'Paid'
        }
         else  if (inputs === 'cancelled'){
            return output= 'Cancelled By TL'
        }
    }
});



//factories and services
app.factory('updateStatus_factory',['$http', function($http){
    var updateStatus_factory = {};
    updateStatus_factory.updateStatus = function(input) {
        return $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/updatestatus',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    };
     updateStatus_factory.getStatus = function(input) {
         return $http({
        method: 'POST',//or POST
        url: 'http://52.91.63.84/FilmsWeb/api/web/getstatus',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
     };

     updateStatus_factory.getImages = function (input) {
         return  $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/getimages',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
     };

     updateStatus_factory.getError = function (input){
         return  $http({
            method: 'POST',//or POST
            url: 'http://52.91.63.84/FilmsWeb/api/web/geterrors',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
     };

     updateStatus_factory.setError = function (rejected) {
         return $http({
                     method: 'POST',//or POST
                    url: 'http://52.91.63.84/FilmsWeb/api/web/seterrorcode',
                    params: rejected,
                    headers: {'Content-Type': 'application/json',
                               'Accept': 'application/json'
                    }
                })
     };

     updateStatus_factory.getLoan = function(input){
         return $http({
                method: 'GET',//or POST
                url: 'http://52.91.63.84/FilmsWeb/api/web/getloanrequest',
                params: input,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
     };

    return updateStatus_factory;

}]);

//other functions
  function w3_open() {

  document.getElementById("mySidebar").style.width = "15%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
  document.getElementById("closeNav").style.display = 'inline-block'



}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  document.getElementById("closeNav").style.display = 'none'

}


