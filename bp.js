const swap = (a, b) => {
  let t = a;
  a = b;
  b = t;
}
let waysTable = [
  [-1, 3.6, 8.6, 9.6, 8.6, 6.0, 4.6],
  [3.6, -1, 8.0, -1, -1, -1, 3.0],
  [8.6, 8.0, -1, 6, -1, -1, -1],
  [9.6, -1, 6, -1, 12.5, -1, -1],
  [8.6, -1, -1, 12.5, -1, 5, -1],
  [6.0, -1, -1, -1, 5.0, -1, 5.0],
  [4.6, 3.0, -1, -1, -1, 5, -1],
];
let c = waysTable;
let n = waysTable.length;
let cp = 0;
let bestp = 999999;
let bestx = [];
const traveling = (t) => {
  if (t > n) {
    if ((a[x[n]][1]) && (a[x[n]][1] + cp < bestp)) {
      bestp = a[x[n]][1] + cp;
      for (let i = 1; i <= n; i++) {
        bestx[i] = x[i];
      }
    }
  } else {
    for (let i = t; i <= n; i++) {
      /*约束为当前节点到下一节点的长度不为0,限界为走过的长度+当前要走的长度之和小于最优长度*/
      if ((a[x[t - 1]][x[i]]) && (cp + a[x[t - 1]][x[i]] < bestp)) {
        swap(x[t], x[i]);
        cp += a[x[t - 1]][x[t]];
        backpack(t + 1);
        cp -= a[x[t - 1]][x[t]];
        swap(x[t], x[i]);
      }
    }
  }
}

traveling(2);
console.log(bestp);
console.log(bestx);