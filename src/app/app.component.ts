import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import HC_sunburst from "highcharts/modules/sunburst";
import Drilldown from "highcharts/modules/drilldown";
import Exporting from "highcharts/modules/exporting";
import ExportData from "highcharts/modules/export-data";
import Accessibility from "highcharts/modules/accessibility";
import _data from "./crf_data.json";

HC_sunburst(Highcharts);
Drilldown(Highcharts);
Exporting(Highcharts);
ExportData(Highcharts);
Accessibility(Highcharts);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  isHighcharts = typeof Highcharts === "object";
  highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  chart: Highcharts.Chart;
  chartData = [];
  crf_data_imported = [];

  public levelsOptions: any = [
    {
      level: 1,
      levelIsConstant: false,
      dataLabels: {
        filter: {
          property: "outerArcLength",
          operator: ">",
          value: 64
        }
      }
    },
    {
      level: 2,
      colorByPoint: true
    },
    {
      level: 3,
      colorVariation: {
        key: "brightness",
        to: -0.5
      }
    },
    {
      level: 4,
      colorVariation: {
        key: "brightness",
        to: 0.5
      }
    }
  ];

  constructor() {
    this.crf_data_imported = _data;
  }

  ngOnInit() {
    var data = this.crf_data_imported.map(({ id, parent, name, value }) => ({
      id,
      parent,
      name,
      value
    }));
    this.chartData = data;
    this.SetChartOptions();
  }

  SetChartOptions() {
    this.chartOptions = {
      chart: {
        type: "sunburst",
        height: "100%",
        styledMode: false,
        events: {
          load: (e) => {
            this.chart = e.target;
          }
        }
      },
      title: {
        text: "Belgian Territorial Emissions 2018"
      },
      subtitle: {
        text:
          'Source: <href="https://www.eea.europa.eu/data-and-maps/data/national-emissions-reported-to-the-unfccc-and-to-the-eu-greenhouse-gas-monitoring-mechanism-16">EEA</a>, adapted from UNFCCC CRF 2020'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        useHTML: true,
        headerFormat: "",
        pointFormat:
          "<b>{point.name}</b> 2018 emissions were <b>{point.value} Gg CO2eq</b><br><u>UNFCCC CRF Category</u>: {point.category-full}<br><u>NIR Background</u>: {point.NIR-BE-all}"
      },
      series: [
        {
          type: "sunburst",
          data: this.chartData,
          allowDrillToNode: true,
          cursor: "pointer",
          dataLabels: {
            format: "{point.name}",
            filter: {
              property: "innerArcLength",
              operator: ">",
              value: 1
            },
            rotationMode: "circular"
          },
          levels: this.levelsOptions,
          point: {
            events: {
              click(e) {
                var currentOptions = this.series.userOptions.levels;
                var clickedLevel = this.node.level;
                var idPreviousRoot = 0.0;
                var rootNode = 0.0;

                if (!isNaN(this.series.idPreviousRoot)) {
                  idPreviousRoot = parseFloat(this.series.idPreviousRoot);
                }

                if (!isNaN(this.series.rootNode)) {
                  rootNode = parseFloat(this.series.rootNode);
                }

                if (rootNode === 0) {
                  clickedLevel = 1;
                }

                if (rootNode !== 0 && idPreviousRoot > rootNode) {
                  clickedLevel = 2;
                }

                for (let i of currentOptions) {
                  if (
                    i.level === clickedLevel ||
                    i.level === clickedLevel + 1 ||
                    i.level === clickedLevel - 1
                  ) {
                    i.hidden = false;

                    if (i.level === 1) {
                      i.levelSize = {
                        unit: "pixels",
                        value: 90
                      };
                    } else {
                      i.levelSize = {
                        value: 1
                      };
                    }
                    if (i.level === 4) {
                      i.dataLabels = Object.assign({}, i.dataLabels, {
                        enabled: true
                      });
                    }
                  } else {
                    i.hidden = true;
                    i.levelSize = {
                      value: 0
                    };
                    if (i.level === 4) {
                      i.dataLabels = Object.assign({}, i.dataLabels, {
                        enabled: false
                      });
                    }
                  }
                }

                this.update({
                  levels: currentOptions
                });
              }
            }
          }
        }
      ]
    } as any;
  }
}
