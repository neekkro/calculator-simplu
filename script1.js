class Calculator {
    constructor(recentulTextElement, curentulTextElement) {
      this.recentulTextElement = recentulTextElement
      this.curentulTextElement = curentulTextElement
      this.goleste()
    }
  // Mai jos creiem functiile pe care calculatorul le va efectua
    goleste() {
      this.actualulCalculat = ''
      this.recentulCalculat = ''
      this.operatie = undefined
    }
  
    sterge() {
      this.actualulCalculat = this.actualulCalculat.toString().slice(0, -1) 
    }
  
    adaugaNumar(numar) {
      if (numar === '.' && this.actualulCalculat.includes('.')) return 
      this.actualulCalculat = this.actualulCalculat.toString() + numar.toString() 
    }
  
    alegeOperatia(operatie) {
      if (this.actualulCalculat === '') return 
      if (this.recentulCalculat !== '') { 
        this.calculeaza()
      }
      this.operatie = operatie
      this.recentulCalculat = this.actualulCalculat
      this.actualulCalculat = ''
    }
  
    calculeaza() {
      let calculare 
      const recent = parseFloat(this.recentulCalculat) 
      const actual = parseFloat(this.actualulCalculat) 
      if (isNaN(recent) || isNaN(actual)) return
      switch (this.operatie) {                               
        case '+':
          calculare = recent + actual
          break
        case '-':
          calculare = recent - actual
          break
        case '*':
          calculare = recent * actual
          break
        case '÷':
          calculare = recent / actual
          break
        default:
          return
      }
      this.actualulCalculat = calculare 
      this.operatie = undefined
      this.recentulCalculat = ''
    }
  
    afiseazaNumar(numar) {  
      const numarulSirului = numar.toString()
      const numereIntregi = parseFloat(numarulSirului.split('.')[0]) 
      const numereDecimale = numarulSirului.split('.')[1]
      let afiseazaIntreg
      if (isNaN(numereIntregi)) {
        afiseazaIntreg = ''
      } else {
        afiseazaIntreg = numereIntregi.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (numereDecimale != null) {
        return `${afiseazaIntreg}.${numereDecimale}`
      } else {
        return afiseazaIntreg
      }
    }
  
    actualizareAfisare() {
      this.curentulTextElement.innerText =
        this.afiseazaNumar(this.actualulCalculat)
      if (this.operatie != null) {
        this.recentulTextElement.innerText =
          `${this.afiseazaNumar(this.recentulCalculat)} ${this.operatie}`
      } else {
        this.recentulTextElement.innerText = ''
      }
    }
  }
  
  /* conectam butoanele */

  const numarButoane = document.querySelectorAll('[data-numar]')
  const operatiiButoane = document.querySelectorAll('[data-operatie]')
  const egalButon = document.querySelector('[data-egal]')
  const stergereButon = document.querySelector('[data-sterge]')
  const golesteButon = document.querySelector('[data-goleste]')
  const recentulTextElement = document.querySelector('[data-recent]') // 
  const curentulTextElement = document.querySelector('[data-curentul]')  // 
  
  const calculator = new Calculator(recentulTextElement, curentulTextElement)
  // declaram functile de operatie cand apasam click sa se efectueze procesele de mai sus
  // atribuim functile de mai sus butoanelor
  numarButoane.forEach(button => {
    button.addEventListener('click', () => {
      calculator.adaugaNumar(button.innerText)
      calculator.actualizareAfisare() //functia asta e atribuita sa afiseze
    })
  })
  
  operatiiButoane.forEach(button => {  
    button.addEventListener('click', () => {
      calculator.alegeOperatia(button.innerText)
      calculator.afiseazaNumar()
    })
  })
  
  egalButon.addEventListener('click', button => { 
    calculator.calculeaza()
    calculator.actualizareAfisare()
  })
  
  golesteButon.addEventListener('click', button => {
    calculator.goleste()
    calculator.actualizareAfisare()
  })
  
  stergereButon.addEventListener('click', button => { 
    calculator.sterge()
    calculator.actualizareAfisare()
  })

  