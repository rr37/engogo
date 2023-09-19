const likeJournalBtn = document.querySelectorAll('.likeJournalBtn') || null

if (likeJournalBtn) {
  likeJournalBtn.forEach((button) => {
    const realButton = button.querySelector('button')

    button.addEventListener('click', () => {
      realButton.click()
    })
  })
}
