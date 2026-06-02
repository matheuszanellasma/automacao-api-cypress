import { faker } from '@faker-js/faker';

function gera_reserva({
    firstname,
    lastname,
    totalprice,
    depositpaid,
    checkin,
    checkout,
    additionalneeds
} = {}) {
    return {
        firstname: firstname ?? faker.person.firstName(''),
        lastname: lastname ?? faker.person.lastName(),
        totalprice: totalprice ?? faker.number.int({ min: 0, max: 1000 }),
        depositpaid: depositpaid ?? faker.datatype.boolean(),
        bookingdates: {
            checkin: checkin ?? faker.date.past().toISOString().split('T')[0],
            checkout: checkout ?? faker.date.future().toISOString().split('T')[0]
        },
        additionalneeds: additionalneeds ?? faker.lorem.sentence({ min: 2, max: 5 })
    };
}

module.exports = { gera_reserva }