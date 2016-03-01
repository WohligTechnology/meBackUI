var uploadres = [];
var selectedData = [];
var abc = {};
var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngDialog', 'angularFileUpload', 'ui.select', 'ngSanitize']);
// window.uploadUrl = 'http://104.197.23.70/user/uploadfile';
//window.uploadUrl = 'http://192.168.2.22:1337/user/uploadfile';
window.uploadUrl = 'http://localhost:1337/user/uploadfile';
phonecatControllers.controller('home', function ($scope, TemplateService, NavigationService, $routeParams, $location) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = "";
    TemplateService.content = "views/dashboard.html";
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    NavigationService.countUser(function (data, status) {
        $scope.user = data;
    });
});
phonecatControllers.controller('login', function ($scope, TemplateService, NavigationService, $routeParams, $location) {
    $scope.template = TemplateService;
    TemplateService.content = "views/login.html";
    TemplateService.list = 3;

    $scope.navigation = NavigationService.getnav();
    $.jStorage.flush();
    $scope.isValidLogin = 1;
    $scope.login = {};
    $scope.verifylogin = function () {
        console.log($scope.login);
        if ($scope.login.email && $scope.login.password) {
            NavigationService.adminLogin($scope.login, function (data, status) {
                if (data.value == "false") {
                    $scope.isValidLogin = 0;
                } else {
                    $scope.isValidLogin = 1;
                    $.jStorage.set("adminuser", data);
                    $location.url("/home");
                }
            })
        } else {
            console.log("blank login");
            $scope.isValidLogin = 0;
        }

    }
});
phonecatControllers.controller('headerctrl', function ($scope, TemplateService, $location, $routeParams, NavigationService) {
    $scope.template = TemplateService;
    //  if (!$.jStorage.get("adminuser")) {
    //    $location.url("/login");
    //
    //  }
});

phonecatControllers.controller('createorder', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Orders");
    TemplateService.title = $scope.menutitle;
    TemplateService.list = 2;
    TemplateService.content = "views/createorder.html";
    $scope.navigation = NavigationService.getnav();
    console.log($routeParams.id);

    $scope.order = {};

    $scope.submitForm = function () {
        console.log($scope.order);
        NavigationService.saveOrder($scope.order, function (data, status) {
            console.log(data);
            $location.url("/order");
        });
    };

    $scope.order.tag = [];
    $scope.ismatch = function (data, select) {
        abc.select = select;
        _.each(data, function (n, key) {
            if (typeof n == 'string') {
                var item = {
                    _id: _.now(),
                    name: _.capitalize(n),
                    category: $scope.artwork.type
                };
                NavigationService.saveTag(item, function (data, status) {
                    if (data.value == true) {
                        item._id = data.id;
                    }
                });
                select.selected = _.without(select.selected, n);
                select.selected.push(item);
                $scope.order.tag = select.selected;
            }
        });
        console.log($scope.artwork.tag);
    }

    $scope.refreshOrder = function (search) {
        $scope.tag = [];
        if (search) {
            NavigationService.findArtMedium(search, $scope.order.tag, function (data, status) {
                $scope.tag = data;
            });
        }
    };

    $scope.GalleryStructure = [{
        "name": "name",
        "type": "text",
        "validation": [
            "required",
            "minlength",
            "min=5"
        ]
    }, {
        "name": "image",
        "type": "image"
    }, {
        "name": "name",
        "type": "text",
        "validation": [
            "required",
            "minlength",
            "min=5"
        ]
    }];

    $scope.persons = [{
        "id": 1,
        "name": "first option"
    }, {
        "id": 2,
        "name": "first option"
    }, {
        "id": 3,
        "name": "first option"
    }, {
        "id": 4,
        "name": "first option"
    }, {
        "id": 5,
        "name": "first option"
    }];

    NavigationService.getUser(function (data, status) {
        $scope.persons = data;
    });

});

