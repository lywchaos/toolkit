let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true


// 每个函数都有默认的 prototype 属性
function Rabbit() {}

/* 默认的 prototype
Rabbit.prototype = { constructor: Rabbit };
*/