// 组合式继承

// 定义Person类
function Person(name) {
    this.name = name;
}

// 定义student类
function Student(name, grade) {
    Person.call(this, name)
    this.grade = grade;
}

//TODO...
