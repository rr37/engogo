const getJournalBtn = document.querySelectorAll('.getJournalBtn') || null
const journalModal = document.getElementById('journalModal')

if (getJournalBtn) {
  getJournalBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const journalId = button.dataset.journalid
      const saveJournalForm = journalModal.querySelector('#saveJournalForm')
      const journalCreatedDate = journalModal.querySelector(
        '#journalCreatedDate'
      )
      const weatherInput = journalModal.querySelector('#weatherInput')
      const canvas = journalModal.querySelector('canvas')
      const listenInput = journalModal.querySelector('#listenInput')
      const speakInput = journalModal.querySelector('#speakInput')
      const readInput = journalModal.querySelector('#readInput')
      const writeInput = journalModal.querySelector('#writeInput')
      const thinkInput = journalModal.querySelector('#thinkInput')
      const cardImageSrc = journalModal.querySelector('#cardImageSrc')
      const qContainers = journalModal.querySelectorAll('.modal-Q')
      const q1TextArea = journalModal.querySelector('#q1TextArea')
      const q2TextArea = journalModal.querySelector('#q2TextArea')
      const q3TextArea = journalModal.querySelector('#q3TextArea')
      const closeJournalModalBtn = journalModal.querySelector(
        '#closeJournalModalBtn'
      )
      qContainers.forEach((qContainer) => {
        const innerTextarea = qContainer.querySelector('textarea')
        qContainer.addEventListener('click', function () {
          innerTextarea.focus()
        })
        innerTextarea.addEventListener('input', () => {
          innerTextarea.style.height = 'auto'
          innerTextarea.style.height = innerTextarea.scrollHeight + 'px'
        })
      })
      axios
        .get(`/api/journals/${journalId}`)
        .then((response) => {
          const {
            createdAt,
            weather,
            cardImage,
            q1,
            q2,
            q3,
            listen,
            speak,
            read,
            write,
            think,
          } = response.data
          saveJournalForm.action = `/journals/${journalId}`
          journalCreatedDate.innerText = ` ${createdAt} 天氣：`
          weatherInput.value = weather
          canvas.id = `radarChart${journalId}`
          listenInput.value = listen
          speakInput.value = speak
          readInput.value = read
          writeInput.value = write
          thinkInput.value = think
          cardImageSrc.src = cardImage
          q1TextArea.value = q1
          q2TextArea.value = q2
          q3TextArea.value = q3
          const canvasId = `radarChart${journalId}`
          const dataValues = [listen, speak, read, write, think]
          const radarChart = createRadarChart(canvasId, dataValues, true)
          radarChart.update()
          closeJournalModalBtn.addEventListener('click', () => {
            radarChart.destroy()
          })
        })
        .then(() => {
          // 等待一下再更新 innerTextarea 的高度
          setTimeout(() => {
            const qContainers = journalModal.querySelectorAll('.modal-Q')
            qContainers.forEach((qContainer) => {
              const innerTextarea = qContainer.querySelector('textarea')
              innerTextarea.style.height = 'auto'
              innerTextarea.style.height = innerTextarea.scrollHeight + 'px'
            })
          }, 300)
        })
        .catch((err) => {
          console.error('Error during API call:', err)
          alert('An err occurred while fetching journal data.')
        })
    })
  })
}
