"use strict";

var elevator1 = new Elevator(1, 1, Elevator.TAG_AVAILABLE, []);
var elevator2 = new Elevator(2, 1, Elevator.TAG_AVAILABLE, []);
var elevator3 = new Elevator(3, 1, Elevator.TAG_AVAILABLE, []);
var elevator4 = new Elevator(4, 1, Elevator.TAG_AVAILABLE, []);

elevator1.commander();
elevator2.commander();
elevator3.commander();
elevator4.commander();

function addTarget(elevatorId, floor) {
	selectElevatorById(elevatorId).addTarget(floor);
}

function toggleMaintenanceMode(elevatorId) {
	selectElevatorById(elevatorId).toggleMaintenanceMode();
}

function callElevator(floor) {
	var selectedElevatorId = Elevator.selectElevator(
		[elevator1, elevator2, elevator3, elevator4],
		floor
	);

	// Show assigned elevator.
	$("#call" + floor).html("Elevator " + selectedElevatorId + " is assigned.");
	addTarget(selectedElevatorId, floor);
}

function selectElevatorById(id) {
	switch (id) {
		case 1: return elevator1;
		case 2: return elevator2;
		case 3: return elevator3;
		case 4: return elevator4;
	}
}

function updateInternalButton(id, floor) {
	$("#elevator" + id + "-button" + floor).toggleClass("red-button");
}

function updateFloorIndicator(id, floor) {
	$("#elevator" + id + "-floor-indicator").text(String(floor));
}

function updateDoorToggleButton(id, status){
	var door = $('#elevator' + id + '-toggle-door-button');
	switch (status) {
		case Elevator.TAG_GOING_DOWN: case Elevator.TAG_GOING_UP: case Elevator.TAG_UNDER_MAINTENANCE:
		door.prop( "disabled", true );
		break;
		case Elevator.TAG_BUSY: case Elevator.TAG_AVAILABLE:
		door.prop( "disabled", false );
		break;
	}
}

function updateStatusIndicator(id, status){
	var statusIndicator = $('#elevator' + id + '-status-indicator');
	var elevatorImage = $("#elevator" + id);
	switch (status) {
		case Elevator.TAG_GOING_DOWN:
		statusIndicator.html("&#9660;");
		break;
		case Elevator.TAG_GOING_UP:
		statusIndicator.html("&#9650;");
		break;
		case Elevator.TAG_BUSY:
		elevatorImage.attr("src", "img/open.jpg");
		statusIndicator.html("&#9676;");
		break;
		case Elevator.TAG_AVAILABLE:
		elevatorImage.attr("src", "img/closed.jpg");
		statusIndicator.html("&#10003;");
		break;
		case Elevator.TAG_UNDER_MAINTENANCE:
		statusIndicator.html("&#9888;");
		break;
	}
}
