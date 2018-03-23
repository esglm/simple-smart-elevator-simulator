"use strict";

class Utils {
	static findMaxNumberIndex(numbers) {
		var max = numbers[0];
		var index = 0;
		for (var i = 0; i < numbers.length; i++) {
			if (numbers[i] > max) {
				max = numbers[i];
				index = i;
			}
		}
		return index;
	}

	static differenceOfTwoArray(a1, a2) {
		return $(a1).not(a2).get()[0] || $(a2).not(a1).get()[0];
	}
}
