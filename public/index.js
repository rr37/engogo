const likeJournalBtn = document.querySelectorAll('.likeJournalBtn') || null
if (likeJournalBtn) {
  likeJournalBtn.forEach((likeJournalBtn) => {
    likeJournalBtn.addEventListener('click', () => {
      const journalId = likeJournalBtn.dataset.journalid
      const likeCountNum = likeJournalBtn.querySelector('#likeCount')
      const heart = likeJournalBtn.querySelector('#heart')
      // console.log(`你按到我了！ 我是 journal ${journalId} 啦！`)
      // 發送Ajax請求來判斷使用者是否已按愛心
      axios
        .get(`/api/journals/${journalId}/checkLike`)
        .then((response) => {
          const { alreadyLiked } = response.data
          if (alreadyLiked) {
            // console.log('你已經按過愛心了！幫你取消！')
            // 如果用戶已按愛心，則發送取消愛心的Ajax請求
            axios
              .delete(`/api/journals/${journalId}/unlike`)
              .then((response) => {
                const { likeCount } = response.data
                // 更新愛心數
                likeCountNum.textContent = likeCount
                heart.src = '/icon/_base/white_heart.png'
              })
              .catch((error) => {
                console.error('Error:', error)
              })
          } else {
            // console.log('我會幫你送出愛心請求')
            // 如果用戶還沒按愛心，則發送按下愛心的Ajax請求
            axios
              .post(`/api/journals/${journalId}/like`)
              .then((response) => {
                const { likeCount } = response.data
                likeCountNum.textContent = likeCount
                heart.src = '/icon/_base/heart.png'
              })
              .catch((error) => {
                console.error('Error:', error)
              })
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    })
  })
}
