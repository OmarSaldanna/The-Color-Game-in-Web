// get the buttons
const btn1 = document.getElementById('box1');
const btn2 = document.getElementById('box2');
const btn3 = document.getElementById('box3');
const btn4 = document.getElementById('box4');

// get the sound
const sound = document.getElementById('sound');

// put them in an array
const buttons = [ btn1, btn2, btn3, btn4 ];

// the shadows colors
const shadows = [ '#00C1FF' , '#2EFF7B', '#FF0A27', '#9A63FF' ];

// a function for play the buttos automaticly
async function pressBtn(btn) {
  // select te button
  let target = buttons[btn-1];
  // and the shadow
  let shadow = shadows[btn-1];
  // change the box shadow
  target.style.boxShadow = `0px 0px 20px -1px ${shadow}`;
  // play the press sound
  sound.play();
  // wait and change the shadow
  await setTimeout(() => {
    target.style.boxShadow = 'none';
  }, 500);
}