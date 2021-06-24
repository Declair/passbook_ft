import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/graph'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid';
import { useGlobalContext } from '../context'

function AccountMap() {
  const { userInfo, userPassbook } = useGlobalContext();
  const { chartData, setChartData } = useState({});
  const history = useHistory();

  const chartRef = useRef()
  let myChart = null

  const getChartData = () => {
    
  }

  const renderChart = () => {
    const chart = echarts.getInstanceByDom(chartRef.current)
    if (chart) {
      myChart = chart
    } else {
      myChart = echarts.init(chartRef.current)
    }
    // to compute option
    var options = {
      backgroundColor: '#ccc',
      tooltip: {                  // config for tooltip
        formatter: function (param) {
          if (param.dataType === 'edge') {
            // return param.data.category + ': ' +
            // param.data.target;
            return param.data.target;
          }
          // return param.data.category + ': ' + param.data.name;
          return param.data.name;
        }
      },
      series: [{
        type: "graph",
        top: '10%',
        roam: true,
        focus: 'adjacency',
        force: {
          repulsion: 1000,
          edgeLength: [150, 100]
        },
        layout: "force",
        symbol: 'circle',
        lineStyle: {
          color: '#000',
          width: 1,
          type: 'solid',
          opacity: 0.5,
          curveness: 0
        },
        label: {
          show: true,
          position: "inside",
          fontSize: 16
        },
        data: [{
          name: "objective1",
          draggable: true,
          symbolSize: [80, 80],
          itemStyle: {
            color: '#000'
          }
        }, {
          name: "objective2",
          draggable: true,
          symbolSize: [80, 80],
          itemStyle: {
            color: '#0000ff'
          }
        }, {
          name: "objective3",
          draggable: true,
          symbolSize: [80, 80],
          itemStyle: {
            color: '#ff0000'
          }
        }, {
          name: "objective4",
          desc: "lop ksjd mmdc kas",
          draggable: true,
          symbolSize: [80, 80],
          itemStyle: {
            color: '#ff0000'
          },
        }, {
          name: "objective5",
          draggable: true,
          symbolSize: [80, 80],
          itemStyle: {
            color: '#00ff00'
          }
        }],
        links: [{
          target: "objective2",
          source: "objective1",
  
        }, {
          target: "objective3",
          source: "objective4",
  
        }, {
          target: "objective4",
          source: "objective1",
  
        }, {
          target: "objective5",
          source: "objective1",
        }]
      }],
  
      animationEasingUpdate: "quinticInOut",
      animationDurationUpdate: 100
    };
    myChart.setOption(options)
    console.log("in renderChart()")
  }

  useEffect(renderChart, [chartData])

  return (
    <section className="section">
      <div>
        <h2 className="section-title">Account Map</h2>
      </div>
      <div style={{ width: "500px", height: "500px", margin: "25px" }} ref={chartRef} />
    </section>
  )
}


export default AccountMap;