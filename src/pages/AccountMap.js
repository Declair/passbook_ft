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
  const history = useHistory();

  const chartRef = useRef()
  let myChart = null

  function getChartData() {
    var accountNodes = []
    var accountLinks = []
    var mappings = {}
    userPassbook.map(function (account) {
      // collect all the accounts as nodes in the map
      var node_a = {}
      node_a.name = String(account.aid);
      node_a.accountName = account.name;
      node_a.draggable = true;
      node_a.itemStyle = { color: '#000' };
      node_a.symbolSize = [80, 80];
      accountNodes.push(node_a);

      if (account.continueWithAid) {
        var link = {
          target: String(account.continueWithAid),
          source: String(account.aid),
          desc: 'continue with'
        }
        accountLinks.push(link);
      }

      // get the mapping details to create links
      account.properties.map(function (property) {
        if (property.fixed === 1) {
          if (property.pid in mappings) {
            if (property.prime === 1) {
              mappings[property.pid].holders.unshift(account.aid)
            }
            else {
              mappings[property.pid].holders.push(account.aid)
            }
          }
          else {
            mappings[property.pid] = { propertyName: property.name, holders: [account.aid] }
          }
        }
      })
    });
    for (var i in mappings) {
      if (mappings[i].holders.length > 1) {
        for (var j = 1; j < mappings[i].holders.length; j++) {
          var link = {
            target: String(mappings[i].holders[j]),
            source: String(mappings[i].holders[0]),
            desc: mappings[i].propertyName
          }
          accountLinks.push(link);
        }
      }
    }
    console.log(accountNodes)
    console.log(accountLinks)

    var options_ = {
      backgroundColor: '#ccc',
      tooltip: {                  // config for tooltip
        formatter: function (param) {
          if (param.dataType === 'edge') {
            return param.data.desc;
          }
          return param.data.accountName;
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
          fontSize: 16,
          formatter: function (d) {
            return d.data.accountName;
          }
        },
        data: accountNodes,
        links: accountLinks
      }],
      animationEasingUpdate: "quinticInOut",
      animationDurationUpdate: 100
    };
    return options_;
  }

  function renderChart(options) {
    const chart = echarts.getInstanceByDom(chartRef.current)
    if (chart) {
      myChart = chart
    } else {
      myChart = echarts.init(chartRef.current)
    }
    myChart.setOption(options)
  }

  useEffect(() => {
    renderChart(getChartData())
    return () => {
      myChart && myChart.dispose()
    }
  }, [])

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