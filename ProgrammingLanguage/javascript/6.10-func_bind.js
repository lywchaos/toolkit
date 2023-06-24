let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!

// 绑定上下文
let user1 = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

let funcuser1 = func.bind(user);
funcuser1(); // John


// bind 实际上也可以绑定参数

// let bound = func.bind(context, [arg1], [arg2], ...);