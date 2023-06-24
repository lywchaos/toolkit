let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

let longEar = {
  earLength: 10,
  __proto__: rabbit
};

// walk 是通过原型链获得的
longEar.walk(); // Animal walk
alert(longEar.jumps); // true（从 rabbit）

// __proto__ 是 [[Prototype]] 的因历史原因而留下来的 getter/setter; which means this is deprecated 