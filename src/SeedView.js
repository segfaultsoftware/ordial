$(function() {
  SeedView = Backbone.View.extend({

    events: {
      'blur #seed-input' : 'saveSeed'
    },

    template: function() {
      return _.template('<input id="seed-input" type="text" ' +
        '<% if (isFinalized) { %>disabled="disabled"<% } %> ' +
        'value="<%= seedValue %>"/>', this.model.attributes);
    },

    disableInput: function() {
      if(!this.model.get('isFinalized')){
        this.model.set('isFinalized', true);
        this.model.seedRandom();
      }
    },

    saveSeed: function() {
      this.model.set('seedValue', this.$el.find('#seed-input').val());
    },

    render: function(){
      this.$el.html(this.template());
      return this;
    }
  });
});