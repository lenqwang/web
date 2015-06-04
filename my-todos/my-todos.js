Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  Template.list.helpers({
    lists: function() {
      return Items.find();
    },
    doneClass: function() {
      if(this.done) {
        return 'done';
      }
      else {
        return '';
      }
    }
  });
  
  Template.list.events({
    'click li': function() {
      Items.update({_id: this._id}, {$set: {done: !this.done}});
    }
  });
  
  Template.controls.events({
    'submit form': function(e) {
      e.preventDefault();
      
      var mark = $(e.target).find('[name="newItem"]').val();
      
      Items.insert({mark: mark});
      $(e.target).find('[name="newItem"]').val('');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var items = [
      {mark: '《Meteor is a realtime application》'},
      {mark: '《Meteor will be a feature application in javascript》'}
    ];
    
    if(Items.find().count() == 0) {
      for(var i = 0; i < items.length; i++) {
        Items.insert(items[i]);  
      }
    }
  });
}
