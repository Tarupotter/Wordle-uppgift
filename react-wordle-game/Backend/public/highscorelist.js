
  function toggleGuesses(el) {
    const guessList = el.nextElementSibling;
    const isHidden = guessList.classList.contains('hidden');

    guessList.classList.toggle('hidden');

    // Ändra pil ned/upp
    if (isHidden) {
      el.textContent = el.textContent.replace('▼', '▲');
    } else {
      el.textContent = el.textContent.replace('▲', '▼');
    }
  }