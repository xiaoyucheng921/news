angular.module("myApp", ['ionic'])
    .controller('myCtr', ["$scope", '$http', '$ionicActionSheet', '$ionicModal','$ionicPopup', function ($scope, $http, $ionicActionSheet, $ionicModal,$ionicPopup) {
        $http.get('data/list.json')
            .success(function (data) {
                $scope.list = data;
            })
        $http.get('data/x.json')
            .success(function (data) {
                $scope.video = data;
            })
        //返回
        $scope.back = function () {
            window.history.back();
        };
        // 退出
        $scope.quit= function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '退出登录',
            template: '<span style="color: #ff3b30; margin-left:20%"> 你确定要退出么?</span>',
            scope: $scope,
            buttons: [
                { text: '取消' },
                { text: "退出"},
            ]
        })};


        //模态框
        $ionicModal.fromTemplateUrl('view/template/new-task.html', function (modal) {
            $scope.taskModal = modal
        }, {
            scope: $scope,
            animation: 'slide-in-up',
        });
        $scope.nawTask = function () {
            $scope.taskModal.show();
        };
        $scope.closeTask = function () {
            $scope.taskModal.hide();
        }
        //下拉刷新
        $scope.refresh = function () {
            $http.get('data/list.json')
                .success(function (data) {
                    var x = Math.round(Math.random() * 2 + 1);
                    console.log(x);
                    for (i = 0; i < x; i++) {
                        //$scope.list.unshift([data[i]]);
                        $scope.list.unshift({
                            img: data[i].img,
                            title: data[i].title,
                            content: data[i].content
                        })
                        $scope.$broadcast("scroll.refreshComplete");
                    }
                })
        };
        $scope.show = function () {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: 'QQ'},
                    {text: '微信'},
                    {text: '人人网'},
                    {text: '微博'}
                ],
                titleText: "分享到",
                destructiveText: '',
                cancelText: '取消',
                destructiveButtonClicked: function () {
                    console.log("警告")
                },
                cancel: function () {
                    console.log("取消")
                },
                buttonClicked: function (index) {
                    if (index == 0) {
                        alert("1")
                    }
                    if (index == 1) {
                        alert("2")
                    }
                    return true;
                },
            })

        }
    }])
    .config(['$stateProvider', '$urlRouterProvider',"$ionicConfigProvider",
        function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

            //Modify the tabs of android display position! start
            $ionicConfigProvider.platform.ios.tabs.style('standard');
            $ionicConfigProvider.platform.ios.tabs.position('bottom');
            $ionicConfigProvider.platform.android.tabs.style('standard');
            $ionicConfigProvider.platform.android.tabs.position('standard');

            $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
            $ionicConfigProvider.platform.android.navBar.alignTitle('center');

            $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
            $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

            $ionicConfigProvider.platform.ios.views.transition('ios');
            $ionicConfigProvider.platform.android.views.transition('android');
            //Modify the tabs of android display position! end



            $urlRouterProvider.when('', '/main');
            $stateProvider
                .state('main', {
                    url: '/main',
                    templateUrl: 'view/main.html',
                })
                .state('me', {
                    url: '/me',
                    templateUrl: 'view/me.html',
                })
                .state('video', {
                    url: '/video',
                    templateUrl: 'view/video.html',
                })
                .state("subscibe", {
                    url: '/subscibe',
                    templateUrl: "view/subscibe.html"
                })
        }])
    .directive('appFooter', function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'view/template/footerBar.html'
        };
    })
    .directive("appHead", function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'view/template/appHeader.html'
        }
    })
    .directive("appContent", function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'view/template/appContent.html'
        }
    })
    .directive("appSide", function () {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'view/template/appSide.html'
        }
    })
