function createRadarChart(
  canvasId,
  dataValues,
  enableDragData = false,
  pointLabelsFontSize = 0
) {
  let ctx = document.getElementById(canvasId).getContext('2d')
  let hiddenRadarInput =
    document.getElementById(canvasId).nextElementSibling || null

  let data = {
    labels: ['聽', '説', '讀', '寫', '想'],
    datasets: [
      {
        label: '',
        data: dataValues, // 雷達圖的數據值
        backgroundColor: 'rgba(242, 160, 37, 0.72)', // 填充顏色
        borderColor: 'rgba(255, 255, 255, 0)', // 線條顏色
        borderWidth: 0, // 線條寬度
        pointRadius: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(242, 160, 37, 0.72)',
      },
    ],
  }

  // canvasBackgroundColor plugin block 間隔顏色底圖
  const canvasBackgroundColor = {
    id: 'canvasBackgroundColor',
    beforeDraw(chart, args, pluginOptions) {
      const { ctx, scales } = chart
      const { xCenter, yCenter, drawingArea: radius } = scales.r
      var colors = ['#FFECC8', '#FDCD85']
      for (let i = 5; i >= 1; i--) {
        ctx.beginPath()
        // 畫圓
        ctx.arc(xCenter, yCenter, (radius / 5) * i, 0, Math.PI * 2)
        // 依據層數選擇不同顏色
        if (i % 2 === 1) {
          ctx.fillStyle = colors[0]
        } else {
          ctx.fillStyle = colors[1]
        }
        ctx.fill()
        ctx.closePath()
      }
    },
  }

  let options = {
    plugins: {
      // 關閉圖例顯示
      legend: {
        display: false,
      },
      // 關閉在點上hover出現的框框
      tooltip: { enabled: false },
    },
    scales: {
      r: {
        // 放射線顏色
        angleLines: {
          color: '#F2A025',
        },
        // 設定雷達圖外型為圓形
        grid: {
          circular: true,
          lineWidth: 0,
        },
        beginAtZero: true,
        // 外圈文字大小
        pointLabels: {
          font: {
            size: pointLabelsFontSize,
          },
        },
        min: 0,
        max: 5,
        // 每層間隔
        ticks: {
          stepSize: 1,
          display: false,
        },
      },
    },
  }
  // 判斷是否要啟用抓資料外掛
  if (enableDragData) {
    data.datasets[0].pointRadius = 5
    data.datasets[0].pointHoverRadius = 10
    options.plugins.dragData = {
      round: 0,
      onDrag: (event, datasetIndex, index, value) => {
        event.target.style.cursor = 'grabbing'
      },
      onDragEnd: (event, datasetIndex, index, value) => {
        event.target.style.cursor = 'default'
        if (hiddenRadarInput) {
          const radarChartData = radarChart.data.datasets[0].data
          let listenInput = hiddenRadarInput.querySelector('#listenInput')
          let speakInput = hiddenRadarInput.querySelector('#speakInput')
          let readInput = hiddenRadarInput.querySelector('#readInput')
          let writeInput = hiddenRadarInput.querySelector('#writeInput')
          let thinkInput = hiddenRadarInput.querySelector('#thinkInput')
          listenInput.value = radarChartData[0]
          speakInput.value = radarChartData[1]
          readInput.value = radarChartData[2]
          writeInput.value = radarChartData[3]
          thinkInput.value = radarChartData[4]
        }
      },
    }
  }
  let radarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options,
    plugins: [canvasBackgroundColor],
  })

  return radarChart
}

// 渲染一般頁面的能力指標圖
const radarCharts = document.querySelectorAll('.outSideRadarChart') || null
if (radarCharts) {
  radarCharts.forEach(async (radar) => {
    const canvas = radar.querySelector('canvas')
    const canvasId = canvas.id
    const dataValues = canvas.getAttribute("data-values").split(',')
    const radarChart = createRadarChart(canvasId, dataValues)
    await radarChart.update()
  })
}
