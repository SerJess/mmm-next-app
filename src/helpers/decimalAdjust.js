const decimalAdjust = (val, ex = 8) => {
	if (typeof ex === "undefined" || +ex === 0) {
		return Math.round(val);
	}

	let value = +val;
	const exp = +ex;

	if (!value) {
		return 0;
	}
	if (Number.isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
		return NaN;
	}

	// Shift
	value = value.toString().split("e");
	value = Math.round(+`${value[0]}e${value[1] ? +value[1] + exp : exp}`);

	// Shift back
	value = value.toString().split("e");
	return +`${value[0]}e${value[1] ? +value[1] - exp : -exp}`;
};
export default decimalAdjust;
