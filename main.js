// main.js

document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".like-glyph");

  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      handleHeartClick(heart);
    });
  });

  // Ensure the error modal is hidden when the page loads
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
});

function handleHeartClick(heart) {
  mimicServerCall()
    .then(() => {
      if (heart.innerText === '♡') {
        heart.innerText = '♥';
        heart.classList.add('activated-heart');
      } else {
        heart.innerText = '♡';
        heart.classList.remove('activated-heart');
      }
    })
    .catch(error => {
      showErrorModal(error);
    });
}

function showErrorModal(error) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  
  modalMessage.innerText = error;
  modal.classList.remove('hidden');

  setTimeout(() => {
    modal.classList.add('hidden');
  }, 3000);
}

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
