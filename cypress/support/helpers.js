function valida_corpo_reserva(resposta, dadosEsperados) {
    expect(resposta.body.firstname).to.equal(dadosEsperados.firstname)
    expect(resposta.body.lastname).to.equal(dadosEsperados.lastname)
    expect(resposta.body.totalprice).to.equal(dadosEsperados.totalprice)
    expect(resposta.body.depositpaid).to.equal(dadosEsperados.depositpaid)
    expect(resposta.body.additionalneeds).to.equal(dadosEsperados.additionalneeds)
    expect(resposta.body.bookingdates.checkin).to.equal(dadosEsperados.bookingdates.checkin)
    expect(resposta.body.bookingdates.checkout).to.equal(dadosEsperados.bookingdates.checkout)
}

module.exports = { valida_corpo_reserva }