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

// the light background colors and normal colors
const lightColors = [ '#4bc7f7', '#34ff80', '#ff1631', '#8d5de8' ];
const defaultColors = [ '#00acee', '#25d366', '#bd081c', '#6441a5' ];

// a function for play the buttos automaticly
async function pressBtn(btn) {
  // select te button
  let target = buttons[btn-1];
  // the shadow color
  let shadow = shadows[btn-1];
  // the light color
  let lightColor = lightColors[btn-1];
  // and the default color
  let defaultColor = defaultColors[btn-1];

  // change the box shadow and background to a light color
  target.style.boxShadow = `0px 0px 20px -1px ${shadow}`;
  target.style.backgroundColor = lightColor;
  // play the press sound
  sound.play();
  // wait and change the shadow and background to default
  await setTimeout(() => {
    target.style.boxShadow = 'none';
    target.style.backgroundColor = defaultColor;
  }, 500);
}