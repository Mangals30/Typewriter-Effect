
const TypeWriter = function(txtElement,words,wait=3000) {
 this.txtElement = txtElement
 this.words = words
 this.wait = parseInt(wait)
 this.txt = ''
 this.isDeleting = false
 this.wordIndex = 0
 this.type()
} 
TypeWriter.prototype.type = function() {
  const current = this.wordIndex % this.words.length
  const fullTxt = this.words[current]
  if(this.isDeleting) {

    this.txt = fullTxt.substring(0,this.txt.length-1)
  }
  else {
    this.txt = fullTxt.substring(0,this.txt.length+1)

  }
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
  let typeSpeed = 300
  if(this.isDeleting) {
    typeSpeed/=2
  }
  if(!this.isDeleting && this.txt == fullTxt) {
    typeSpeed = this.wait
    this.isDeleting = true
  }
  if(this.isDeleting && this.txt=='') {
    typeSpeed = 500
    this.isDeleting = false
    this.wordIndex++
  }
  setTimeout(() => {
    this.type()
  }, typeSpeed);
}

function init() {
  const txtElement = document.querySelector('.txt-type')
  const words = JSON.parse(txtElement.getAttribute('data-words'))
  const wait = txtElement.getAttribute('data-wait')
  new TypeWriter(txtElement,words,wait)
}

document.addEventListener('DOMContentLoaded',init)
