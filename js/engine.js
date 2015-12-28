"use strict"

const notes = ['Ab','A','Bb','B','C','Db','D','Eb','E','F','F#','G']
const extendedNotesByString = {
  'E' : ['E','F','F#','G','Ab','A','Bb'],
  'A' : ['A','Bb','B','C','Db','D','Eb'],
  'D' : ['D','Eb','E','F','F#','G','Ab'],
  'G' : ['G','Ab','A','Bb','B','C','Db']
}

let noteList = []
let rate = 0
let timeBetweenNotes = 0
let interval

function getCheckedStrings () {
  let strings = []
  if (document.querySelector('#e_string').checked) { strings.push('E') }
  if (document.querySelector('#a_string').checked) { strings.push('A') }
  if (document.querySelector('#d_string').checked) { strings.push('D') }
  if (document.querySelector('#g_string').checked) { strings.push('G') }
  return strings
}

function addString (string, extendNeck) {
  for (var i = 0; i < notes.length; i++) {
    noteList.push({ name: notes[i], string: string + ' string' })
  }
  if (extendNeck) {
    const extendedNotes = extendedNotesByString[string]
    for (var i = 0; i < extendedNotes.length; i++) {
      noteList.push({ name: 'high ' + extendedNotes[i], string: string + ' string' })
    }
  }
}

function initializeCount () {
  for (var i = 0; i < noteList.length; i++) {
    countList.push(0)
  }
}

function pickNote () {
  let noteID = Math.floor(Math.random() * (noteList.length));

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
  let extendNeck = document.querySelector('#extended_neck').checked
  timeBetweenNotes = document.querySelector('#time_between_notes').value * 1000

  // initialize string and note data
  let checkedStrings = getCheckedStrings()
  if (checkedStrings.length === 0){
    alert('Please select at least one string.')
    return
  }
  for (var i = 0; i < checkedStrings.length; i++) {
    addString(checkedStrings[i], extendNeck)
  }

  document.querySelector('#form').style.display = 'none'
  document.querySelector('#exercise').style.display = 'inline'

  startExercise()
}