//User Controller
phonecatControllers.controller('UserCtrl',
    function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
        $scope.template = TemplateService;
        $scope.menutitle = NavigationService.makeactive('User');
        TemplateService.title = $scope.menutitle;
        TemplateService.submenu = '';
        TemplateService.content = 'views/user.html';
        TemplateService.list = 2;
        $scope.navigation = NavigationService.getnav();
        $scope.User = [];
        $scope.pagedata = {};
        $scope.pagedata.page = 1;
        $scope.pagedata.limit = '20';
        $scope.pagedata.search = '';
        $scope.number = 100;
        $scope.reload = function (pagedata) {
            $scope.pagedata = pagedata;
            NavigationService.findLimitedUser($scope.pagedata, function (data, status) {
                $scope.user = data;
                $scope.pages = [];
                var newclass = '';
                for (var i = 1; i <= data.totalpages; i++) {
                    if (pagedata.page == i) {
                        newclass = 'active';
                    } else {
                        newclass = '';
                    }
                    $scope.pages.push({
                        pageno: i,
                        class: newclass
                    });
                }
            });
        }
        $scope.reload($scope.pagedata);
        $scope.confDelete = function () {
            NavigationService.deleteUser(function (data, status) {
                ngDialog.close();
                window.location.reload();
            });
        }
        $scope.deletefun = function (id) {
                $.jStorage.set('deleteuser', id);
                ngDialog.open({
                    template: 'views/delete.html',
                    closeByEscape: false,
                    controller: 'UserCtrl',
                    closeByDocument: false
                });
            }
            //End User
    });
