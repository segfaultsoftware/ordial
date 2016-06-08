Resource = Backbone.Model.extend({
  initialize: function(){
    this.manaPerServing = Resource.DEFAULT_MANA_VALUE;
  }
});

Resource.DEFAULT_MANA_VALUE = 300;