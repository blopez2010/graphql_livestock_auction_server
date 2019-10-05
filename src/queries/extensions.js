module.exports = {
	paginate: ({ page, pageSize }) => {
		const offset = page * pageSize;
		const limit = pageSize;

		return {
			offset,
			limit
		};
	},
	sortBy: (sortColumn, sortDirection) => {
		if (sortColumn && sortDirection) {
			return { order: [ [ sortColumn, sortDirection ] ] };
		}

		return {};
	}
};
