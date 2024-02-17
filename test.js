class Options {
  constructor() {
    this.options = 0;
  }

  increaseOptions() {
    this.options++;
  }

  getOptions() {
    return this.options;
  }
}

const obj1 = new Options();
obj1.increaseOptions();
console.log(obj1.getOptions());
