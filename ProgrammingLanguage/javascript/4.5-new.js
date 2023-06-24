function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false

// 技术上讲，任何函数（除了箭头函数，它没有自己的 this）都可以用作构造器。即可以通过 new 来运行，它会执行上面的算法。“首字母大写”是一个共同的约定，以明确表示一个函数将被使用 new 来运行


// 创建单个复杂对象的小技巧
// 创建一个函数并立即使用 new 调用它
let user2 = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ……用于用户创建的其他代码
  // 也许是复杂的逻辑和语句
  // 局部变量等
};