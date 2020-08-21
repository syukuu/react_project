function fun() {
    this.name = 'mm';
}

var obj = new fun();
console.log(obj.name);
delete obj.name;
console.log(obj.name);

fun.prototype.age = 18;
delete obj.age;
console.log(obj.age)





var a = 'aa'
delete a
console.log(a);


function f?


