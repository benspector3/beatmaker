let bpm = 120;
let intervalId;
let time = 1000 /  (bpm / 60);

let grid = [];

let instruments = ['C', 'D', 'E', 'F', 'G', 'Kick', 'Snare', 'Hi-Hat']

// //create a synth and connect it to the main output (your speakers)
const synth = new Tone.PolySynth().toDestination();
const hihat = new Tone.Player("https://tonejs.github.io/audio/drum-samples/breakbeat8/hihat.mp3").toDestination();
const kick = new Tone.Player("https://tonejs.github.io/audio/drum-samples/breakbeat8/kick.mp3").toDestination();
const snare = new Tone.Player("https://tonejs.github.io/audio/drum-samples/breakbeat8/snare.mp3").toDestination();

let beat = 0;
let TOTAL_BEATS = 8;
let notes = ["C4", "D4", "E4", "F4", "G4"];

let table = document.getElementById('grid');

let bpmInput = document.getElementById('bpm');
bpmInput.onchange = setBPM;

let playButton = document.getElementById('play');
playButton.onclick = async () => {
    await Tone.start()
    beat = 0;
    clearInterval(intervalId);
    intervalId = setInterval(playSounds, time)
}
let pauseButton = document.getElementById('pause');
pauseButton.onclick = async () => {
    clearInterval(intervalId);
}
let clearButton = document.getElementById('clear');
clearButton.onclick = async () => {
    let onElements = Array.from(document.getElementsByClassName('on'))
    onElements.forEach(el => {
        el.classList.remove('on');
    })
}

function setBPM(e) {
    bpm = e.target.value;
    time = 1000 / (bpm / 60);
    beat = 0;
    clearInterval(intervalId);
    intervalId = setInterval(playSounds, time)
}



function playSounds() {
    // //play a middle 'C' for the duration of an 8th note
    let chord = [];

    for (let i = 0; i < grid.length; i++) {
        let instrument = grid[i];
        if (i < 5) {
            let note = notes[i];
            if (instrument[beat].classList.contains('on')) {
                chord.push(note)
            }
        } else if (i === 5) {
            if (instrument[beat].classList.contains('on')) {
                kick.start();
            }
        } else if (i === 6) {
            if (instrument[beat].classList.contains('on')) {
                snare.start();
            }
        } else if (i === 7) {
            if (instrument[beat].classList.contains('on')) {
                hihat.start();
            }
        }
    }


    synth.triggerAttackRelease(chord, "8n");
    
    beat = (beat + 1) % TOTAL_BEATS;
}



makeGrid();
function makeGrid() {
    for (let i = 0; i < instruments.length; i++) {
        let tr = document.createElement("tr");
        tr.id = instruments[i];
        
        let header = document.createElement("th");
        header.innerText = instruments[i];
        tr.append(header);
        
        table.append(tr);
        
        grid.push([]);

        for (let j = 0; j < TOTAL_BEATS; j++) {
            let td = document.createElement('td');
            td.onclick = () => {
                if (td.classList.contains('on')) {
                    td.classList.remove("on");    
                } else {
                    td.classList.add("on");
                }
            }
            tr.append(td);
            grid[i].push(td);
        }

        
    }
}