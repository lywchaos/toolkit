let arr = ["Apple", "Orange", "Pear"];

for (let i = 0; i < arr.length; i++) {
  alert( arr[i] );
}

let fruits = ["Apple", "Orange", "Plum"];

// 遍历数组元素; 注意用的是 of 而不是 in，因为 in 是用于对象的
for (let fruit of fruits) {
  alert( fruit );
}

// length 属性很神奇
let arr1 = [1, 2, 3, 4, 5];

arr1.length = 2; // 截断到只剩 2 个元素
alert( arr1 ); // [1, 2]

arr1.length = 5; // 又把 length 加回来
alert( arr1[3] ); // undefined：被截断的那些数值并没有回来

// forEach
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});