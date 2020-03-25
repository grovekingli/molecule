/**
 * Promise类
 * 使用es5语法实现一个promise
 */

/**
 * static 
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

/**
 * constructor
 * @param {function} fn 
 */
function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._status = PENDING;
  this._value = undefined;

  this._fulfilledQueues = [];
  this._rejectedQueues = [];

  try {
    fn(this._resolve.bind(this), this._reject.bind(this));
  } catch (err) {
    this._reject.bind(err);
  }
}

Promise.prototype._resolve = function (val) {
  var that = this;
  const run = function () {
    if (that._status !== PENDING) return
    that._status = FULFILLED;
    // 依次执行成功队列中的函数，并清空队列
    const runFulfilled = function (value) {
      var cb;
      while (cb = that._fulfilledQueues.shift()) {
        cb(value);
      }
    }
    // 依次执行失败队列中的函数，并清空队列
    const runRejected = function (error) {
      var cb;
      while (cb = that._rejectedQueues.shift()) {
        cb(error);
      }
    }
    /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
      当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
    */
    if (val instanceof Promise) {
      val.then(function (value) {
        that._value = value;
        runFulfilled(value);
      }, err => {
        that._value = err;
        runRejected(err);
      })
    } else {
      that._value = val;
      runFulfilled(val);
    }
  }
  // 为了支持同步的Promise，这里采用异步调用
  setTimeout(run, 0);
}


Promise.prototype._reject = function (err) {
  var that = this;
  if (this._status !== PENDING) return
  // 依次执行失败队列中的函数，并清空队列
  const run = function () {
    that._status = REJECTED;
    that._value = err;
    var cb;
    while (cb = that._rejectedQueues.shift()) {
      cb(err);
    }
  }
  // 为了支持同步的Promise，这里采用异步调用
  setTimeout(run, 0);
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  var that = this;
  var _value = that._value;
  var _status = that._status;

  return new Promise(function (onFulfilledNext, onRejectedNext) {
    var fulfilled = function (value) {
      try {
        if (typeof onFulfilled !== 'function') {
          onFulfilledNext(value);
        } else {
          var res = onFulfilled(value);
          if (res instanceof Promise) {
            // 如果当前回调函数返回Promise对象，必须等待其状态改变后在执行下一个回调
            res.then(onFulfilledNext, onRejectedNext);
          } else {
            // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
            onFulfilledNext(res);
          }
        }
      } catch (err) {
        onRejectedNext(err);
      }
    }

    var rejected = function (error) {
      try {
        if (typeof onRejected !== 'function') {
          onRejectedNext(error);
        } else {
          var res = onRejected(value);
          if (res instanceof Promise) {
            // 如果当前回调函数返回Promise对象，必须等待其状态改变后在执行下一个回调
            res.then(onFulfilledNext, onRejectedNext);
          } else {
            // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
            onFulfilledNext(res);
          }
        }
      } catch (err) {
        onRejectedNext(err);
      }
    }

    switch (_status) {
      case PENDING:
        that._fulfilledQueues.push(fulfilled);
        that._rejectedQueues.push(rejected);
        break
      case FULFILLED:
        fulfilled(_value);
        break
      case REJECTED:
        rejected(_value);
        break
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
}

Promise.resolve = function (value) {
  // 如果参数是Promise实例，直接返回这个实例
  if (value instanceof Promise) return value;
  return new Promise(function (resolve) { resolve(value) });
}

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) { reject(value) });
}

Promise.all = function (list) {
  var that = this;
  return new Promise(function (resolve, reject) {
    var values = [];
    var count = 0;
    list.forEach(function (p, i) {
      that.resolve(p).then(function (res) {
        values[i] = res;
        count++;
        // 所有状态都变成fulfilled时返回的Promise状态就变成fulfilled
        if (count === list.length) resolve(values);
      }, function (err) {
        // 有一个被rejected时返回的Promise状态就变成rejected
        reject(err);
      })
    });
  });
}

Promise.race = function (list) {
  var that = this;
  return new Promise(function (resolve, reject) {
    list.forEach(function (p) {
      // 只要有一个实例率先改变状态，新的Promise的状态就跟着改变
      that.resolve(p).then(function (res) {
        resolve(res);
      }, function (err) {
        reject(err);
      })
    });
  });
}

Promise.prototype.finally = function (cb) {
  return this.then(
    function (value) { Promise.resolve(cb()).then(function () { value }) },
    function (reason) { Promise.resolve(cb()).then(function () { throw reason }) }
  );
}