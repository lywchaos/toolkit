// 函数声明
function sum(a, b) {
  return a + b;
}

// 函数表达式
let sum = function(a, b) {
  return a + b;
};

/*
函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用。
在函数声明被定义之前，它就可以被调用。
*/