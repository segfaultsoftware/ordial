var critterSchema = require("../CritterEditorSchema");
const { JSONEditor } = require("@json-editor/json-editor");

var CritterEditorView = Backbone.View.extend({
  initialize: function(){
    singletonContext.eventBus.bind('critterSelectedOnMap', _.bind(this.setCritter, this));
  },
  initContext: function () {
    this.model = {};
    // singletonContext.eventBus.bind('critterSelectedOnMap', _.bind(this.setCritter, this));
  },

  setCritter: function (options) {
    this.model = singletonContext.critterSerializer.preserialize(options.critter);
    console.log(this.model);
    this.editor.setValue(this.model);
  },

  render: function () {
    if(!this.editor){
      this.editor = new JSONEditor(this.el, {
        schema: critterSchema,
      });
    }
  }

});

module.exports = CritterEditorView;