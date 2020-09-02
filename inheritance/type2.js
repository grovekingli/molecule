function Person(name) {
    this.name = name;
}

function Student(name, grade) {
    Person.call(this, name)
    this.grade = grade;
}

var studentObj = new Student('lxy',1);

console.log(studentObj.name, studentObj.grade);