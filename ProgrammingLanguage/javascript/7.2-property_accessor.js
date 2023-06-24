// 上节是数据属性，这节是访问器属性
// 是互斥的，一个属性只能是其中一种

let obj = {
  get propName() {
    // 当读取 obj.propName 时，getter 起作用
  },

  set propName(value) {
    // 当执行 obj.propName = value 操作时，setter 起作用
  }
};


// 也可以通过属性描述符来定义访问器属性
let user = {
  name: "John",
  surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname

// 访问器的另一好处是兼容性，比如我们不想改老代码的属性，但有需求需要新的属性时， 且该新属性跟老代码的属性相关时，可以塞一个访问器进去