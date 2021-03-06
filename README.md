# Breaking changes in version 2.* (from 1.*)

The create controller argument is now part of an args object to help make it more extensible for future updates. You now need to call

```
this.resource('items', { create_controller: true });
```

In order to accomodate some of the changes that have occured to iron-router (version 0.6.1 at this time), a few things have changed. 

The context of "this" can not be set to an object or an array (see [bug](https://github.com/EventedMind/iron-router/issues/234)). Due to this, your data will be represented by a `Model` object. 

# Iron Router Resource

Extends [Iron-Router](https://github.com/EventedMind/iron-router), allowing you to quickly add standard CRUD routes for your resources.

There is now the option to have the associated controller created for you. See below for details.

# Basics

Assumes that you provide the pluralized version of your resource, `items` not `item`.

Assuming you have a collection called `items` you would call:

```
Router.map(function(){
    this.route(...); //regular route

    this.resource('items'); //resource route which will create crud routes for you based on the resource name
});
```

This would generate routes for index, show, edit, etc. all pointing to an `itemsController` with an action of the appropriate name.

The routes currently look like the following (note the plural/single usage):

name: {resources}, path: /{resources}

name: show{resource}, path: /{resources}/:_id, action: show

name: new{resource}, path: /{resources}/new, action: new

name: create{resource}, path: /{resources}/create, action: create

name: edit{resource}, path: /{resources}/edit/:_id, action: edit

name: delete{resource}, path: /{resources}/delete/:_id, action: delete

name: destroy{resource}, path: /{resources}/destroy/:_id, action: destroy

# Auto Create Controller
You can pass in an option to have the package automatically create the associated controller for you via:

```
this.resource('tasks', { create_controller: true });
```

It will generate a controller that looks like:

```
tasksController = RouteController.extend({
   index: function(){
       this.setData({
            Model: Tasks.find({}).fetch()
        });
       return this.render(this.route.name);
   },

    new: function(){
        return this.render(this.route.name);
    },

    show: function(){
        this.setData({
            Model: Tasks.findOne(this.params._id)
        });
        return this.render(this.route.name);
    },

    edit: function(){
        this.setData({
            Model: Tasks.findOne(this.params._id)
        });
        return this.render(this.route.name);
    },

    delete: function(){
        this.setData({ 
            Model: Tasks.findOne(this.params._id)
        });
        return this.render(this.route.name);
    }
});
```
To use this feature you must insure that your templates are named based on the route that they are associated to.

`showTask` or `editTask` for example. If you follow this convention, it helps reduce development time.

# Example routes
```
Router.routes.items
Router.routes.editItem
Router.routes.showItem
Router.routes.newItem
Router.routes.createItem
Router.routes.deleteItem
Router.routes.destroyItem
```