// let next = document.querySelector('.next');
// let prev = document.querySelector('.prev');

// next.addEventListener('click', function () {
//   let items = document.querySelectorAll('.item');
//   document.querySelector('.slide').appendChild(items[0]);
// })

// prev.addEventListener('click', function () {
//   let items = document.querySelectorAll('.item');
//   document.querySelector('.slide').prepend(items[items.length - 1]);
// })


const loginButton = document.getElementById('login');
const registerButton = document.getElementById('logout');

// Get modal elements
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// Get close buttons
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');

const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');

// Open modals
loginButton.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

registerButton.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

// Close modals
closeLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

closeRegister.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Show login modal
function showLoginModal() {
    loginModal.style.display = 'flex';
    registerModal.style.display = 'none';
}

// Show register modal
function showRegisterModal() {
    registerModal.style.display = 'flex';
    loginModal.style.display = 'none';
}

// Event listeners for modal toggles
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterModal();
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginModal();
});



const grids = document.querySelectorAll('.grid');
const headings = document.querySelectorAll('.heading .wrapper .text')

function enterScreen(index){
  const grid = grids[index]; 
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll('.column');

  grid.classList.add('active');

  gridColumns.forEach( element => {
  element.classList.remove('animate-before', 'animate-after');

  })

  heading.classList.remove('animate-before', 'animate-after');
}

function exitScreen(index, exitDelay){
  const grid = grids[index]; 
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll('.column');

  
  gridColumns.forEach( element => {
    element.classList.add('animate-after');

  })

  heading.classList.add('animate-after');
  
  setTimeout(()=>{
    grid.classList.remove('active');
    
  },exitDelay)
}

function setupAnimationCycle({ timePerScreen, exitDelay }){
  //Delay time plus end animation time for all columns
  const cycleTime = timePerScreen + exitDelay;

  let nextIndex = 0;

  function nextCicle(){
    const currentIndex = nextIndex;

    enterScreen(currentIndex);


    setTimeout(()=> exitScreen(currentIndex, exitDelay), timePerScreen);

    nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
  }

  nextCicle();

  setInterval(nextCicle, cycleTime);

}


setupAnimationCycle({
  timePerScreen: 2000,
  exitDelay: 200 * 7,
})