class Dot {
  // Public

  constructor() {
    this.pos = [canvasW / 2, canvasH - 15]
    this.vel = [0, 0]
    this.acc = [0, 0]

    this.brain = new Brain(150)

    this.isBest = false
    this.alive = true
    this.reachedGoal = false
    this.fitness = 0
  }

  draw() {
    // Draws the dot on the canvas

    if (this.isBest) {
      fill(0, 255, 0)
    } else {
      fill(0, 0, 255)
    }
    ellipse(this.pos[0], this.pos[1], 10, 10)
  }

  update() {
    // Updates the dots status by moving it if it can, and killing
    // it if needed

    let dx = this.pos[0] - goalx
    let dy = this.pos[1] - goaly

    // Mark as dead or reached goal if needed
    if (this.pos[0] < 5 || this.pos[1] < 5 || this.pos[0] > canvasW - 5 || this.pos[1] > canvasH - 5) {
      this.alive = false
    } else if (dx < 5 && dx > -5 && dy < 5 && dy > -5) {
      this.reachedGoal = true
    }

    // If still can move, move
    if (this.alive && !this.reachedGoal) {
      this.move()
    }
  }

  getFitness() {
    // Calculate the fitness of this dot

    if (this.reachedGoal) {
      return 1 + 9999999999.0 / frameCount
    } else {
      let deltaX = Math.pow(goalx - this.pos[0], 2)
      let deltaY = Math.pow(goaly - this.pos[1], 2)
      let squaredDistance = deltaX + deltaY
      let d = squaredDistance
      return 1.0 / d
    }
  }

  getOffspring() {
    // Returns a clone of this dot

    let offSpring = new Dot(this.brain.totalSteps)
    offSpring.brain = this.brain.clone()
    return offSpring
  }

  // Private

  move() {
    // Moves this dot according to the brain

    // If there are still steps left, make a move, else kill this dot
    if (this.brain.steps.length > this.brain.stepIndex) {
      this.acc = this.brain.steps[this.brain.stepIndex]
      this.brain.stepIndex += 1
    } else {
      this.alive = false
    }

    this.vel[0] += this.acc[0]
    this.vel[1] += this.acc[1]
    if (this.vel[0] > 5) this.vel[0] = 5
    if (this.vel[0] < -5) this.vel[0] = -5
    if (this.vel[1] > 5) this.vel[1] = 5
    if (this.vel[1] < -5) this.vel[1] = -5

    this.pos[0] += this.vel[0]
    this.pos[1] += this.vel[1]
  }
}
