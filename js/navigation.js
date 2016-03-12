var adminurl = "http://130.211.164.166/";
// var adminurl = "http://192.168.0.126/";
var adminlogin = {
    "username": "admin@admin.com",
    "password": "admin123"
};
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    var navigation = [{
            name: "Dashboard",
            classis: "active",
            link: "#/home",
            subnav: []
        }, {
            name: 'Flexi Lancer',
            active: '',
            link: '#/user',
            subnav: []
        }, {
            name: 'Flexi Client',
            active: '',
            link: '#/client',
            subnav: []
        }, {
            name: 'Job',
            active: '',
            link: '#/job',
            subnav: []
        }, {
            name: 'Category',
            active: '',
            link: '#/category',
            subnav: []
        }, {
            name: 'Pages',
            active: '',
            link: '#/pages',
            subnav: []
        }, {
            name: 'Testimonial',
            active: '',
            link: '#/testimonial',
            subnav: []
        }, {
            name: 'Slider',
            active: '',
            link: '#/slider',
            subnav: []
        }, //Add New Left

    ];

    return {
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        getnav: function () {
            return navigation;
        },
        adminLogin: function (data, callback) {
            $http({
                url: adminurl + "user/adminlogin",
                method: "POST",
                data: {
                    "email": data.email,
                    "password": data.password
                }
            }).success(callback);
        },
        countUser: function (callback) {
            $http.get(adminurl + "user/countusers").success(callback);
        },
        setUser: function (data) {
            $.jStorage.set("user", data);
        },
        getUser: function () {
            $.jStorage.get("user");
        },
        getOneUser: function (id, callback) {
            $http({
                url: adminurl + 'user/findone',
                method: 'POST',
                data: {
                    '_id': id
                }
            }).success(callback);
        },
        findLimitedUser: function (user, callback) {
            $http({
                url: adminurl + 'user/findlimited',
                method: 'POST',
                data: {
                    'search': user.search,
                    'pagesize': parseInt(user.limit),
                    'pagenumber': parseInt(user.page),
                    'accesslevel': user.accesslevel
                }
            }).success(callback);
        },
        deleteUser: function (callback) {
            $http({
                url: adminurl + 'user/delete',
                method: 'POST',
                data: {
                    '_id': $.jStorage.get('deleteuser')
                }
            }).success(callback);
        },
        saveUser: function (data, callback) {
            $http({
                url: adminurl + 'user/saveBack',
                method: 'POST',
                data: data
            }).success(callback);
        },
        getOneClient: function (id, callback) {
            $http({
                url: adminurl + 'user/findone',
                method: 'POST',
                data: {
                    '_id': id
                }
            }).success(callback);
        },
        findLimitedClient: function (user, callback) {
            $http({
                url: adminurl + 'user/findlimited',
                method: 'POST',
                data: {
                    'search': user.search,
                    'pagesize': parseInt(user.limit),
                    'pagenumber': parseInt(user.page),
                    'accesslevel': user.accesslevel
                }
            }).success(callback);
        },
        deleteClient: function (callback) {
            $http({
                url: adminurl + 'user/delete',
                method: 'POST',
                data: {
                    '_id': $.jStorage.get('deleteuser')
                }
            }).success(callback);
        },
        saveClient: function (data, callback) {
            $http({
                url: adminurl + 'user/save',
                method: 'POST',
                data: data
            }).success(callback);
        },
        saveJob: function (data, callback) {
            $http({
                url: adminurl + 'job/save',
                method: 'POST',
                data: {
                    'name': data.name
                }
            }).success(callback);
        },
        findJob: function (data, job, callback) {
            $http({
                url: adminurl + 'job/findDrop',
                method: 'POST',
                data: {
                    search: data,
                    job: job
                }
            }).success(callback);
        },
        getOneJob: function (id, callback) {
            $http({
                url: adminurl + 'job/findone',
                method: 'POST',
                data: {
                    '_id': id
                }
            }).success(callback);
        },
        findLimitedJob: function (job, callback) {
            $http({
                url: adminurl + 'job/findlimited',
                method: 'POST',
                data: {
                    'search': job.search,
                    'pagesize': parseInt(job.limit),
                    'pagenumber': parseInt(job.page)
                }
            }).success(callback);
        },
        deleteJob: function (callback) {
            $http({
                url: adminurl + 'job/delete',
                method: 'POST',
                data: {
                    '_id': $.jStorage.get('deletejob')
                }
            }).success(callback);
        },
        saveJob: function (data, callback) {
            $http({
                url: adminurl + 'job/save',
                method: 'POST',
                data: data
            }).success(callback);
        },
        getOneCategory: function (id, callback) {
            $http({
                url: adminurl + 'category/findone',
                method: 'POST',
                data: {
                    '_id': id
                }
            }).success(callback);
        },
        findLimitedCategory: function (category, callback) {
            $http({
                url: adminurl + 'category/findlimited',
                method: 'POST',
                data: {
                    'search': category.search,
                    'pagesize': parseInt(category.limit),
                    'pagenumber': parseInt(category.page)
                }
            }).success(callback);
        },
        deleteCategory: function (callback) {
            $http({
                url: adminurl + 'category/delete',
                method: 'POST',
                data: {
                    '_id': $.jStorage.get('deletecategory')
                }
            }).success(callback);
        },
        saveCategory: function (data, callback) {
            $http({
                url: adminurl + 'category/save',
                method: 'POST',
                data: data
            }).success(callback);
        },
        saveJobs: function (data, callback) {
            $http({
                url: adminurl + 'jobs/save',
                method: 'POST',
                data: {
                    'name': data.name
                }
            }).success(callback);
        },
        getOnePages: function (id, callback) {
            $http({
                url: adminurl + 'pages/findone',
                method: 'POST',
                data: {
                    '_id': id
                }
            }).success(callback);
        },
        findLimitedPages: function (pages, callback) {
            $http({
                url: adminurl + 'pages/findlimited',
                method: 'POST',
                data: {
                    'search': pages.search,
                    'pagesize': parseInt(pages.limit),
                    'pagenumber': parseInt(pages.page)
                }
            }).success(callback);
        },
        deletePages: function (callback) {
            $http({
                url: adminurl + 'pages/delete',
                method: 'POST',
                data: {
                    '_id': $.jStorage.get('deletepages')
                }
            }).success(callback);
        },
        savePages: function (data, callback) {
            $http({
                url: adminurl + 'pages/save',
                method: 'POST',
                data: data
            }).success(callback);
        },
        getOneTestimonial: function (id, callback) {
            $http({
                url: adminurl + 'testimonial/findone',
                method: 'POST',
                data: {
                    '_id': id
                }
            }).success(callback);
        },
        findLimitedTestimonial: function (testimonial, callback) {
            $http({
                url: adminurl + 'testimonial/findlimited',
                method: 'POST',
                data: {
                    'search': testimonial.search,
                    'pagesize': parseInt(testimonial.limit),
                    'pagenumber': parseInt(testimonial.page)
                }
            }).success(callback);
        },
        deleteTestimonial: function (callback) {
            $http({
                url: adminurl + 'testimonial/delete',
                method: 'POST',
                data: {
                    '_id': $.jStorage.get('deletetestimonial')
                }
            }).success(callback);
        },
        saveTestimonial: function (data, callback) {
            $http({
                url: adminurl + 'testimonial/save',
                method: 'POST',
                data: data
            }).success(callback);
        },
        getOneSlider: function (id, callback) {
            $http({
                url: adminurl + 'slider/findone',
                method: 'POST',
                data: {
                    '_id': id
                }
            }).success(callback);
        },
        findLimitedSlider: function (slider, callback) {
            $http({
                url: adminurl + 'slider/findlimited',
                method: 'POST',
                data: {
                    'search': slider.search,
                    'pagesize': parseInt(slider.limit),
                    'pagenumber': parseInt(slider.page)
                }
            }).success(callback);
        },
        deleteSlider: function (callback) {
            $http({
                url: adminurl + 'slider/delete',
                method: 'POST',
                data: {
                    '_id': $.jStorage.get('deleteslider')
                }
            }).success(callback);
        },
        saveSlider: function (data, callback) {
            $http({
                url: adminurl + 'slider/save',
                method: 'POST',
                data: data
            }).success(callback);
        }, //Add New Service

    }
})
