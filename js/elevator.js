"use strict";

class Elevator {

  constructor(id, floor, status, targets) {
    this.id = id;
    this.floor = floor;
    this.status = status;
    this.targets = targets;
  }

  addTarget(target) {
    // Add the target if target is not already in the targets list and current floor is not target.
    if (this.targets.indexOf(target) == -1 && this.floor != target) {
      this.targets.push(target);
    }
  }

  removeReachedTarget() {
    this.targets.splice(this.targets.indexOf(this.floor), 1);
  }

  toggleMaintenanceMode() {
    if(this.isUnderMaintenance()){
      this.status = Elevator.TAG_AVAILABLE;
    }
    else{
      this.status = Elevator.TAG_UNDER_MAINTENANCE;
    }
  }

  // Checks targets and move
  commander() {
    var self = this;

    if (self.anyTarget() && !self.isBusy() && !self.isUnderMaintenance()) {
      self.move();
    }
    else { // No Command || Door Open || Maintenance Mode
      self.makeAvailableIfPossible();
    }

    setTimeout(function() { self.commander(); }, 3000);
  }

  move() {
    // Continue to go if current floor is not in the targets
    if (this.targets.indexOf(this.floor) == -1) {
      // Determine the direction
      if (this.floor - this.targets[0] > 0) {
        this.goDown();
      }
      else {
        this.goUp();
      }
    }
    else {
      this.status = Elevator.TAG_AVAILABLE;
    }
  }

  goDown() {
    this.go(Elevator.TAG_GOING_DOWN, -1);
  }

  goUp() {
    this.go(Elevator.TAG_GOING_UP, 1);
  }

  go(status, amount) {
    if (this.status == status) {
      this.floor += amount;
      this.makeAvailableIfPossible();
    }
    else {
      this.status = status;
    }
  }

  makeAvailableIfPossible() {
    if (this.targets.indexOf(this.floor) != -1) {
      this.status = Elevator.TAG_AVAILABLE;
      this.toggleDoor();
    }
  }

  toggleDoor() {
    if (this.status == Elevator.TAG_AVAILABLE) {
      this.status = Elevator.TAG_BUSY;
      // Remove current floor if it's in the target.
      if (this.targets.indexOf(this.floor) != -1) {
        this.removeReachedTarget();
      }
    }
    else {
      this.status = Elevator.TAG_AVAILABLE;
    }
  }

  isBusy() {
    return this.status == Elevator.TAG_BUSY;
  }

  isUnderMaintenance() {
    return this.status == Elevator.TAG_UNDER_MAINTENANCE;
  }

  anyTarget() {
    return this.targets.length > 0
  }

  static selectElevator(elevators, callingFloor) {
    var ratings = [0, 0, 0, 0];

    for (var i = 0; i < 4; i++) {
      var floorDifference = callingFloor - elevators[i].floor;
      // Floor difference affects the rate as negative.
      ratings[i] -= Math.abs(floorDifference);
      // Rate the elevator's status.
      ratings[i] += Elevator.rateStatus(elevators[i].status, floorDifference);
    }

    return(Utils.findMaxNumberIndex(ratings) + 1); // Select best rated elevator.
  }

  // TODO: Improve values and algorithm
  static rateStatus(status, floorDifference) {
    switch (status) {
      case Elevator.TAG_AVAILABLE: return 1;
      case Elevator.TAG_UNDER_MAINTENANCE: return -100;
      case Elevator.TAG_BUSY: return -5;
      case Elevator.TAG_GOING_DOWN: return floorDifference < 0 ? 0.75 : -0.75;
      case Elevator.TAG_GOING_UP: return floorDifference > 0 ? 0.75 : -0.75;
    }
  }

}

// Static Variables
Elevator.TAG_AVAILABLE = 0;
Elevator.TAG_BUSY = 1;
Elevator.TAG_UNDER_MAINTENANCE = 2;
Elevator.TAG_GOING_UP = 3;
Elevator.TAG_GOING_DOWN = 4;
