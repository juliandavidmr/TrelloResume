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

export function permission(data) {
	return data.prefs.permissionLevel;
}

export function cards(data) {
	return data.cards;
}

export function list(data) {
	return data.lists;
}


/**
 * Get string all labels of a card
 * @param {[]} card 
 * @returns {string} 
 */
export function getLabels(card) {
  if (card && card.labels) {
    return card.labels.map(l => l.name).join(', ')
  }
  return ''
}