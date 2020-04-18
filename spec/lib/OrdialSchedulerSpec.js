const OrdialScheduler = require("../../src/javascript/lib/OrdialScheduler");
describe("OrdialScheduler", () => {
  let scheduler, fakeContext;
  beforeEach(() => {
    scheduler = new OrdialScheduler();
    fakeContext = { ordial: jasmine.createSpyObj("fake ordial", ['updateWorld']) };
    scheduler.initContext(fakeContext)
    scheduler.timeout = 0;
  });

  it("should default to paused", () => {
    expect(scheduler.paused).to.eq(true);
  });

  describe("#schedule", () => {
    describe("when not paused", function () {
      beforeEach(function () {
        scheduler.paused = false;
      });
      afterEach(function () {
        scheduler.pause();
      });

      it("should update the world", function (done) {
        scheduler.schedule();
        setTimeout(() => {
          expect(fakeContext.updateWorld).toHaveBeenCalled();
        }, 1);
      });

      it('should defer an updateWorld for later', function () {
        scheduler.schedule();
        setTimeout(() => {
          expect(fakeContext.updateWorld.callCount).toBeGreaterThan(1);
        }, 1);
      });
    });

    describe("when paused", function () {
      beforeEach(function () {
        scheduler.paused = true;
      });

      it("should not update the world", function (done) {
        scheduler.schedule();
        setTimeout(() => {
          expect(fakeContext.updateWorld).not.toHaveBeenCalled();
        }, 1);
      });
    })
  });
});