//user Controller
//createUser Controller
phonecatControllers.controller('createUserCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('User');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/createuser.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.user = {};
    $scope.submitForm = function () {
        NavigationService.saveUser($scope.user, function (data, status) {
            $location.url('/user');
        });
    };
    $scope.user.job = [];
    $scope.ismatchJob = function (data, select) {
        _.each(data, function (l, key) {
            if (typeof l == 'string') {
                var item = {
                    _id: _.now(),
                    name: _.capitalize(l)
                };
                NavigationService.saveJob(item, function (data, status) {
                    if (data.value == true) {
                        item._id = data.id;
                    }
                });
                select.selected = _.without(select.selected, l);
                select.selected.push(item);
                $scope.user.job = select.selected;
            }
        });
    }
    $scope.refreshJob = function (search) {
        $scope.job = [];
        if (search) {
            NavigationService.findJob(search, $scope.user.job, function (data, status) {
                if (data.value != false) {
                    $scope.job = data;
                }
            });
        }
    };
    //createUser
});
//createUser Controller
//editUser Controller
phonecatControllers.controller('editUserCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('User');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/edituser.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.user = {};
    NavigationService.getOneUser($routeParams.id, function (data, status) {
        $scope.user = data; //Add More Array
    });
    $scope.submitForm = function () {
        $scope.user._id = $routeParams.id;
        NavigationService.saveUser($scope.user, function (data, status) {
            $location.url('/user');
        });
    };
    $scope.user.job = [];
    $scope.ismatchJob = function (data, select) {
        _.each(data, function (l, key) {
            if (typeof l == 'string') {
                var item = {
                    _id: _.now(),
                    name: _.capitalize(l)
                };
                NavigationService.saveJob(item, function (data, status) {
                    if (data.value == true) {
                        item._id = data.id;
                    }
                });
                select.selected = _.without(select.selected, l);
                select.selected.push(item);
                $scope.user.job = select.selected;
            }
        });
    }
    $scope.refreshJob = function (search) {
        $scope.job = [];
        if (search) {
            NavigationService.findJob(search, $scope.user.job, function (data, status) {
                if (data.value != false) {
                    $scope.job = data;
                }
            });
        }
    };
    //editUser
});
//editUser Controller
//Job Controller
phonecatControllers.controller('JobCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Job');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/job.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.Job = [];
    $scope.pagedata = {};
    $scope.pagedata.page = 1;
    $scope.pagedata.limit = '20';
    $scope.pagedata.search = '';
    $scope.number = 100;
    $scope.reload = function (pagedata) {
        $scope.pagedata = pagedata;
        NavigationService.findLimitedJob($scope.pagedata, function (data, status) {
            $scope.job = data;
            $scope.pages = [];
            var newclass = '';
            for (var i = 1; i <= data.totalpages; i++) {
                if (pagedata.page == i) {
                    newclass = 'active';
                } else {
                    newclass = '';
                }
                $scope.pages.push({
                    pageno: i,
                    class: newclass
                });
            }
        });
    }
    $scope.reload($scope.pagedata);
    $scope.confDelete = function () {
        NavigationService.deleteJob(function (data, status) {
            ngDialog.close();
            window.location.reload();
        });
    }
    $scope.deletefun = function (id) {
            $.jStorage.set('deletejob', id);
            ngDialog.open({
                template: 'views/delete.html',
                closeByEscape: false,
                controller: 'JobCtrl',
                closeByDocument: false
            });
        }
        //End Job
});
//job Controller
//createJob Controller
phonecatControllers.controller('createJobCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Job');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/createjob.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.job = {};
    $scope.submitForm = function () {
        NavigationService.saveJob($scope.job, function (data, status) {
            $location.url('/job');
        });
    };
    $scope.job.user = [];
    $scope.ismatchUser = function (data, select) {
        _.each(data, function (l, key) {
            if (typeof l == 'string') {
                var item = {
                    _id: _.now(),
                    name: _.capitalize(l)
                };
                NavigationService.saveUser(item, function (data, status) {
                    if (data.value == true) {
                        item._id = data.id;
                    }
                });
                select.selected = _.without(select.selected, l);
                select.selected.push(item);
                $scope.job.user = select.selected;
            }
        });
    }
    $scope.refreshUser = function (search) {
        $scope.user = [];
        if (search) {
            NavigationService.findUser(search, $scope.job.user, function (data, status) {
                if (data.value != false) {
                    $scope.user = data;
                }
            });
        }
    };
    NavigationService.getUser(function (data, status) {
        $scope.usercreator = data;
    });
    NavigationService.getUser(function (data, status) {
        $scope.userassigned = data;
    });
    //createJob
});
//createJob Controller
//editJob Controller
phonecatControllers.controller('editJobCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Job');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/editjob.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.job = {};
    NavigationService.getOneJob($routeParams.id, function (data, status) {
        $scope.job = data; //Add More Array
    });
    $scope.submitForm = function () {
        $scope.job._id = $routeParams.id;
        NavigationService.saveJob($scope.job, function (data, status) {
            $location.url('/job');
        });
    };
    $scope.job.user = [];
    $scope.ismatchUser = function (data, select) {
        _.each(data, function (l, key) {
            if (typeof l == 'string') {
                var item = {
                    _id: _.now(),
                    name: _.capitalize(l)
                };
                NavigationService.saveUser(item, function (data, status) {
                    if (data.value == true) {
                        item._id = data.id;
                    }
                });
                select.selected = _.without(select.selected, l);
                select.selected.push(item);
                $scope.job.user = select.selected;
            }
        });
    }
    $scope.refreshUser = function (search) {
        $scope.user = [];
        if (search) {
            NavigationService.findUser(search, $scope.job.user, function (data, status) {
                if (data.value != false) {
                    $scope.user = data;
                }
            });
        }
    };
    NavigationService.getUser(function (data, status) {
        $scope.usercreator = data;
    });
    NavigationService.getUser(function (data, status) {
        $scope.userassigned = data;
    });
    //editJob
});
//editJob Controller
//Category Controller
phonecatControllers.controller('CategoryCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Category');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/category.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.Category = [];
    $scope.pagedata = {};
    $scope.pagedata.page = 1;
    $scope.pagedata.limit = '20';
    $scope.pagedata.search = '';
    $scope.number = 100;
    $scope.reload = function (pagedata) {
        $scope.pagedata = pagedata;
        NavigationService.findLimitedCategory($scope.pagedata, function (data, status) {
            $scope.category = data;
            $scope.pages = [];
            var newclass = '';
            for (var i = 1; i <= data.totalpages; i++) {
                if (pagedata.page == i) {
                    newclass = 'active';
                } else {
                    newclass = '';
                }
                $scope.pages.push({
                    pageno: i,
                    class: newclass
                });
            }
        });
    }
    $scope.reload($scope.pagedata);
    $scope.confDelete = function () {
        NavigationService.deleteCategory(function (data, status) {
            ngDialog.close();
            window.location.reload();
        });
    }
    $scope.deletefun = function (id) {
            $.jStorage.set('deletecategory', id);
            ngDialog.open({
                template: 'views/delete.html',
                closeByEscape: false,
                controller: 'CategoryCtrl',
                closeByDocument: false
            });
        }
        //End Category
});
//category Controller
//createCategory Controller
phonecatControllers.controller('createCategoryCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Category');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/createcategory.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.category = {};
    $scope.submitForm = function () {
        NavigationService.saveCategory($scope.category, function (data, status) {
            $location.url('/category');
        });
    };
    //createCategory
});
//createCategory Controller
//editCategory Controller
phonecatControllers.controller('editCategoryCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Category');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/editcategory.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.category = {};
    NavigationService.getOneCategory($routeParams.id, function (data, status) {
        $scope.category = data; //Add More Array
    });
    $scope.submitForm = function () {
        $scope.category._id = $routeParams.id;
        NavigationService.saveCategory($scope.category, function (data, status) {
            $location.url('/category');
        });
    };
    //editCategory
});
//editCategory Controller
//Pages Controller
phonecatControllers.controller('PagesCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Pages');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/pages.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.Pages = [];
    $scope.pagedata = {};
    $scope.pagedata.page = 1;
    $scope.pagedata.limit = '20';
    $scope.pagedata.search = '';
    $scope.number = 100;
    $scope.reload = function (pagedata) {
        $scope.pagedata = pagedata;
        NavigationService.findLimitedPages($scope.pagedata, function (data, status) {
            $scope.pages = data;
            $scope.pages = [];
            var newclass = '';
            for (var i = 1; i <= data.totalpages; i++) {
                if (pagedata.page == i) {
                    newclass = 'active';
                } else {
                    newclass = '';
                }
                $scope.pages.push({
                    pageno: i,
                    class: newclass
                });
            }
        });
    }
    $scope.reload($scope.pagedata);
    $scope.confDelete = function () {
        NavigationService.deletePages(function (data, status) {
            ngDialog.close();
            window.location.reload();
        });
    }
    $scope.deletefun = function (id) {
            $.jStorage.set('deletepages', id);
            ngDialog.open({
                template: 'views/delete.html',
                closeByEscape: false,
                controller: 'PagesCtrl',
                closeByDocument: false
            });
        }
        //End Pages
});
//pages Controller
//createPages Controller
phonecatControllers.controller('createPagesCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Pages');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/createpages.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.pages = {};
    $scope.submitForm = function () {
        NavigationService.savePages($scope.pages, function (data, status) {
            $location.url('/pages');
        });
    };
    //createPages
});
//createPages Controller
//editPages Controller
phonecatControllers.controller('editPagesCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Pages');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/editpages.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.pages = {};
    NavigationService.getOnePages($routeParams.id, function (data, status) {
        $scope.pages = data; //Add More Array
    });
    $scope.submitForm = function () {
        $scope.pages._id = $routeParams.id;
        NavigationService.savePages($scope.pages, function (data, status) {
            $location.url('/pages');
        });
    };
    //editPages
});
//editPages Controller
//Testimonial Controller
phonecatControllers.controller('TestimonialCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Testimonial');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/testimonial.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.Testimonial = [];
    $scope.pagedata = {};
    $scope.pagedata.page = 1;
    $scope.pagedata.limit = '20';
    $scope.pagedata.search = '';
    $scope.number = 100;
    $scope.reload = function (pagedata) {
        $scope.pagedata = pagedata;
        NavigationService.findLimitedTestimonial($scope.pagedata, function (data, status) {
            $scope.testimonial = data;
            $scope.pages = [];
            var newclass = '';
            for (var i = 1; i <= data.totalpages; i++) {
                if (pagedata.page == i) {
                    newclass = 'active';
                } else {
                    newclass = '';
                }
                $scope.pages.push({
                    pageno: i,
                    class: newclass
                });
            }
        });
    }
    $scope.reload($scope.pagedata);
    $scope.confDelete = function () {
        NavigationService.deleteTestimonial(function (data, status) {
            ngDialog.close();
            window.location.reload();
        });
    }
    $scope.deletefun = function (id) {
            $.jStorage.set('deletetestimonial', id);
            ngDialog.open({
                template: 'views/delete.html',
                closeByEscape: false,
                controller: 'TestimonialCtrl',
                closeByDocument: false
            });
        }
        //End Testimonial
});
//testimonial Controller
//createTestimonial Controller
phonecatControllers.controller('createTestimonialCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Testimonial');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/createtestimonial.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.testimonial = {};
    $scope.submitForm = function () {
        NavigationService.saveTestimonial($scope.testimonial, function (data, status) {
            $location.url('/testimonial');
        });
    };
    //createTestimonial
});
//createTestimonial Controller
//editTestimonial Controller
phonecatControllers.controller('editTestimonialCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Testimonial');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/edittestimonial.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.testimonial = {};
    NavigationService.getOneTestimonial($routeParams.id, function (data, status) {
        $scope.testimonial = data; //Add More Array
    });
    $scope.submitForm = function () {
        $scope.testimonial._id = $routeParams.id;
        NavigationService.saveTestimonial($scope.testimonial, function (data, status) {
            $location.url('/testimonial');
        });
    };
    //editTestimonial
});
//editTestimonial Controller
//Slider Controller
phonecatControllers.controller('SliderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Slider');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/slider.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.Slider = [];
    $scope.pagedata = {};
    $scope.pagedata.page = 1;
    $scope.pagedata.limit = '20';
    $scope.pagedata.search = '';
    $scope.number = 100;
    $scope.reload = function (pagedata) {
        $scope.pagedata = pagedata;
        NavigationService.findLimitedSlider($scope.pagedata, function (data, status) {
            $scope.slider = data;
            $scope.pages = [];
            var newclass = '';
            for (var i = 1; i <= data.totalpages; i++) {
                if (pagedata.page == i) {
                    newclass = 'active';
                } else {
                    newclass = '';
                }
                $scope.pages.push({
                    pageno: i,
                    class: newclass
                });
            }
        });
    }
    $scope.reload($scope.pagedata);
    $scope.confDelete = function () {
        NavigationService.deleteSlider(function (data, status) {
            ngDialog.close();
            window.location.reload();
        });
    }
    $scope.deletefun = function (id) {
            $.jStorage.set('deleteslider', id);
            ngDialog.open({
                template: 'views/delete.html',
                closeByEscape: false,
                controller: 'SliderCtrl',
                closeByDocument: false
            });
        }
        //End Slider
});
//slider Controller
//createSlider Controller
phonecatControllers.controller('createSliderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Slider');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/createslider.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.slider = {};
    $scope.submitForm = function () {
        NavigationService.saveSlider($scope.slider, function (data, status) {
            $location.url('/slider');
        });
    };
    //createSlider
});
//createSlider Controller
//editSlider Controller
phonecatControllers.controller('editSliderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive('Slider');
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = '';
    TemplateService.content = 'views/editslider.html';
    TemplateService.list = 2;
    $scope.navigation = NavigationService.getnav();
    $scope.slider = {};
    NavigationService.getOneSlider($routeParams.id, function (data, status) {
        $scope.slider = data; //Add More Array
    });
    $scope.submitForm = function () {
        $scope.slider._id = $routeParams.id;
        NavigationService.saveSlider($scope.slider, function (data, status) {
            $location.url('/slider');
        });
    };
    //editSlider
});
//editSlider Controller
//Add New Controller
