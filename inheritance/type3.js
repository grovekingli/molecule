function Person(name) {
    this.name = name;
}

function Student(name, grade) {
    Person.call(this, name)
    this.grade = grade;
}

//TODO...
