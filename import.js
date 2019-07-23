const xlsx = require('xlsx');
const db = require('./src/models');

const wb = xlsx.readFile('./imports/Bids 2007.xlsx');

const people = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
  skipHeader: true
});
const items = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]], {
  skipHeader: true
});
const transactions = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[2]], {
  skipHeader: true
});

const eventId = '2f3bcd1f-a574-4f42-9257-ccb4319cb8de';

people.forEach(p => {
  db.people
    .create({
      personId: p.PersonId,
      address: p.DistrictId,
      name: p.Name,
      nickname: p.Nickname,
      phoneNumber: p.PhoneNumber,
      externalIdentifier: p.ExternalIdentifier,
      createdAt: new Date('2016-08-07'),
      updatedAt: new Date('2016-08-07')
    })
    .then(createdPeople => {
      items
        .filter(it => it.OwnerId === createdPeople.personId)
        .forEach(async item => {
          await db.item
            .create({
              eventId,
              ownerId: createdPeople.id,
              ordinal: item.ItemId,
              createdAt: item.DateCreated,
              description: item.Name
            })
            .then(async createdItem => {
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
                    createdAt: new Date('2016-08-07'),
                  });
                });
            });
        });
    });
});
