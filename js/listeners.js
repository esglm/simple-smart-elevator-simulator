"use strict";

var watch = WatchJS.watch;

$("#elevator1-toggle-door-button").click(function() {
	elevator1.toggleDoor();
});

$("#elevator2-toggle-door-button").click(function() {
	elevator2.toggleDoor();
});

$("#elevator3-toggle-door-button").click(function() {
	elevator3.toggleDoor();
});

$("#elevator4-toggle-door-button").click(function() {
	elevator4.toggleDoor();
});

// Listen elevator statuses and update doors
watch(elevator1, 'status', function (prop, action, newval, _oldval) {
	updateStatusIndicator(1, newval);
	updateDoorToggleButton(1, newval);
});
watch(elevator2, 'status', function (prop, action, newval, _oldval) {
	updateStatusIndicator(2, newval);
	updateDoorToggleButton(2, newval);
});
watch(elevator3, 'status', function (prop, action, newval, _oldval) {
	updateStatusIndicator(3, newval);
	updateDoorToggleButton(3, newval);
});
watch(elevator4, 'status', function (prop, action, newval, _oldval) {
	updateStatusIndicator(4, newval);
	updateDoorToggleButton(4, newval);
});

// Listen floor informations
watch(elevator1, 'floor', function (prop, action, newval, oldval) {
	updateFloorIndicator(1, newval);
});
watch(elevator2, 'floor', function (prop, action, newval, oldval) {
	updateFloorIndicator(2, newval);
});
watch(elevator3, 'floor', function (prop, action, newval, oldval) {
	updateFloorIndicator(3, newval);
});
watch(elevator4, 'floor', function (prop, action, newval, oldval) {
	updateFloorIndicator(4, newval);
});

// Listen targets information to update internal buttons
watch(elevator1, 'targets', function (prop, action, newval, oldval) {
	updateInternalButton(1, Utils.differenceOfTwoArray(oldval, newval));
});
watch(elevator2, 'targets', function (prop, action, newval, oldval) {
	updateInternalButton(2, Utils.differenceOfTwoArray(oldval, newval));
});
watch(elevator3, 'targets', function (prop, action, newval, oldval) {
	updateInternalButton(3, Utils.differenceOfTwoArray(oldval, newval));
});
watch(elevator4, 'targets', function (prop, action, newval, oldval) {
	updateInternalButton(4, Utils.differenceOfTwoArray(oldval, newval));
});
