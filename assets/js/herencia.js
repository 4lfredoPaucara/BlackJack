class Animal {
    hacerSonido(){
        console.log('Algun sonido de animal');
    }
}

class Dog extends Animal {
    hacerSonido(){
        console.log('Woof!!');
    }
}

class Cat extends Animal {
    hacerSonido(){
        console.log('Miau');
    }
}

class Duck extends Animal {
    hacerSonido(){
        console.log('Cuak');
    }
}

const dog = new Dog();

dog.hacerSonido();