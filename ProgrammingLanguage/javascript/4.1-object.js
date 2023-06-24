// 基础
let user = new Object(); // “构造函数” 的语法

let user1 = {};  // “字面量” 的语法

let user2 = {     // 一个对象
  name: "John",  // 键 "name"，值 "John"
  age: 30,        // 键 "age"，值 30
};

alert( user2.name ); // John
alert( user2["name"] ); // John
alert( user2.age ); // 30
alert( user2["age"] ); // 30


// 计算属性
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // 属性名是从 fruit 变量中得到的
};

alert( bag.apple ); // 5 如果 fruit="apple"

let fruit_ = 'apple';
let bag_ = {
  [fruit + 'Computers']: 5 // bag_.appleComputers = 5
};

// 属性的名称只能是 字符串 或者 Symbol


let user3 = {};
alert( user3.noSuchProperty === undefined ); // true; 但注意，如果存在这个属性，但值为 undefined 的时候，也是 true, 所以一般用 in 来判断属性是否存在

let user4 = { name: "John", age: 30 };
alert( "age" in user4 ); // true，user.age 存在
alert( "blabla" in user4 ); // false，user.blabla 不存在。

let user5 = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user5) {
  // keys
  alert( key );  // name, age, isAdmin
  // 属性键的值
  alert( user5[key] ); // John, 30, true
}