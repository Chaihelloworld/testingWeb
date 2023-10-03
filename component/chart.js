import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import DataJson from "./data.json";
const LineChart = () => {
  const [input, setInput] = useState(1950);
  const startYear = 1950,
    endYear = 2021,
    nbr = 10;
  let dataset = DataJson;
  function getSubtitle() {
    const population = getData(input)[0];
    return `<span style="font-size: 80px">${input}</span>
        <br>
        <span style="font-size: 22px">
            Total: <b>: ${numberWithCommas(population)}</b>
        </span>`;
  }
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const JsonImage = [
    {
      name: "China",
      image:
        "https://img.freepik.com/free-vector/china-flag-cartoon-style-isolated-white-background_1308-67445.jpg",
    },
    {
      name: "India",
      image:
        "https://t4.ftcdn.net/jpg/01/63/13/31/360_F_163133107_nAlMgjPUyciTEnZCs4GF97wSTYXDAHAn.jpg",
    },
    {
      name: "United States",
      image:
        "https://www.flaginstitute.org/wp/wp-content/uploads/2015/01/America-51.2.png",
    },
    {
      name: "Russia",
      image:
        "https://img.freepik.com/premium-vector/flag-russia-vector-illustration_514344-293.jpg",
    },
    {
      name: "Japan",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg.png",
    },
    {
      name: "Indonesia",
      image:
        "https://cdn.britannica.com/48/1648-004-A33B72D8/Flag-Indonesia.jpg",
    },
    {
      name: "Brazil",
      image: "https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
    },
    {
      name: "Germany",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png",
    },
    {
      name: "United Kingdom",
      image:
        "https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg",
    },
    {
      name: "Bangladesh",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/1200px-Flag_of_Bangladesh.svg.png",
    },
    {
      name: "Pakistan",
      image:
        "https://cdn.britannica.com/46/3346-004-D3BDE016/flag-symbolism-Pakistan-design-Islamic.jpg",
    },
    {
      name: "Nigeria",
      image: "https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg",
    },
    {
      name: "Italy",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/800px-Flag_of_Italy.svg.png",
    },
  ];
  const [indexdata, setIndexData] = useState(0);

  const countryImageMap = {};
  JsonImage.forEach((item) => {
    countryImageMap[item.name] = item.image;
  });

  function getData(year) {
    const output = Object.entries(dataset)
      .map((country) => {
        const [countryName, countryData] = country;
        const countryImage = countryImageMap[countryName]; // Get the image for the country
        return {
          name: countryName,
          y: Number(countryData[year]),
          image: countryImage,
        };
      })
      .sort((a, b) => b.y - a.y);
    const sumPopulation = output.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.y;
    }, 0);

    return [sumPopulation, output.slice(0, nbr)];
  }
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 450,
      animation: {
        duration: 500,
      },
      marginRight: 50,
    },
    credits: {
      enabled: false,
    },
    title: {
      display: false,
      text: `Population growth per country, 1950 to 2021 `,
      align: "left",
      useHTML: true,
    },
    subtitle: {
      useHTML: true,
      text: getSubtitle(),
      floating: true,
      align: "right",
      verticalAlign: "middle",
      y: 150,
      x: -100,
    },

    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      opposite: true,
      tickPixelInterval: 150,
      title: {
        text: null,
      },
    },
    plotOptions: {
      bar: { borderWidth: 2 },
      series: {
        animation: false,
        groupPadding: 2,
        pointPadding: 0.2,
        borderWidth: 0,
        colorByPoint: true,
        dataSorting: {
          enabled: true,
          matchByName: true,
        },
        type: "bar",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: "bar",
        name: startYear,
        data: getData(startYear)[1],
        pointWidth: 35,
        dataLabels: [
          {
            enabled: true,
            formatter: function () {
              return "<div>" + numberWithCommas(this.point.y) + "</div>";
            },
            useHTML: true,
            align: "end",
            anchor: "end",
          },
          {
            enabled: true,
            formatter: function () {
              return (
                '<div style="width: 30px; height: 30px; overflow: hidden; border-radius: 50%; margin-left: -40px;">' +
                '<img src="' +
                this.point.image +
                '" style="width: 100%; height: 100%; margin-left: 0; margin-top: 0;">' +
                "</div>"
              );
            },
            useHTML: true,
            align: "left",
          },
        ],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 550,
          },
          chartOptions: {
            xAxis: {
              visible: false,
            },
            subtitle: {
              x: 0,
            },
            plotOptions: {
              series: {
                dataLabels: [
                  {
                    enabled: true,
                    y: 8,
                  },
                  {
                    enabled: true,
                    format: "{point.name}",
                    y: -8,
                    style: {
                      fontWeight: "normal",
                      opacity: 0.7,
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (input >= endYear) {
      setInput(1950);

      pause();
    }
    if (indexdata >= 9) {
      // Auto-pause
      setIndexData(0);
    }
    setIndexData((Prev) => Prev + 1);
    setChartOptions({
      ...chartOptions,
      subtitle: {
        text: getSubtitle(),
      },
      series: [
        {
          name: input,
          data: getData(input)[1],
          dataLabels: [
            {
              enabled: true,
              formatter: function () {
                return "<div>" + numberWithCommas(this.point.y) + "</div>";
              },
              useHTML: true,
              align: "end",
              anchor: "end",
            },
            {
              enabled: true,
              formatter: function () {
                return (
                  '<div style="width: 30px; height: 30px; overflow: hidden; border-radius: 50%; margin-left: -40px;">' +
                  '<img src="' +
                  this.point.image +
                  '" style="width: 100%; height: 100%; margin-left: 0; margin-top: 0;">' +
                  "</div>"
                );
              },
              useHTML: true,
              align: "left",
            },
          ],
        },
      ],
    });
  }, [input]);
  const updateSeries = () => {
    // Update the series data with random values
    setInput((Prev) => Prev + 1);
  };
  const [isPlay, setIsPlay] = useState(false);
  const [intervals, setiIntervals] = useState(null);

  // let interval_n
  function play() {
    setIsPlay(true);
    setiIntervals(
      setInterval(function () {
        updateSeries();
      }, 300)
    );
  }
  function pause() {
    setIsPlay(false);
    clearInterval(intervals);
  }
  const [years, setYear] = useState([]);
  useEffect(() => {
    function calculateYears() {
      let year_start = 1950;
      let year_end = 2021;
      let gap = 4;
      // Calculate the years and add them to the 'years' array
      for (let year = year_start; year <= year_end; year += gap) {
        years.push(year);
      }
    }
    calculateYears(); // Call the function to calculate years
    // Make sure to remove the return statement
  }, []);

  // Calculate the average
  return (
    <div className="container">
      <div style={{ width: "100%", margin: "auto" }}>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />

        {/* Ruler-like text */}

        <div id="parent-container">
          <div
            id="play-controls"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div>
              {isPlay ? (
                <button
                  onClick={pause}
                  className="fa fa-pause"
                  id="play-pause-button"
                ></button>
              ) : (
                <button
                  onClick={play}
                  className="fa fa-play"
                  id="play-pause-button"
                ></button>
              )}
            </div>
            {/* Input range */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="play-range"
                type="range"
                value={input}
                style={{ width: "895px" }}
                //style={{ width: "100%" }}
                min="1950"
                max="2021"
              />
              <div style={{ backgroundColor: "#333", height: "1px" }}></div>

              <div className="timeline-ruler">
                {years.map((year) => (
                  <div className="timeline-year" key={year}>
                    <a style={{ fontSize: "12px" }}>{year}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
