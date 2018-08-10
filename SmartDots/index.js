// let population = new Population(10) // create a population with 1000 members

let goalx = 300
let goaly = 5

let p = new Population(1000)

function setup() {
  // Draw canvas
  createCanvas(600, 600)
}

function draw() {
  // Draw goal
  background(200)
  fill(255, 0, 0)
  ellipse(goalx, goaly, 10, 10)

  if (p.allDead()) {
    p.naturalSelection()
    p.mutatePopulation()
  } else {
    p.update()
    p.draw()
  }
}
