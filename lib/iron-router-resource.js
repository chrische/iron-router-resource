_.extend(Router, {
    resource: function(resource, args){
        args = args || {};
        if(!_.isString(resource))throw new Error('resource requires a string as the first parameter');

        var capitalize = function(s){
            return s.charAt(0).toUpperCase() + s.slice(1);
        };

        var router = this;
        var base = '/' + resource;
        var single = inflection.singularize(resource);

        single = capitalize(single);

        var routes = [
            { name: resource, path: base, action: 'index' },
            { name: 'new' + single, path: base + '/new', action: 'new' },
            { name: 'create' + single, path: base + '/create', action: 'create' },
            { name: 'edit' + single, path: base + '/edit/:_id', action: 'edit' },
            { name: 'show' + single, path: base + '/:_id', action: 'show' },
            { name: 'delete' + single, path: base + '/delete/:_id', action: 'delete' },
            { name: 'destroy' + single, path: base + '/destroy/:_id', action: 'destroy' }
        ];

        _.each(routes, function(route, index){
            router.map(function(){

                this.route(route.name, {
                    path: route.path,
                    controller: resource + 'Controller',
                    action: route.action
                });
            });
        });

        if(args.create_controller){
            var collectionName = capitalize(resource);
            window[resource + 'Controller'] = RouteController.extend({
                //data: false,
                index: function(){
                    var data = this.getData();
                    data.Model = window[collectionName].find().fetch();

                    return this.render(this.route.name);
                },

                new: function(){
                    return this.render(this.route.name);
                },

                show: function(){
                    var data = this.getData();
                    data.Model = window[collectionName].findOne(this.params._id);

                    return this.render(this.route.name);
                },

                edit: function(){
                    var data = this.getData();
                    data.Model = window[collectionName].findOne(this.params._id);

                    return this.render(this.route.name);
                },

                delete: function(){
                    var data = this.getData();
                    data.Model = window[collectionName].findOne(this.params._id);

                    return this.render(this.route.name);
                }
            });
        }
    }
});
