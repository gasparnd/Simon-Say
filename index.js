const btnStart = document.getElementById('btnStart')
const blue = document.getElementById('blue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const LAST_LEVEL = 10

class Game {

  constructor () {
    this.startGame = this.startGame.bind(this)
    this.startGame()
    this.generateSequence()
    setTimeout(this.nextLevel,300)
  }

  startGame () {
    this.nextLevel = this.nextLevel.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.toggleBtnStart()
    this.level = 1
    this.colors = {
      blue,
      violet,
      orange,
      green
    }
  }

  toggleBtnStart() {
    if (btnStart.classList.contains('hide')) {
      btnStart.classList.remove('hide')
    } else {
      btnStart.classList.add('hide')
    }
  }
        
  generateSequence() {

    this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  nextLevel() {

    this.sublevel = 0
    this.illuminateSequence()
    this.addEvents()
  } 

  numberToColor (num) {
    switch (num) {

      case 0:
        return 'blue'
      case 1:  
        return 'violet'
      case 2:
        return 'orange'
      case 3:
        return 'green'
    }
  }

  colorToNumber (color) {
    switch (color) {

      case 'blue':
        return 0
      case 'violet':  
        return 1
      case 'orange':
        return 2
      case 'green':
        return 3
    }
  }

  illuminateSequence() {

    for (let i=0; i < this.level; i++) {
      const color = this.numberToColor(this.sequence[i])
      setTimeout(() => this.illuminateColor(color), 1000 * i)
    }
  }

  illuminateColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.offColor(color), 400)
  }

  offColor(color) {
    this.colors[color].classList.remove('light')
  }

  addEvents() {

    this.colors.blue.addEventListener('click', this.selectColor)
    this.colors.violet.addEventListener('click', this.selectColor)
    this.colors.orange.addEventListener('click', this.selectColor)
    this.colors.green.addEventListener('click', this.selectColor)
  }

  removeEvents() {

    this.colors.blue.removeEventListener('click', this.selectColor)
    this.colors.violet.removeEventListener('click', this.selectColor)
    this.colors.orange.removeEventListener('click', this.selectColor)
    this.colors.green.removeEventListener('click', this.selectColor)
  }

  selectColor(ev) {
    const nameColor = ev.target.dataset.color
    const numberColor = this.colorToNumber(nameColor)
    this.illuminateColor (nameColor)

    if (numberColor === this.sequence[this.sublevel]) {
      this.sublevel++
      if (this.sublevel === this.level) {
        this.level++
        this.removeEvents()
        if (this.level === (LAST_LEVEL + 1)) {
          this.winGame()

        } else {
          setTimeout( this.nextLevel, 2000)

        }
      }

    } else {
      this.gameOver()
    }
  }

  winGame() {
    swal('Simon Say', 'You Win', 'success')
      .then(this.startGame)
  }

  gameOver() {
    swal('Simon Say', 'Game Over', 'error')
      .then(()=>{
        this.removeEvents()
        this.startGame()
      })
  }

}  


btnStart.addEventListener('click', startGame)

function startGame () {

  window.game = new Game
}