class Population {
  // Public

  constructor(numDots) {
    this.dots = []
    this.numDots = numDots
    for (let k = 0; k < numDots; k++) {
      this.dots.push(new Dot())
    }

    this.gen = 1
  }

  allDead() {
    // Returns whether all dots in the population are dead

    for (let k = 0; k < this.numDots; k++) {
      if (this.dots[k].alive && !this.dots[k].reachedGoal) {
        return false
      }
    }

    return true
  }

  update() {
    // Updates all the dots in the population

    for (let k = 0; k < this.numDots; k++) {
      this.dots[k].update()
    }
  }

  draw() {
    // Draws all dots in the population

    for (let k = 1; k < this.numDots; k++) {
      this.dots[k].draw()
    }
    this.dots[0].draw()
  }

  naturalSelection() {
    // Gets the next generation of dots
    this.gen += 1
    console.log('Generation: ', this.gen)

    let newDots = []

    // The best dot will live into the next generation
    let bestDotIndex = 0
    let bestFitness = 0
    for (let k = 0; k < this.numDots; k++) {
      if (this.dots[k].getFitness() > bestFitness) {
        bestFitness = this.dots[k].getFitness()
        bestDotIndex = k
      }
    }
    let bestDot = this.dots[bestDotIndex].getOffspring()
    bestDot.isBest = true
    newDots.push(bestDot)

    for (let k = 1; k < this.numDots; k++) {
      let parent = this.selectParent()
      newDots.push(parent.getOffspring())
    }

    this.dots = newDots
  }

  mutatePopulation() {
    for (let k = 1; k < this.numDots; k++) {
      this.dots[k].brain.mutate()
    }
  }

  // Private

  selectParent() {
    let fitnessSum = 0
    for (let k = 0; k < this.numDots; k++) {
      fitnessSum += this.dots[k].getFitness()
    }

    let rand = Math.floor(Math.random() * fitnessSum)

    let runningSum = 0
    for (let k = 0; k < this.numDots; k++) {
      runningSum += this.dots[k].getFitness()
      if (runningSum > rand) {
        return this.dots[k]
      }
    }

    return null
  }
}
