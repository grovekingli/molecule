const printDp = (dp) => {
  dp.forEach(row => {
    console.log(row.join(','));
    //console.log(' \n');
  });
}
const reduceSet = (set) => {
  let resSet = [];
  for (let i = 0; i < set.length; i++) {
    if (set[i] == 1) {
      let t = set.split('');
      t[i] = 0;
      resSet.push({
        k: set.length-i,
        set: parseInt(t.join(''),2).toString(2)
      });
    }
  }

  return resSet;
};
const toDec = (bin) => {
  return parseInt(bin, 2);
}
const toBin = (dec) => {
  return dec.toString(2);
}

const min = (...args) => {
  let res;
  let index = 0;
  args.forEach((num,i) => {
    if (num !== '-1') {
      if (!res) {
        res = num;
        index = i;
      } else {
        if (num < res) {
          res = num;
          index = i;
        }
      }
    }
  })

  res = res ? res : -1;

  return {res,index};
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
// waysTable = [
//   [-1, 10, 15, -1],
//   [10, -1, 35, 25],
//   [15, 35, -1, 30],
//   [-1, 25, 30, -1]
// ];
// waysTable = [
//   [-1, 3.6, 8.6, 9.6, 8.6, 6.0, 4.6],
//   [3.6, -1, 8.0, -1, -1, -1, 3.0],
//   [8.6, 8.0, -1, 6, -1, -1, -1],
//   [9.6, -1, 6, -1, 1222.5, -1, -1],
//   [8.6, -1, -1, 1222.5, -1, 5, -1],
//   [6.0, -1, -1, -1, 555.0, -1, 5.0],
//   [4.6, 3.0, -1, -1, -1, 555.0, -1],
// ];
let c = waysTable;

let dp = [];

let dpPath = [];
let pointNum = waysTable.length;
let setNum = Math.pow(2, pointNum - 1);

for (let i = 0; i < pointNum; i++) {
  dp.push([]);
  dpPath.push([]);
  for (let j = 0; j < setNum; j++) {
    dp[i].push(0);
    dpPath[i].push('');
    if (j == 0) {
      let t = c[i][0] > 0 ? c[i][0] : -1
      dp[i][j] = t;
      dpPath[i][j] = `${i}-0`;
    }
  }
}

const getDp = (i, j) => {
  if (dp[i][j]) {
    return dp[i][j]
  } else {
    let binJ = toBin(j);
    if(i===0&&j===7){
      let oppp
    }
    let jSets = reduceSet(binJ);
    let dps = [];
    jSets.forEach(setObj => {
      let set = setObj.set;
      let k = setObj.k;
      let setDec = toDec(set);
      let dpRes = getDp(k, setDec);
      if (c[i][k] > -1 && dpRes > -1) {
        dps.push(c[i][k] + dpRes);
      } else {
        dps.push('-1');
      }
    });
    let minObj = min(...dps);
    let minIndex = minObj.index;
    let minSet = jSets[minIndex].set;
    let minPoint = jSets[minIndex].k;

    let nextPath = dpPath[minPoint][toDec(minSet)].slice(2);

    dpPath[i][j]=`${i}-${minPoint}-${nextPath}`

    return minObj.res;
  }
}

for (let i = 0; i < pointNum; i++) {
  for (let j = 0; j < setNum; j++) {
    if (j == 0) {
      let t = c[i][0] > 0 ? c[i][0] : -1;
      dp[i][j] = t;
    } else {
      dp[i][j] = getDp(i, j);
    }
  }
}

// printDp(dp)
console.log(dp[0][dp[0].length-1])
// printDp(dpPath)
console.log(dpPath[0][dpPath[0].length-1])