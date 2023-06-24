// 为了解决回调地狱

let promise = new Promise(function(resolve, reject) {
  // executor（生产者代码，“歌手”）
});

promise.then(
  function(result) { /* handle a successful result */ },
  function(error) { /* handle an error */ }
);

// finally
new Promise((resolve, reject) => {
  /* 做一些需要时间的事，之后调用可能会 resolve 也可能会 reject */
})
  // 在 promise 为 settled 时运行，无论成功与否
  .finally(() => stop loading indicator)
  // 所以，加载指示器（loading indicator）始终会在我们继续之前停止
  .then(result => show result, err => show error)