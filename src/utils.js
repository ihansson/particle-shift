export function line_distance(line_a, line_b){
	const a = line_a[0] - line_b[0];
	const b = line_a[1] - line_b[1];
	return Math.sqrt( a*a + b*b );
}

export function random(to){
	return Math.floor((Math.random() * to) + 1)
}

export function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;

	}
	return array;
}