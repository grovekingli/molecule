class Person {
    constructor(name){
        this.name = name;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    sayName() {
        console.log('My name is ' + this.getName() + '.');
    }
}

class Student extends Person {
    constructor(name, grade){
        super(name)
        this.grade = grade;
    }
}

let studentObj = new Student('lxy', 1);

console.log(studentObj.name, studentObj.grade);
studentObj.setName('lxx');
studentObj.sayName();