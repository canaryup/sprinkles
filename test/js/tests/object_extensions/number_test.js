describe("Number.prototype", function() {
  var n;

  describe("$ordinalize()", function() {
    it("adds 'st' suffix to numbers ending in 1", function() {
      n = 1; assert.equal(n.$ordinalize(), "1st");
      n = 21; assert.equal(n.$ordinalize(), "21st");
      n = -1; assert.equal(n.$ordinalize(), "-1st");
    });

    it("adds 'th' suffix to numbers ending in 11", function() {
      n = 11; assert.equal(n.$ordinalize(), "11th");
      n = 111; assert.equal(n.$ordinalize(), "111th");
    });

    it("adds 'nd' suffix to numbers ending in 2", function() {
      n = 2; assert.equal(n.$ordinalize(),  "2nd");
      n = 22; assert.equal(n.$ordinalize(), "22nd");
      n = -2; assert.equal(n.$ordinalize(), "-2nd");
    });

    it("adds 'th' suffix to numbers ending in 12", function() {
      n = 12; assert.equal(n.$ordinalize(), "12th");
      n = 112; assert.equal(n.$ordinalize(), "112th");
    });

    it("adds 'rd' suffix to numbers ending in 3", function() {
      n = 3; assert.equal(n.$ordinalize(), "3rd");
      n = 33; assert.equal(n.$ordinalize(), "33rd");
      n = -3; assert.equal(n.$ordinalize(), "-3rd");
    });

    it("adds 'th' suffix to numbers ending in 13", function() {
      n = 13; assert.equal(n.$ordinalize(), "13th");
      n = 113; assert.equal(n.$ordinalize(), "113th");
    });

    it("adds 'th' suffix to all other numbers", function() {
      n = 4; assert.equal(n.$ordinalize(), "4th");
      n = 12; assert.equal(n.$ordinalize(), "12th");
      n = 13; assert.equal(n.$ordinalize(), "13th");
      n = 13; assert.equal(n.$ordinalize(), "13th");
    });
  });

  describe("$round()", function() {
    it("rounds down to the nearest integer", function() {
      n = 123.456; assert.equal(n.$round(), 123);
    });

    it("rounds up to the nearest integer", function() {
      n = 123.8; assert.equal(n.$round(), 124);
    });

    it("rounds to the specified number of decimal places", function() {
      n = 123.456; assert.equal(n.$round(1), 123.5);
      n = 123.45115; assert.equal(n.$round(3), 123.451);
    });

    it("rounds negative numbers", function() {
      n = -123.45; assert.equal(n.$round(), -123);
      n = -123.95; assert.equal(n.$round(), -124);
    });
  });
});