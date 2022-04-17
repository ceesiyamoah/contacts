/**
 *
 * @param {*} data an array of objects with name keys
 * @returns array grouped by first letter of name
 */
const groupNamesByFirstLetter = (data) => {
	const mod = data.reduce((r, e) => {
		// get first letter of name of current element
		let group = e.name[0].toUpperCase();
		// if there is no property in accumulator with this letter create it
		if (!r[group]) r[group] = { group, children: [e] };
		// if there is push current element to children array for that letter
		else r[group].children.push(e);
		// return accumulator
		return r;
	}, {});
	return Object.values(mod).sort((a, b) => a.group.localeCompare(b.group));
};

export { groupNamesByFirstLetter };
