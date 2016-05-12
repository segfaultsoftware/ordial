describe("CritterSerializer", function(){
  var critterSerializer;
  beforeEach(function(){
    critterSerializer = new CritterSerializer();
  });
  
  describe("#serialize", function(){
    var critter, serializedCritter, parsedCritter;
    beforeEach(function(){
      critter = new Critter();
    });
    
    it("includes the vitals", function(){
      critter.vitals.mana = 123;
      serializedCritter = critterSerializer.serialize(critter);
      parsedCritter = JSON.parse(serializedCritter); 
      expect(parsedCritter.vitals.mana).toEqual(123);
    });
    
    it("includes the color", function(){
      critter.color = "pink";
      serializedCritter = critterSerializer.serialize(critter);
      parsedCritter = JSON.parse(serializedCritter);
      expect(parsedCritter.color).toEqual("pink");
    });
    
    it("includes the direction", function(){
      critter.direction = CardinalDirection.NORTH;
      serializedCritter = critterSerializer.serialize(critter);
      parsedCritter = JSON.parse(serializedCritter);
      expect(parsedCritter.direction).toEqual(CardinalDirection.NORTH);
    });
    
    it("includes the genes", function(){
      critter.genes = [["condition", "critterInFront"], ["action", ["MOVE_FORWARD", "MOVE_FORWARD"]]];
      serializedCritter = critterSerializer.serialize(critter);
      parsedCritter = JSON.parse(serializedCritter);
      expect(parsedCritter.genes).toEqual(
                       [["condition", "critterInFront"], ["action", ["MOVE_FORWARD", "MOVE_FORWARD"]]]
                       );
    });
    
    it("sets the type to critter", function(){
      serializedCritter = critterSerializer.serialize(critter);
      parsedCritter = JSON.parse(serializedCritter);
      expect(parsedCritter.type).toEqual("critter");
    });
    
  });
  
  describe("#deserialize", function(){
    var serializedCritter, critter;
    beforeEach(function(){
      serializedCritter = 
      '{' +
      '  "color":"pink", '+
      '  "direction":"SOUTH", '+
      '  "vitals":{"mana":150}, '+
      '  "genes":[["action","MOVE_FORWARD"]] '+
      '}';
    });
    
    it("sets the vitals", function(){
      critter = critterSerializer.deserialize(serializedCritter);
      expect(critter.vitals.mana).toBe(150);
    });
    
    it("sets the color", function(){
      critter = critterSerializer.deserialize(serializedCritter); 
      expect(critter.color).toBe("pink");
    });
    
    it("sets the direction", function(){
      critter = critterSerializer.deserialize(serializedCritter);
      expect(critter.direction).toBe(CardinalDirection.NORTH);
    });
    
    it("sets the genes", function(){
      critter = critterSerializer.deserialize(serializedCritter);
      expect(critter.genes).toEqual(
                       [["action", "MOVE_FORWARD"]]
                       );
    });
    
    it("builds the mind", function(){
      critter = critterSerializer.deserialize(serializedCritter);
      expect(critter.getActions()).toEqual(Critter.Actions.MOVE_FORWARD);
    });
  });
});