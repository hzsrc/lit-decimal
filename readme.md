# lit-decimal
精简版解决js中由于浮点数精度导致的各种数值不准确的问题。使用BigInt实现。代码极简，压缩后仅1k左右。

## 用法：
```js
// + - * /
console.log(new Decimal(0.1).add(0.2).valueOf()); // 0.3
console.log(new Decimal(0.7).add(0.1).valueOf()); // 0.8
console.log(new Decimal(1.5).subs(1.2).valueOf()); // 0.3
console.log(new Decimal(0.3).subs(0.2).valueOf()); // 0.1
console.log(new Decimal(19.9).times(100).valueOf()); // 1990
console.log(new Decimal(9.7).times(100).valueOf()); // 970
console.log(new Decimal(0.3).divide(0.1).valueOf()); // 3
console.log(new Decimal(0.69).divide(10).valueOf()); // 0.069
//Big number, chained call
console.log(new Decimal(666666666.166678).divide(786666666.2434523).add(6.66989451684614).times(1.23564582393).subs(33666666.345645).valueOf()); // -33666657.056860216
```

## 关于IE
对于不支持BigInt的浏览器（如IE），也可以基本支持，多数情况下可得到正确结果。超大数值可能不准，如确有需要可引用：https://www.npmjs.com/package/bigint-polyfill 。
