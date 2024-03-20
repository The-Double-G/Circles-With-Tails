// Initialize canvas
var canvas = document.querySelector("canvas") 
canvas.width = window.innerWidth 
canvas.height = window.innerHeight 
var ctx = canvas.getContext("2d") 
//made by gurpreet
// Define Circle class
class Circle {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x 
        this.y = y 
        this.radius = radius 
        this.color = color 
        this.dx = dx 
        this.dy = dy 
        this.tail = []  // Initialize tail array
        this.tailMaxLength = 50  // Maximum length of tail
    }

    draw() {
        ctx.fillStyle = this.color 
        ctx.beginPath() 
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2) 
        ctx.fill() 
    }
//made by gurpreet
    update() {
        // Add new circle to the tail
        this.tail.unshift({ x: this.x, y: this.y, radius: this.radius }) 
        // Ensure tail length does not exceed maximum
        if (this.tail.length > this.tailMaxLength) {
            this.tail.pop() 
        }
        // Update main circle position
        this.x += this.dx 
        this.y += this.dy //made by gurpreet
    }

    bounce() {
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.dx = -this.dx  // Reverse direction on x-axis
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.dy = -this.dy  // Reverse direction on y-axis
        }//made by gurpreet
    }

    drawTail() {
        for ( var i = 0 ; i < this.tail.length ; i++) {
             var invisibility = 1 - (i / this.tail.length) * 2 
            if (invisibility <= 0){
                break 
            }
            var tailCircle = this.tail[i] 
            ctx.fillStyle = "rgba("+parseInt(this.color.slice(1, 3), 16)+","+parseInt(this.color.slice(3, 5), 16)+","+parseInt(this.color.slice(5, 7), 16)+","+invisibility
            ctx.beginPath() 
            ctx.arc(tailCircle.x, tailCircle.y, tailCircle.radius, 0, Math.PI * 2) 
            ctx.fill() 
        }//made by gurpreet
    }

    randomizeSpeed(maxSpeed)
    {
        this.dx = maxSpeed * (2*Math.random() - 1)
        this.dy = maxSpeed * (2*Math.random() - 1)
    }
}
// Helper function to generate a random color
function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16) 
}//made by gurpreet


// Create main circle
var mainCircle = new Circle(canvas.width / 2, canvas.height / 2, 50, randomColor(),0,0) 
mainCircle.randomizeSpeed(50)

// Animation loop
function animate() {
    requestAnimationFrame(animate) 
    ctx.clearRect(0, 0, canvas.width, canvas.height) 

    mainCircle.draw() 
    mainCircle.update() 
    mainCircle.bounce() //made by gurpreet
    mainCircle.drawTail() 
}

animate() 
//made by gurpreet
// Event listener for keydown events
window.addEventListener("keydown", function(event)
{
    if (event.key === 'r') {
        mainCircle.tail = []  // Reset tail
    } else if (event.key === '1') {
        mainCircle.tailMaxLength++  // Increase tail length
    } else if (event.key === '2') {
        if (mainCircle.tailMaxLength > 0) {
            mainCircle.tailMaxLength--  // Decrease tail length
        }//made by gurpreet
    }
})
