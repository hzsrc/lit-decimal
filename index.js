//self.BigInt = undefined //模拟IE没有BigInt
var prec = 16
var precPow
var BI
if (typeof BigInt === 'undefined') {
    //IE没有BigInt，不支持大数。只能模拟一个，6位小数
    BI = function (num) {
        if (nInf(num)[1] > 6) num = Number(num.toFixed(6))
        return {
            valueOf() {
                return num
            }
        }
    }
    prec = 0
    precPow = 1
} else {
    BI = BigInt
    precPow = BI(Math.pow(10, prec))
}

var BIG1 = BI(Number.MAX_SAFE_INTEGER)
var BIG2 = BI(Number.MIN_SAFE_INTEGER)

function Decimal(num, pointN) {
    var inf = nInf(num)
    this.v = inf[1] > 0 ? BI(Math.round(inf[0] * Math.pow(10, inf[1]))) : BI(inf[0])
    this.pt = inf[1] + (pointN || 0) //小数点位置。比如2表示 this.v/100 才为实际值
}

function nInf(num) {
    var val = num || 0
    var prec = (val.toString().split('.')[1] || '').length;
    return [val, prec]
}

function powN(n) {
    return BI(Math.pow(10, n))
}

function add(d1, d2, isAdd) {
    var p10 = Math.max(d1.pt, d2.pt)
    var v1 = d1.v * powN(p10 - d1.pt)
    var v2 = d2.v * powN(p10 - d2.pt)
    var r = isAdd ? v1 + v2 : v1 - v2
    return new Decimal(r, p10)
}

Decimal.prototype = {
    add: function (num) {
        return add(this, new Decimal(num), true)
    },
    subs: function (num) {
        return add(this, new Decimal(num), false)
    },
    times: function (num) {
        var d1 = this
        var d2 = new Decimal(num)
        return new Decimal(d1.v * d2.v, d1.pt + d2.pt)
    },
    divide: function (num) {
        var d1 = this
        var d2 = new Decimal(num)
        return new Decimal(d1.v * precPow / d2.v, prec + d1.pt - d2.pt)
    },
    //还原为Number
    valueOf: function () {
        var pt = this.pt
        var v = this.v
        if (v > BIG1 || v < BIG2) {
            var s = v.toString()
            if (s.indexOf('object') > -1) {
                s = v.valueOf().toString() //IE
                if (s.indexOf('e'))
                    return Number(s) / Math.pow(10, pt) //科学计数
            }
            var zeros = 0
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] === '0') zeros++
                else break
            }
            s = s.substring(0, s.length - zeros)
            v = BI(s)
            pt -= zeros
        }
        return Number(v) / Math.pow(10, pt)
    }
}
module.exports = Decimal