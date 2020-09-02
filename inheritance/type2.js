// 借用构造函数继承

// 定义Person类
function Person(name) {
    this.name = name;
    this.setName = function(name){
        this.name = name;
    };
    this.getName = function() {
        return this.name;
    };
}

Person.prototype.sayName = function() {
    console.log('My name is ' + this.getName() + '.');
};

// 定义student类
function Student(name, grade) {
    Person.call(this, name)
    this.grade = grade;
}

var studentObj = new Student('lxy',1);

console.log(studentObj.name, studentObj.grade);
Student.sayName();