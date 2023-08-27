'use strict'

const missionImageRelation = [
  {
    id: 1,
    mission: '訂閱一個跟英語有關的 Podcast 頻道，在通勤的時候收聽。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/01.PNG',
  },
  {
    id: 2,
    mission: '利用20分鐘看一個英語新聞頻道，並猜猜看是在報導什麼。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/02.PNG',
  },
  {
    id: 3,
    mission:
      '看一場英語電影，學會三個好用句，並記下這三句是在什麼電影情境下使用的。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/03.PNG',
  },
  {
    id: 4,
    mission: '找一個合適的英文食譜，學會製作一道美味的料理！',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/04.PNG',
  },
  {
    id: 5,
    mission: '在社群網站上分享一張最近拍的相片，並嘗試用英文描述你的心情。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/05.PNG',
  },
  {
    id: 6,
    mission: '請朋友推薦旅遊目的地，然後搜尋看看這個地方有什麼特殊的風俗民情。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/06.PNG',
  },
  {
    id: 7,
    mission:
      '最近有哪些關於新科技的報導呢？找到會讓你感到驚奇的發明，並找出那個發明英文怎麼說。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/07.PNG',
  },
  {
    id: 8,
    mission:
      '打開google地圖，用小黃人隨機降落到一個使用英文的地方，並研究一下那個地方的特色吧～',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/08.PNG',
  },
  {
    id: 9,
    mission: '找到一部 TED TALK 影片，把他好好看完。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/09.PNG',
  },
  {
    id: 10,
    mission: '在Youtube輸入你感興趣的英文關鍵字，看看會有什麼新發現！',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/10.PNG',
  },
  {
    id: 11,
    mission: '有試過手機/Line/Google Lens的即時翻譯功能吧?快去試試看吧～',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/11.PNG',
  },
  {
    id: 12,
    mission:
      '去圖書館找一本有興趣原文書/雜誌，並嘗試找出一個讓你有收穫的觀點吧！',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/12.PNG',
  },
  {
    id: 13,
    mission: '找一個下午到圖書館找到英語童書的區域，隨意挑一些有趣的來看。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/13.PNG',
  },
  {
    id: 14,
    mission:
      '參觀一個博物館，然後試著聽聽看或是唸唸看喜歡的展覽物件的英文介紹。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/14.PNG',
  },
  {
    id: 15,
    mission:
      '用下列幾種頻率副詞來造句描述你的日常生活習慣：always, often, usually, sometimes, rarely, never.然後想想看有沒有哪些習慣可以做一下調整呢？',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/15.PNG',
  },
  {
    id: 16,
    mission:
      'Google Lens也會辨識植物喔~能不能告訴我路邊可愛但不知名的小草/花的英文名字呢？',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/16.PNG',
  },
  {
    id: 17,
    mission: '在晚餐時用英文點餐吧！',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/17.PNG',
  },
  {
    id: 18,
    mission: '今天來幫自己的英文名字，創作手寫簽名~',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/18.PNG',
  },
  {
    id: 19,
    mission:
      '在網路上找到英文的生日祝福，今年遇到有人生日就把這段話寫在卡片中送給他。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/19.PNG',
  },
  {
    id: 20,
    mission:
      '你是什麼星座的呢？找到介紹星座的英文網頁，看看要怎麼用英文形容這個星座的特質。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/20.PNG',
  },
  {
    id: 21,
    mission: '在社交媒體上追蹤國外名人的帳號，然後看看他們都說些什麼！',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/21.PNG',
  },
  {
    id: 22,
    mission:
      '準備一本英英字典，然後每天隨機翻一頁，然後以你的幸運數字找到一個單字之後，仔細研究他的說明與例句，並且大聲唸三次。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/22.PNG',
  },
  {
    id: 23,
    mission:
      '在 YouTube 上訂閱一個新的英語學習頻道，並且看完一集之後試著解說給朋友聽。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/23.PNG',
  },
  {
    id: 24,
    mission:
      '挑一本有附錄音檔的英語童書來看，然後聽錄音檔模仿練習一段之後讀給小朋友聽。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/24.PNG',
  },
  {
    id: 25,
    mission:
      '到 BBC Student News 找到一篇能跟朋友討論的新聞，認真的研究內容與議題後，跟大家分享你的看法。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/25.PNG',
  },
  {
    id: 26,
    mission:
      '今天出門換一個路線回家，並留意路上看到的事物，並嘗試用英文描述一個讓你覺得有趣的景象。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/26.PNG',
  },
  {
    id: 27,
    mission:
      '安排一場探險，到一個你聽過但是一直沒有去過的景點，然後深入了解之後，為這個地點設計一個簡單易懂的英文簡介。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/27.PNG',
  },
  {
    id: 28,
    mission: '在社區大學找一門英文課，在第一堂開課的時候準時前往試聽。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/28.PNG',
  },
  {
    id: 29,
    mission:
      '身上衣物標籤的英文代表什麼意思呢？說不定你會發現自己一直用錯誤的方式洗滌它唷~',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/29.PNG',
  },
  {
    id: 30,
    mission: '聽過Wordle嗎？去玩玩看吧，並用今天的謎底造句。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/30.PNG',
  },
  {
    id: 31,
    mission:
      '想出三個你最想收到的生日禮物，挑一個嘗試用英語形容你為什麼喜歡這個禮物。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/31.PNG',
  },
  {
    id: 32,
    mission: '找一個英文很好的人，請他分享一句他很喜歡的英語座右銘。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/32.PNG',
  },
  {
    id: 33,
    mission: '來去動物園吧！在發現十種不會念的動物英文名字之前，不能停下來唷！',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/33.PNG',
  },
  {
    id: 34,
    mission:
      '你有喜歡的英文歌嗎？你的任務是找到一句最有感觸的歌詞用優美的中文翻譯它。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/34.PNG',
  },
  {
    id: 35,
    mission:
      '選一段你喜歡的影片，嘗試在沒有字幕及聲音的狀況下，幫忙編寫英文對話吧！',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/35.PNG',
  },
  {
    id: 36,
    mission: '找一個能跟你一起練習英文的夥伴，一起設定一個短程的學習目標。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/36.PNG',
  },
  {
    id: 37,
    mission:
      '為自己放一天假，搭乘大眾交通工具到一個你從來沒有下車過的地方，想像自己來到另一個亞洲國家，但你只能用英語交談，觀察這一路上你會用到哪些句子呢？',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/37.PNG',
  },
  {
    id: 38,
    mission:
      '自創任務：                                                       (想做什麼自己寫)',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/38.PNG',
  },
  {
    id: 39,
    mission: '一週內學會一首英文歌曲，並唱給別人聽。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/39.PNG',
  },
  {
    id: 40,
    mission:
      '到一間西餐廳用餐，點一道以前沒有吃過的菜色，然後記下英文的菜名，並學會用三句英文來形容這道菜色。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/40.PNG',
  },
  {
    id: 41,
    mission: '手邊那罐/包食物的營養標籤寫了什麼？今天來研究看看吧！',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/41.PNG',
  },
  {
    id: 42,
    mission:
      '在這週內，當你學會一個英文單字就在存錢桶投入10塊，看一周後你能存多少錢！',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/42.PNG',
  },
  {
    id: 43,
    mission: '你有喜歡吃的菜/菜色嗎？它的英文名字是什麼？為什麼會這樣稱呼呢？',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/43.PNG',
  },
  {
    id: 44,
    mission: '嘗試對嘴一首英文歌曲，錄下來跟原唱歌手比比看嘴形有什麼不同？',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/44.PNG',
  },
  {
    id: 45,
    mission: '最近有什麼讓你感到幸福的事物嗎？用英文寫下你的心情日記。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/45.PNG',
  },
  {
    id: 46,
    mission: '一整天不要外食，然後用英文寫下當天的食物。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/46.PNG',
  },
  {
    id: 47,
    mission: '有多久沒有逛街了呢？一邊逛商場、一邊看看你能用英文說出多少物件。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/47.PNG',
  },
  {
    id: 48,
    mission:
      '找出家中你不知道英文怎麼說的十個物件，找出來後用便利貼貼在物件上面，直到背起來才撕掉。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/48.PNG',
  },
  {
    id: 49,
    mission: '為自己的信件設計簽名檔吧～',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/49.PNG',
  },
  {
    id: 50,
    mission:
      '買一本英語學習雜誌，規劃包含聽說讀寫的一個以三個月為期的學習計劃，並且從下週開始執行。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/50.PNG',
  },
  {
    id: 51,
    mission:
      '如果停電一整天，生活中會有哪些不方便？把自己每天一定要用電的物件用英文列出來，並想想萬一真的停電，有沒有替代方案。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/51.PNG',
  },
  {
    id: 52,
    mission:
      '你最敬佩的外國偶像是誰呢？嘗試用英文寫一封信給他，向他自我介紹以及你為何敬佩他。',
    card_image:
      'https://www.cooldongdong.com/content/images/size/w1000/2023/08/52.PNG',
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < missionImageRelation.length; i++) {
      // 將任務存進 Mission 資料表
      await queryInterface.bulkInsert('Missions', [
        {
          creator_id: 1,
          mission: missionImageRelation[i].mission,
          is_visible: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      // 將卡片底圖存進 CardImage 資料表
      await queryInterface.bulkInsert('CardImages', [
        {
          creator_id: 1,
          card_image: missionImageRelation[i].card_image,
          is_visible: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      // 將一組的任務圖卡存進 MissionCard 資料表
      await queryInterface.bulkInsert('MissionCards', [
        {
          mission_id: i + 1,
          cardImage_id: i + 1,
          creator_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Missions', {})
    await queryInterface.sequelize.query('ALTER TABLE Missions AUTO_INCREMENT = 1')
    await queryInterface.bulkDelete('CardImages', {})
    await queryInterface.sequelize.query('ALTER TABLE CardImages AUTO_INCREMENT = 1')
    await queryInterface.bulkDelete('MissionCards', {})
    await queryInterface.sequelize.query(
      'ALTER TABLE MissionCards AUTO_INCREMENT = 1'
    )
  },
}
