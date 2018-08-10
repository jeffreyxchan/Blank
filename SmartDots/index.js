let goalx = 300
let goaly = 5

let maxCanvasW = 600
let canvasW = 0
let canvasH = 600

let p = new Population(1000)

function setup() {
  canvasW = Math.min(windowWidth - 10, maxCanvasW)
  goalx = canvasW / 2

  // Draw canvas
  let c = createCanvas(canvasW, canvasH)
  c.parent('sketch-holder')
}

function draw() {
  // Draw goal
  background(200)
  fill(255, 0, 0)
  ellipse(goalx, goaly, 10, 10)

  if (p.allDead()) {
    p.naturalSelection()
    p.mutatePopulation()
    document.getElementById('generation').innerHTML = 'Generation: ' + p.gen
  } else {
    p.update()
    p.draw()
  }
}
