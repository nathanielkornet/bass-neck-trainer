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
  if (document.querySelector('#c_string').checked) { strings.push('C') }
  return strings
}


// this method is kind of unnecessary with the addition of audioFilenameByStringAndNote.
// But I'm gonna keep it around cuz its cool.
function addString (stringName, minFret, maxFret) {
  let cursor = notes.indexOf(stringName) + minFret
  if (cursor > notes.length) {
    cursor = cursor % notes.length // yeah I used a mod, fuck you know???
  }

  for (var i = minFret; i < maxFret + 1; i++) {
    if (cursor === notes.length) { cursor = 0 }

    let noteName = notes[cursor]
    if (i > 11) { noteName = 'high ' + noteName }

    noteList.push({
      name: noteName,
      string: stringName + ' string',
      audioPath: 'audio/' + getAudioFilename(stringName, noteName) + '.mp3'
    })

    cursor++
  }
}

const audioFilenameByStringAndNote = {
  'E': {
    'E': 'E_1',
    'F': 'F_1',
    'F#': 'Fsharp_1',
    'G': 'G_1',
    'Ab': 'Ab_1',
    'A': 'A_1',
    'Bb': 'Bb_1',
    'B': 'B_1',
    'C': 'C_2',
    'Db': 'Db_2',
    'D': 'D_2',
    'Eb': 'Eb_2',
    'high E': 'E_2',
    'high F': 'F_2',
    'high F#': 'Fsharp_2',
    'high G': 'G_2',
    'high Ab': 'Ab_2',
    'high A': 'A_2',
    'high Bb': 'Bb_2',
    'high B': 'B_2',
    'high C': 'C_3',
    'high Db': 'Db_3',
    'high D': 'D_3'
  },
  'A': {
    'A': 'A_1',
    'Bb': 'Bb_1',
    'B': 'B_1',
    'C': 'C_2',
    'Db': 'Db_2',
    'D': 'D_2',
    'Eb': 'Eb_2',
    'E': 'E_2',
    'F': 'F_2',
    'F#': 'Fsharp_2',
    'G': 'G_2',
    'Ab': 'Ab_2',
    'high A': 'A_2',
    'high Bb': 'Bb_2',
    'high B': 'B_2',
    'high C': 'C_3',
    'high Db': 'Db_3',
    'high D': 'D_3',
    'high Eb': 'Eb_3',
    'high E': 'E_3',
    'high F': 'F_3',
    'high F#': 'Fsharp_3',
    'high G': 'G_3'
  },
  'D': {
    'D': 'D_2',
    'Eb': 'Eb_2',
    'E': 'E_2',
    'F': 'F_2',
    'F#': 'Fsharp_2',
    'G': 'G_2',
    'Ab': 'Ab_2',
    'A': 'A_2',
    'Bb': 'Bb_2',
    'B': 'B_2',
    'C': 'C_3',
    'Db': 'Db_3',
    'high D': 'D_3',
    'high Eb': 'Eb_3',
    'high E': 'E_3',
    'high F': 'F_3',
    'high F#': 'Fsharp_3',
    'high G': 'G_3',
    'high Ab': 'Ab_3',
    'high A': 'A_3',
    'high Bb': 'Bb_3',
    'high B': 'B_3',
    'high C': 'C_4',
  },
  'G': {
    'G': 'G_2',
    'Ab': 'Ab_2',
    'A': 'A_2',
    'Bb': 'Bb_2',
    'B': 'B_2',
    'C': 'C_3',
    'Db': 'Db_3',
    'D': 'D_3',
    'Eb': 'Eb_3',
    'E': 'E_3',
    'F': 'F_3',
    'F#': 'Fsharp_3',
    'high G': 'G_3',
    'high Ab': 'Ab_3',
    'high A': 'A_3',
    'high Bb': 'Bb_3',
    'high B': 'B_3',
    'high C': 'C_4',
    'high Db': 'Db_4',
    'high D': 'D_4',
    'high Eb': 'Eb_4',
    'high E': 'E_4',
    'high F#': 'Fsharp_4',
    'high F': 'F_4',
  },
  'C': {
    'C': 'C_3',
    'Db': 'Db_3',
    'D': 'D_3',
    'Eb': 'Eb_3',
    'E': 'E_3',
    'F': 'F_3',
    'F#': 'Fsharp_3',
    'G': 'G_3',
    'Ab': 'Ab_3',
    'A': 'A_3',
    'Bb': 'Bb_3',
    'B': 'B_3',
    'high C': 'C_4',
    'high Db': 'Db_4',
    'high D': 'D_4',
    'high Eb': 'Eb_4',
    'high E': 'E_4',
    'high F': 'F_4',
    'high F#': 'Fsharp_4',
    'high G': 'G_4',
    'high Ab': 'Ab_4',
    'high A': 'A_4',
    'high Bb': 'Bb_4',
  }
}

function getAudioFilename (stringName, noteName) {
  return audioFilenameByStringAndNote[stringName][noteName]
}

function pickNote () {
  let noteID = prevNote
  while (noteID === prevNote ){
    noteID = Math.floor(Math.random() * (noteList.length));
  }

  let note = noteList[noteID]

  console.log(note)

  document.querySelector('#note-name').innerHTML = note.name
  document.querySelector('#string-name').innerHTML = note.string

  document.querySelector('#note-player').src = note.audioPath

  // dumb quick fix to get that stupid text from showing up when it shouldn't
  document.querySelector('#dumb-text').style.display = 'inline'

  prevNote = noteID
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

  document.querySelector('#form').style.display = 'none'
  document.querySelector('#exercise').style.display = 'inline'

  startExercise()
}
