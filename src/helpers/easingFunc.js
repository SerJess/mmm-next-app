/* eslint-disable */

const easingFunc = (t, b, c, d) => {
	if ((t /= d / 2) < 1) {
		return (c / 2) * t * t + b;
	}
	return (-c / 2) * (--t * (t - 2) - 1) + b;
};

export default easingFunc;
