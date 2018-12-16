let colors = [], colors2, colors3;
let iterator = {val: 0};
let iterator2 = {val: 0};
let iterator3 = {val: 0};

function setup() {
	createCanvas(800, 500);
	colorMode(HSB);

	for (let i = 0; i < width; i++) {
		let h = int(random(255));
		let s = int(random(255));
		let b = int(random(255));
		colors.push(color(h, s, b));
	}

	colors2 = colors.slice();
	colors3 = colors.slice();
}

function draw() {
	if (iterator.val < colors.length) {
		runSort(colors, iterator, "hue", getHue, 0, height/3);
		runSort(colors2, iterator2, "saturation", getSaturation, height/3, height - height/3);
		runSort(colors3, iterator3, "brightness", getBrightness, height - height/3, height);
	}

	else {
		print("finished");
		noLoop();
	}
}

function swap(array, a, b) {
	let temp = array[a]
	array[a] = array[b];
	array[b] = temp;
}

function getHue(color){
	return color._getHue();
}

function getSaturation(color){
	return color._getSaturation();
}

function getBrightness(color){
	return color._getBrightness();
}

function runSort(array, iterator, sortingMethod, fn, yStart, yEnd){
	for (let j = 0; j < array.length - iterator.val - 1; j++) {
			let a = array[j];
			let b = array[j + 1];

			if (fn(a) > fn(b)){
				swap(array, j, j + 1);
			}
		}
	iterator.val++;
	if (iterator.val === array.length){
		print(`finished sorting by ${sortingMethod}`);
	}

	for (let i = 0; i < array.length; i++) {
		stroke(array[i]);
		line(i, yStart, i, yEnd);
	}
}