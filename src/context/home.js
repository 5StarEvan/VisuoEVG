function login(){
   window.location.href = "login.html";
}

function signup(){
   window.location.href = "signup.html";
}

function logout() {
   console.log('Logout function called');
   window.location.href = '/logout.html';
}

window.onload = function() {
   const urlParams = new URLSearchParams(window.location.search);
   if (urlParams.get('logout') === 'true') {
       showFlashMessage('You have been logged out successfully!');
       history.replaceState(null, '', window.location.pathname);
   }
   
   initMatrixBackground();
   initNavbarMatrix();
};

function showFlashMessage(message) {
   const existingFlashMsg = document.querySelector('.flash-message');
   if (existingFlashMsg) {
       existingFlashMsg.remove();
   }
   const flashMsg = document.createElement('div');
   flashMsg.className = 'flash-message';
   flashMsg.textContent = message;
   flashMsg.style.position = 'fixed';
   flashMsg.style.top = '20px';
   flashMsg.style.left = '50%';
   flashMsg.style.transform = 'translateX(-50%)';
   flashMsg.style.backgroundColor = '#44b377';
   flashMsg.style.color = 'white';
   flashMsg.style.padding = '15px 25px';
   flashMsg.style.borderRadius = '4px';
   flashMsg.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
   flashMsg.style.zIndex = '1000';
   flashMsg.style.opacity = '0';
   flashMsg.style.transition = 'opacity 0.5s ease-in-out';    
   document.body.appendChild(flashMsg);
   flashMsg.offsetHeight;
   flashMsg.style.opacity = '1';
   setTimeout(() => {
       flashMsg.style.opacity = '0';
       setTimeout(() => {
           flashMsg.remove();
       }, 500);
   }, 3000);
}

function initMatrixBackground() {
   const canvas = document.querySelector('.matrix-background');
   if (!canvas) return;
   
   const ctx = canvas.getContext('2d');
   
   function setCanvasSize() {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
   }
   
   setCanvasSize();
   window.addEventListener('resize', setCanvasSize);
   
   const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
   const fontSize = 14;
   const columns = Math.floor(canvas.width / fontSize);
   const drops = [];
   
   for (let i = 0; i < columns; i++) {
       drops[i] = Math.random() * -100;
   }
   
   function draw() {
       ctx.fillStyle = 'rgba(45, 45, 45, 0.05)';
       ctx.fillRect(0, 0, canvas.width, canvas.height);
       
       ctx.fillStyle = '#4fa8f7';
       ctx.font = `${fontSize}px monospace`;
       
       for (let i = 0; i < drops.length; i++) {
           const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
           const x = i * fontSize;
           const y = drops[i] * fontSize;
           
           ctx.fillText(text, x, y);
           
           if (y > canvas.height || Math.random() > 0.99) {
               drops[i] = 0;
           }
           
           drops[i]++;
       }
   }
   
   setInterval(draw, 50);
}

function initNavbarMatrix() {
   const navbar = document.querySelector('.nav-bar');
   if (!navbar) return;
   
   const canvas = document.createElement('canvas');
   canvas.className = 'navbar-matrix';
   canvas.style.position = 'absolute';
   canvas.style.top = '0';
   canvas.style.left = '0';
   canvas.style.width = '100%';
   canvas.style.height = '100%';
   canvas.style.zIndex = '1';
   canvas.style.pointerEvents = 'none';
   canvas.style.opacity = '0.1';
   
   navbar.style.position = 'relative';
   navbar.appendChild(canvas);
   
   const navLinks = document.querySelector('.navbar-links');
   const title = document.querySelector('.title');
   if (navLinks) navLinks.style.position = 'relative';
   if (title) title.style.position = 'relative';
   if (navLinks) navLinks.style.zIndex = '10';
   if (title) title.style.zIndex = '10';
   
   const ctx = canvas.getContext('2d');
   
   function setCanvasSize() {
       canvas.width = navbar.offsetWidth;
       canvas.height = navbar.offsetHeight;
   }
   
   setCanvasSize();
   window.addEventListener('resize', setCanvasSize);
   
   const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
   const fontSize = 8;
   const columns = Math.floor(canvas.width / fontSize);
   const drops = [];
   
   for (let i = 0; i < columns; i++) {
       drops[i] = Math.random() * -20;
   }
   
   function drawNavMatrix() {
       ctx.fillStyle = 'rgba(60, 60, 60, 0.1)';
       ctx.fillRect(0, 0, canvas.width, canvas.height);
       
       ctx.fillStyle = '#4fa8f7';
       ctx.font = `${fontSize}px monospace`;
       
       for (let i = 0; i < drops.length; i++) {
           const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
           const x = i * fontSize;
           const y = drops[i] * fontSize;
           
           ctx.fillText(text, x, y);
           
           if (y > canvas.height || Math.random() > 0.98) {
               drops[i] = 0;
           }
           
           drops[i]++;
       }
   }
   
   setInterval(drawNavMatrix, 100);
}

document.addEventListener('DOMContentLoaded', function() {
   const navbar = document.querySelector('.nav-bar');
   const mobileNavToggle = document.getElementById('mobileNavToggle');
   const navLinks = document.getElementById('navLinks');
   
   window.addEventListener('scroll', () => {
       const scrollY = window.scrollY;
       
       if (scrollY > 50) {
           navbar.classList.add('scrolled');
           navbar.style.transform = `translateY(${scrollY > 100 ? '-5px' : '0'})`;
           navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
       } else {
           navbar.classList.remove('scrolled');
           navbar.style.transform = 'translateY(0)';
           navbar.style.boxShadow = 'none';
       }
   });
   
   if (mobileNavToggle) {
       mobileNavToggle.addEventListener('click', () => {
           navLinks.classList.toggle('active');
           const icon = mobileNavToggle.querySelector('i');
           
           icon.classList.toggle('fa-bars');
           icon.classList.toggle('fa-times');
           if (navLinks.classList.contains('active')) {
               navLinks.style.transform = 'translateX(0)';
               navLinks.style.opacity = '1';
           } else {
               navLinks.style.transform = 'translateX(100%)';
               navLinks.style.opacity = '0';
           }
       });
   }
   
   const featureCards = document.querySelectorAll('.features__card');
   featureCards.forEach(card => {
       card.style.opacity = '0';
       card.style.transform = 'perspective(500px) rotateX(10deg)';
       card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
   });
   
   const animateOnScroll = () => {
       const elements = document.querySelectorAll('.features__card, .about__content, .contact__content');
       
       elements.forEach(element => {
           const elementPosition = element.getBoundingClientRect().top;
           const screenPosition = window.innerHeight / 1.3;
           
           if (elementPosition < screenPosition) {
               element.style.opacity = '1';
               element.style.transform = 'perspective(500px) rotateX(0deg)';
           }
       });
   };
   
   window.addEventListener('scroll', animateOnScroll);
   animateOnScroll();
});