let user = { };

Object.defineProperty(user, "name", {
  value: "John",
  // 对于新属性，我们需要明确地列出哪些是 true
  enumerable: true,
  configurable: true
});

alert(user.name); // John
user.name = "Pete"; // Error, because `writable` is not provided, which means it's false

// 这也叫做数据属性