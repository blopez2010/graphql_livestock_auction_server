const xlsx = require('xlsx');
const db = require('./src/models');

const wb = xlsx.readFile('./imports/Bids2017.xlsx', { cellDates: true, cellNF: false, cellText: false });

const people = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
  skipHeader: true,
  dateNF: 'YYYY-MM-DD'
});
const items = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]], {
  skipHeader: true,
  dateNF: 'YYYY-MM-DD'
});
const transactions = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[2]], {
  skipHeader: true,
  dateNF: 'YYYY-MM-DD'
});

const eventId = '7ae68d1b-868c-4f90-86e6-5e97b965096c';

people.forEach(async p => {
  const foundPeople = await db.people.findOne({ where: { personId: p.PersonId } });
  if (foundPeople) {
    await createItems(foundPeople);
  } else {
    db.people
      .create({
        personId: p.PersonId,
        address: p.DistrictId,
        name: p.Name,
        nickname: p.Nickname,
        phoneNumber: p.PhoneNumber,
        externalIdentifier: p.ExternalIdentifier,
        createdAt: new Date(p.DateCreated),
        updatedAt: new Date(p.DateCreated)
      })
      .then(createdPeople => {
        createItems(createdPeople);

        return Promise.resolve(createdPeople);
      });
  }
});

async function createItems(createdPeople) {
  items
    .filter(it => it.OwnerId === createdPeople.personId)
    .forEach(async item => {
      await db.item
        .create({
          eventId,
          ownerId: createdPeople.id,
          ordinal: item.ItemId,
          createdAt: new Date(item.DateCreated),
          description: item.Name
        })
        .then(async createdItem => {
          createTransactions(createdItem);

          return Promise.resolve(createdItem);
        });
    });
};

async function createTransactions (createdItem) {
  transactions
    .filter(t => t.ItemId === createdItem.ordinal)
    .forEach(async transaction => {
      const buyer = await db.people.findOne({
        where: {
          personId: transaction.BuyerId
        }
      });

      await db.transaction.create({
        eventId,
        itemId: createdItem.id,
        buyerId: buyer.id,
        amount: transaction.TotalAmount,
        isDonated: transaction.IsDonated,
        isPayed: transaction.IsLastBuyer,
        isLastBuyer: transaction.IsLastBuyer,
        paymentMethod: transaction.PaymentMethodId,
        paymentReference: transaction.PaymentReferenceId,
        createdAt: new Date(transaction.DateCreated)
      });
    });
};
