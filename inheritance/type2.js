// 借用构造函数继承

// 定义Person类
function Person(name) {
    this.name = name;
}

// 定义student类
function Student(name, grade) {
    Person.call(this, name)
    this.grade = grade;
}

var studentObj = new Student('lxy',1);

console.log(studentObj.name, studentObj.grade);