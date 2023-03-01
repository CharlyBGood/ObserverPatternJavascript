class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(o) {
    this.observers.push(o);
  }

  unsubscribe(o) {
    this.observers = this.observers.filter((e) => e != o);
  }

  notify(model) {
    this.observers.forEach((observer) => {
      observer.notify(model);
    });
  }
}

class TextSubject extends Subject {
  constructor() {
    super();
    this.text = "";
  }

  notify(text) {
    this.text = text;
    super.notify(this);
  }
}

class ObserverOne {
  notify(subject) {
    firstDiv.innerHTML = subject.text;
  }
}

class ObserverTwo {
  notify(subject) {
    secondDiv.innerHTML = `The length of the text you wrote is : ${subject.text.length}`;
  }
}

class ObserverThree {
  notify(subject) {
    if (subject.text.search("cerveza") > 0) {
      thirdDiv.innerHTML = ":)";
    } else {
      thirdDiv.innerHTML = ":(";
    }
  }
}

let firstDiv = document.getElementById("observer1");
let secondDiv = document.getElementById("observer2");
let thirdDiv = document.getElementById("observer3");
let textContent = document.getElementById("textarea");

var textSubject = new TextSubject();
let divOne = new ObserverOne();
let divTwo = new ObserverTwo();
let divThree = new ObserverThree();

textSubject.subscribe(divOne);
textSubject.subscribe(divTwo);
textSubject.subscribe(divThree);

textContent.addEventListener("input", (e) => {
  textSubject.notify(e.target.value);
});
