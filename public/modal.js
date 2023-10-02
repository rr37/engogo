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
      const weatherSelect = journalModal.querySelector('#weatherSelect')
      const weatherOptions = weatherSelect.querySelectorAll('option')
      const canvas = journalModal.querySelector('canvas')
      const listenInput = journalModal.querySelector('#listenInput')
      const speakInput = journalModal.querySelector('#speakInput')
      const readInput = journalModal.querySelector('#readInput')
      const writeInput = journalModal.querySelector('#writeInput')
      const thinkInput = journalModal.querySelector('#thinkInput')
      const cardIdText = journalModal.querySelector('#cardId')
      const cardMissionText = journalModal.querySelector('#cardMission')
      const cardImageSrc = journalModal.querySelector('#cardImageSrc')
      const qContainers = journalModal.querySelectorAll('.modal-Q')
      const q1TextArea = journalModal.querySelector('#q1TextArea')
      const q2TextArea = journalModal.querySelector('#q2TextArea')
      const q3TextArea = journalModal.querySelector('#q3TextArea')
      const closeJournalModalBtn = journalModal.querySelector(
        '#closeJournalModalBtn'
      )
      const saveJournalBtn = journalModal.querySelector('#saveJournalBtn')
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
            editable,
            createdAt,
            weather,
            cardId,
            cardMission,
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
          journalCreatedDate.innerHTML = `${createdAt}`
          weatherOptions.forEach((option) => {
            option.selected = false
            if (option.value === weather) {
              option.selected = true
            }
          })

          canvas.id = `radarChart${journalId}`
          listenInput.value = listen
          speakInput.value = speak
          readInput.value = read
          writeInput.value = write
          thinkInput.value = think
          cardIdText.innerText = cardId
          cardMissionText.innerText = cardMission
          cardImageSrc.src = cardImage
          q1TextArea.value = q1
          q2TextArea.value = q2
          q3TextArea.value = q3
          const canvasId = `radarChart${journalId}`
          const dataValues = [listen, speak, read, write, think]
          let radarChart
          if (!editable) {
            q1TextArea.disabled = true
            q2TextArea.disabled = true
            q3TextArea.disabled = true
            weatherSelect.disabled = true
            saveJournalBtn.style.display = 'none'
            radarChart = createRadarChart(canvasId, dataValues, false, 18)
          } else {
            radarChart = createRadarChart(canvasId, dataValues, true, 18)
          }
          radarChart.update()
          // 按下關閉後，回復 Modal 顯示的初始狀態
          closeJournalModalBtn.addEventListener('click', () => {
            radarChart.destroy()
            q1TextArea.disabled = false
            q2TextArea.disabled = false
            q3TextArea.disabled = false
            weatherSelect.disabled = false
            saveJournalBtn.style.display = 'inline'
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
