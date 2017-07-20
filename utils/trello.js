/**
 * @param {Object} input
 * @returns {Object}
 */
export function normal (input) {
	var out = {
		id: input.id,
		name: input.name,
		description: input.desc
	};
	return out;
}

export function members(data) {
	return data.members;
}

export function checklists(data) {
	return data.checklists;
}

export function name(data) {
	return data.name;
}