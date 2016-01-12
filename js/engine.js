"use strict"

const notes = ['Ab','A','Bb','B','C','Db','D','Eb','E','F','F#','G']

let noteList = []
let rate = 0
let timeBetweenNotes = 0
let interval
let prevNote = 0

function getCheckedStrings () {
  let strings = []
  if (document.querySelector('#e_string').checked) { strings.push('E') }
  if (document.querySelector('#a_string').checked) { strings.push('A') }
  if (document.querySelector('#d_string').checked) { strings.push('D') }
  if (document.querySelector('#g_string').checked) { strings.push('G') }
  return strings
}

function addString (stringName, minFret, maxFret) {
  let cursor = notes.indexOf(stringName) + minFret
  if (cursor > notes.length) {
    cursor = cursor % notes.length // yeah I used a mod, fuck you know???
  }

  for (var i = minFret; i < maxFret + 1; i++) {
    if (cursor === notes.length) { cursor = 0 }

    noteList.push({
      name: notes[cursor],
      string: stringName + ' string'
    })

    cursor++
  }
}

function pickNote () {
  console.log('picking')
  let noteID = prevNote
  while (noteID === prevNote ){
    noteID = Math.floor(Math.random() * (noteList.length));
  }

  let note = noteList[noteID]

  document.querySelector('#note-name').innerHTML = note.name
  document.querySelector('#string-name').innerHTML = note.string

  // dumb quick fix to get that stupid text from showing up when it shouldn't
  document.querySelector('#dumb-text').style.display = 'inline'
}

function startExercise () {
  interval = window.setInterval(pickNote, timeBetweenNotes)
  document.querySelector('#pause').style.display = 'inline'
  document.querySelector('#resume').style.display = 'none'
}

function pauseExercise () {
  clearInterval(interval)
  document.querySelector('#pause').style.display = 'none'
  document.querySelector('#resume').style.display = 'inline'
}

function beginExercise () {
  let minFret = document.querySelector('#min_fret').value
  let maxFret = document.querySelector('#max_fret').value
  timeBetweenNotes = document.querySelector('#time_between_notes').value * 1000

  // initialize string and note data
  let checkedStrings = getCheckedStrings()
  if (checkedStrings.length === 0){
    alert('Please select at least one string.')
    return
  }
  for (var i = 0; i < checkedStrings.length; i++) {
    addString(checkedStrings[i], Number(minFret), Number(maxFret))
  }
  console.log(noteList)

  document.querySelector('#form').style.display = 'none'
  document.querySelector('#exercise').style.display = 'inline'

  startExercise()
}
