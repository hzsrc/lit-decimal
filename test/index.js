var Decimal = require('../index')

//test
test(new Decimal(0.1).add(0.2).valueOf(), 0.3, 'add')
test(new Decimal(0.7).add(0.1).valueOf(), 0.8, 'add')
test(new Decimal(1.5).subs(1.2).valueOf(), 0.3, 'subs')
test(new Decimal(0.3).subs(0.2).valueOf(), 0.1, 'subs')
test(new Decimal(19.9).times(100).valueOf(), 1990, 'times')
test(new Decimal(9.7).times(100).valueOf(), 970, 'times')
test(new Decimal(0.3).divide(0.1).valueOf(), 3, 'divide')
test(new Decimal(0.69).divide(10).valueOf(), 0.069, 'divide')
//Big
test(new Decimal(666666666.166678).divide(786666666.2434523).add(6.66989451684614).times(1.23564582393).subs(33666666.345645).valueOf(), -33666657.05686022, 'Big')

function test(ret, tobe, msg) {
    if (ret !== tobe) console.error(msg, ret, tobe)
}