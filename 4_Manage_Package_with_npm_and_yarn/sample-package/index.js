console.log("require for run");

module.exports = {  // module.exports는 require를 통해 불러왔을 때, 노출할 객체를 저장하는 변수
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    multi: (a, b) => a * b,
    div: (a, b) => a / b
}