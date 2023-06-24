try {
  lalala; // error, variable is not defined!
} catch (err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // 也可以将一个 error 作为整体显示出来
  // error 信息被转换为像 "name: message" 这样的字符串
  alert(err); // ReferenceError: lalala is not defined
}


// throw
let json = '{ "age": 30 }'; // 不完整的数据

try {

  let user = JSON.parse(json); // <-- 没有 error

  if (!user.name) {
    throw new SyntaxError("数据不全：没有 name"); // (*)
  }

  alert( user.name );

} catch(err) {
  alert( "JSON Error: " + err.message ); // JSON Error: 数据不全：没有 name
}

// finally
/*
try {
   ... 尝试执行的代码 ...
} catch (err) {
   ... 处理 error ...
} finally {
   ... 总是会执行的代码 ...
}
*/