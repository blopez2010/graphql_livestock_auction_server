module.exports = {
	paginate: ({ page, pageSize }) => {
		const offset = page * pageSize;
		const limit = pageSize;

		return {
			offset,
			limit
		};
	},
	sortBy: (sortColumn, sortDirection, db) => {
		if (sortColumn.indexOf('.') !== -1) {
			return { order: [ [ db[sortColumn.split('.')[0].toLowerCase()], sortColumn.split('.')[1], sortDirection ] ] };
		}

		if (sortColumn && sortDirection) {
			return { order: [ [ sortColumn, sortDirection ] ] };
		}

		return {};
	}
};
