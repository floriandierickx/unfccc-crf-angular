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
    var data = this.crf_data_imported.map(
      ({ id, parent, name, value, CRF_full, CRF_description, NIR_BE_all }) => ({
        id,
        parent,
        name,
        value,
        CRF_full,
        CRF_description,
        NIR_BE_all
      })
    );
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
            // Highcharts.getOptions().colors.splice(0, 0, "transparent"); // Highcharts.getOptions().colors.splice(0, 0, "transparent"); // splice center to color from 1st level --> not working
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
        valueDecimals: 2,
        pointFormat:
          "<b>{point.name}</b> 2018 emissions were <b>{point.value} Gg/kt CO2eq</b><br><u>UNFCCC CRF Category</u>: {point.CRF_full}<br><u>UNFCCC CRF Description</u>: {point.CRF_description}<br><u>Belgian NIR Background</u>: {point.NIR_BE_all}"
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
              value: 16
            },
            rotationMode: "circular"
          },
          levels: this.levelsOptions
        }
      ]
    } as any;
  }
}
