var Critter = require("../../../src/javascript/lib/critter/Critter");
var World = require("../../../src/javascript/lib/World");
var Rock = require("../../../src/javascript/lib/models/Rock");
var Resource = require("../../../src/javascript/lib/models/Resource");
var WorldSerializer = require("../../../src/javascript/lib/serializers/WorldSerializer");

describe("WorldSerializer", function(){
  var worldSerializer;
  beforeEach(function(){
    worldSerializer = new WorldSerializer();
  });
  
  describe("#serialize", function(){
    var world;
    beforeEach(function(){
      world = new World();
    });
    
    it("sets the width and height", function(){
      var serializedWorld = worldSerializer.serialize(world);
      var parsedWorld = JSON.parse(serializedWorld);
      expect(parsedWorld.width).toBe(40);
      expect(parsedWorld.height).toBe(25);
    });
    
    it("stores the things in the world", function(){
      world.place(new Rock(), {x: 3, y:5});
      var serializedWorld = worldSerializer.serialize(world);
      
      var parsedWorld = JSON.parse(serializedWorld);
      expect(parsedWorld.things[0].type).toBe("rock");
     
    });
    
    it("includes the location of each thing", function(){
      world.place(new Rock(), {x: 3, y:5});
      var serializedWorld = worldSerializer.serialize(world);
      
      var parsedWorld = JSON.parse(serializedWorld);
       expect(parsedWorld.things[0].location).toEqual({x:3, y:5});
    });
    
    it("serializes critters", function(){
      spyOn(singletonContext.critterSerializer, "preserialize").and.returnValue({"some":"critter json"});
      world.place(new Critter(), {x: 3, y:5});
      var serializedWorld = worldSerializer.serialize(world);
      
      var parsedWorld = JSON.parse(serializedWorld);
      expect(parsedWorld.things[0].some).toBe('critter json');
    });
  });
  
  describe("#deserialize", function(){
    var serializedWorld;
    beforeEach(function(){
      var world = new World();
      world.place(new Critter(), {x: 3, y:4});
      world.place(new Resource(), {x: 4, y:4});
      world.place(new Rock(), {x: 5, y:4});
      
      serializedWorld = worldSerializer.serialize(world);
    });
    it("returns a world", function(){
      var world = worldSerializer.deserialize(serializedWorld);
      expect(world instanceof World);
    });
    
    it("places the things in the world", function(){
       var world = worldSerializer.deserialize(serializedWorld);
      expect(world.things.length).toBe(3);
      expect(world.tiles[3][4] instanceof Critter).toBeTruthy();
    });
    
    describe("when passed a world", function(){
      it("deserializes into that world", function(){
        var world = new World();
        world.place(new Rock(), {x:4, y:7});
        var deserializedWorld = worldSerializer.deserialize(serializedWorld, world);
        expect(world.things.length).toBe(3);
        expect(world).toBe(deserializedWorld);
      });
    });
  });
});