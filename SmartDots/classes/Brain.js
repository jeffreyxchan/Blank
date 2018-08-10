class Brain {
  // Public

  constructor(numSteps) {
    this.stepIndex = 0
    this.totalSteps = numSteps

    this.steps = []
    this.randomizeSteps()
  }

  clone() {
    // Returns a clone of this brain

    let clone = new Brain(this.totalSteps)
    for (let k = 0; k < this.totalSteps; k++) {
      let originalStepX = this.steps[k][0]
      let originalStepY = this.steps[k][1]
      let stepCopy = [originalStepX, originalStepY]
      clone.steps[k] = stepCopy
    }

    return clone
  }

  mutate() {
    // Mutates some of the steps of this brain
    // For each step, there is a 10% chance of it being
    // mutated to some new step

    let mutationRate = 0.01

    for (let k = 0; k < this.totalSteps; k++) {
      let rand = Math.random()
      if (rand < mutationRate) {
        let newStepX = Math.random() * 2 - 1
        let newStepY = Math.random() * 2 - 1
        let newStep = [newStepX, newStepY]
        this.steps[k] = newStep
      }
    }
  }

  // Private

  randomizeSteps() {
    for (let k = 0; k < this.totalSteps; k++) {
      let randomStepX = Math.random() * 2 - 1
      let randomStepY = Math.random() * 2 - 1
      this.steps.push([randomStepX, randomStepY])
    }
  }
}
