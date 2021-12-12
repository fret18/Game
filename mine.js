/* Dietrich Ney, 9/2/21, Minesweeper game */
document.addEventListener('DOMContentLoaded', () => {
    //Variables
    const grid = document.querySelector('.grid')
    const flagsLeft = document.querySelector('#flags-left')
    const result = document.querySelector('#result')
    let width = 10
    let flags = 0
    let spaces = []
    let numbombs = 20
    let endgame = false

    //function for user clicking a space
    function click(space) {
        let Id = space.id
        if(endgame){
            return
        }
        if(space.classList.contains('checked') || space.classList.contains('flag')){
            return
        }
        //if user clicks a bomb space
        if(space.classList.contains('bomb')) {
            endgame = true
            result.innerHTML = "Game Over!"
            squares.forEach(square => {
                if (square.classList.contains('bomb')) {
                  space.innerHTML = 'B'
                  square.classList.remove('bomb')
                  square.classList.add('boom')
                }
              })
        } else {
            let total = space.getAttribute('data')
            if(total !=0) {
                space.classList.add('checked')
                space.innerHTML = total
                return
            }
            checkSpace(space, Id)
            space.classList.add('checked')
        }
    }

    //Sets the board up
    function setBoard() {
        //reandomly generate a board with bombs and safe spaces
        const bombs = Array(numbombs).fill('bomb')
        const safe = Array(width * width - numbombs).fill('empty')
        const gameboard = safe.concat(bombs)
        const shuffle = gameboard.sort(() => Math.random() - 0.5)

        for(let i = 0; i < (width * width); i++) {
            const space = document.createElement('div')
            space.setAttribute('id', i)
            space.classList.add(shuffle[i])
            grid.appendChild(space)
            spaces.push(space)
            space.addEventListener('click', function(e) {
                click(space)
            })
            space.oncontextmenu = function(e) {
                e.preventDefault()
                addFlag(space)
            }

        }
        for(let i = 0; i < spaces.length; i++) {
            let total = 0
            const ledge = (i % width === 0)
            const redge = (i % width === width -1)
            //logic to determine how many adjacent spaces have bombs
            if(spaces[i].classList.contains('empty')) {
                if(i > 0 && !ledge && spaces[i-1].classList.contains('bomb')){
                    total++
                }
                if(i > 9 && !redge && spaces[i+1-width].classList.contains('bomb')){
                    total++
                }
                if(i > 10 && spaces[i-width].classList.contains('bomb')){
                    total++
                }
                if(i > 11 && !ledge && spaces[i-1-width].classList.contains('bomb')){
                    total++
                }
                if(i < 98 && !redge && spaces[i+1].classList.contains('bomb')){
                    total++
                }
                if(i < 90 && !ledge && spaces[i-1+width].classList.contains('bomb')){
                    total++
                }
                if(i < 88 && !redge && spaces[i+1+width].classList.contains('bomb')){
                    total++
                }
                if(i < 89 && spaces[i+width].classList.contains('bomb')){
                    total++
                }
                spaces[i].setAttribute('data', total)
            }
        }
    }
    function checkSpace(space, Id){
        const ledge = (Id % width === 0)
        const redge = (Id % width === width - 1)

        setTimeout(() => {
            if (Id > 0 && !ledge) {
                const newId = spaces[parseInt(Id) -1].id
                const newspace = document.getElementById(newId)
                click(newspace)
              }
              if (Id > 9 && !redge) {
                const newId = spaces[parseInt(Id) +1 -width].id
                const newspace = document.getElementById(newId)
                click(newspace)
              }
              if (Id > 10) {
                const newId = spaces[parseInt(Id -width)].id
                const newspace = document.getElementById(newId)
                click(newspace)
              }
              if (Id > 11 && !ledge) {
                const newId = spaces[parseInt(Id) -1 -width].id
                const newspace = document.getElementById(newId)
                click(newspace)
              }
              if (Id < 98 && !redge) {
                const newId = spaces[parseInt(Id) +1].id
                const newspace = document.getElementById(newId)
                click(newspace)
              }
              if (Id < 90 && !ledge) {
                const newId = spaces[parseInt(Id) -1 +width].id
                const newspace = document.getElementById(newId)
                click(newspace)
              }
              if (Id < 88 && !redge) {
                const newId = spaces[parseInt(Id) +1 +width].id
                const newspace = document.getElementById(newId)
                click(newspace)
              }
              if (Id < 89) {
                const newId = spaces[parseInt(Id) +width].id
                const newspace = document.getElementById(newId)
                click(newspace)
              }
            }, 10)
    }
    //check to see if allflags have been succesfully placed
    function checkForWin() {
      let found = 0
    
        for (let i = 0; i < spaces.length; i++) {
          if (spaces[i].classList.contains('flag') && spaces[i].classList.contains('bomb')) {
            found++
          }
          if (found === numbombs) {
            result.innerHTML = 'YOU WIN!'
            endgame = true
          }
        }
      }
      function addFlag(space) {
        if (endgame) return
        if (!space.classList.contains('checked') && (flags < numbombs)) {
            if (!space.classList.contains('flag')) {
              //add a flag
              space.classList.add('flag')
              space.innerHTML = 'F'
              flags++
              flagsLeft.innerHTML = numbombs- flags
              checkForWin()
            } else {
              //remove flag
              space.classList.remove('flag')
              space.innerHTML = ''
              flags--
              flagsLeft.innerHTML = numbombs- flags
          }
        }
      }
        
    setBoard()

    
})