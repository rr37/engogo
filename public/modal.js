const getJournalBtn = document.querySelectorAll('.getJournalBtn') || null
const journalModal = document.getElementById('journalModal')

if (getJournalBtn) {
  getJournalBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const journalId = button.dataset.journalid
      const journalCreatedDate = journalModal.querySelector(
        '#journalCreatedDate'
      )
      const weatherInput = journalModal.querySelector('#weatherInput')
      const cardImageSrc = journalModal.querySelector('#cardImageSrc')
      const q1TextArea = journalModal.querySelector('#q1TextArea')
      const q2TextArea = journalModal.querySelector('#q2TextArea')
      const q3TextArea = journalModal.querySelector('#q3TextArea')
      axios
        .get(`/api/journals/${journalId}`)
        .then((response) => {
          const { createdAt, weather,cardImage, q1, q2, q3 } = response.data
          journalCreatedDate.innerText = ` ${createdAt} 天氣：`
          weatherInput.value = weather
          cardImageSrc.src = cardImage
          q1TextArea.value = q1
          q2TextArea.value = q2
          q3TextArea.value = q3
        })
        .catch((err) => {
          console.error('Error during API call:', err)
          alert('An err occurred while fetching journal data.')
        })
    })
  })
}
