var a = {
  init: function (elevators, floors) {
    var randomElevator = function () {
      return elevators[Math.floor(Math.random() * elevators.length)];
    };
    var emptiestElevator = function () {
      return _.min(elevators, function (elevator) {
        console.log('loadFactor', elevator.loadFactor());
        return elevator.loadFactor();
      });
    };
    var peopleWaitingOnFloors = [];
    console.log(elevators[0]);
    _.each(elevators, function (elevator, elevatorIndex) {
      elevator.on("idle", function () {
        console.log('idle elevator');
        elevator.goingDownIndicator(true);
        elevator.goingUpIndicator(true);
        elevator.goToFloor(elevator.currentFloor())
        elevator.goToFloor(0);//(floors.length / elevators.length) * elevatorIndex);
      });
      elevator.on("floor_button_pressed", function (floorNumber) {
        console.log('floor button pressed', floorNumber);
        var elevator = this;

        if (!_.contains(elevator.destinationQueue, floorNumber)) {
          console.log('going to floor', floorNumber);
          elevator.goToFloor(floorNumber);
          var q = elevator.destinationQueue;
          console.log('destinationQueue',q);
          if(elevator.destinationQueue[0] < elevator.currentFloor()){
            elevator.goingDownIndicator(true);
            elevator.goingUpIndicator(false);
          } else {
            elevator.goingDownIndicator(false);
            elevator.goingUpIndicator(true);
          }
        }
      });
    });

    _.each(floors, function (floor) {
      var pullElevatorToMe = function () {
        console.log('up/down pressed on floor', this.floorNum());
        var floorNumber = this.floorNum();
        var waitingOnFloorCount = peopleWaitingOnFloors[floorNumber];
        waitingOnFloorCount = waitingOnFloorCount? waitingOnFloorCount+1:1;
        peopleWaitingOnFloors[floorNumber] = waitingOnFloorCount;
        var isFloorAlreadyQueued = _.find(elevators, function (elevator) {
          return _.contains(elevator.destinationQueue, floorNumber)
        });
        if (!isFloorAlreadyQueued) {
          emptiestElevator().goToFloor(floorNumber);
        }
      };
      floor.on("up_button_pressed", pullElevatorToMe);
      floor.on("down_button_pressed", pullElevatorToMe);
    });


  },
  update: function (dt, elevators, floors) {
    // We normally don't need to do anything here
  }
}
