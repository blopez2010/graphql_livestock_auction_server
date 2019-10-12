module.exports = {
	itemsAttributes: [
		'id',
		'ownerId',
		'ordinal',
		'description',
		'externalIdentifier',
		'createdAt',
		'updatedAt',
		'eventId'
	],
	transactionsAttributes: [
		'id',
		'eventId',
		'itemId',
		'buyerId',
		'description',
		'amount',
		'isDonated',
		'isPayed',
		'isLastBuyer',
		'paymentMethod',
		'paymentReference',
		'paymentDate',
		'createdAt',
		'updatedAt'
	]
};
