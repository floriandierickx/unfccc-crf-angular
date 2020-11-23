# UNFCCC CRF National Emission Inventory Sunbursts using Angular & Highcharts

Purpose of this repository: dreating (possibly interactive) sunburst graphs with national UNFCCC CRF emission data, using Angular and (at the moment) Highcharts visualisation library.

- Application development url: https://codesandbox.io/s/github/floriandierickx/unfccc-crf-angular

# Contribution guidelines:

1. Check the [GitHub Issues](https://github.com/floriandierickx/unfccc-crf-angular/issues) for ideas or add new feature ideas
2. Contribution:
   - Create an account on [CodeSandbox](https://codesandbox.io/) using your GitHub account
   - Create a Sandbox
     - ![alt text](https://i.imgur.com/fLPiIoS.png)
   - Import this project from GitHub using url https://github.com/floriandierickx/unfccc-crf-angular
     - ![alt text](https://i.imgur.com/BEFjXsr.png)
   - Log in to your GitHub account and link sandbox
     - ![alt text](https://i.imgur.com/4Qsk5rG.png)
   - Make edits
   - Commit changes to a new branch (pull request)
     - ![alt text](https://i.imgur.com/V7E3RSm.png)

## To do:

- [ ] Add data wrangling info (preferably code) : https://github.com/floriandierickx/unfccc-crf-angular/issues/5
- [ ] Use all-country all-years EEA dataset and create country- and year-filter feature https://github.com/floriandierickx/unfccc-crf-angular/issues/2
- [ ] Add line graph with historical emissions per main category https://github.com/floriandierickx/unfccc-crf-angular/issues/3
- [ ] Add energy production and energy use sunbursts https://github.com/floriandierickx/unfccc-crf-angular/issues/4
- [ ] Add consumption-based emissions for comparison https://github.com/floriandierickx/unfccc-crf-angular/issues/7

# Data sources

## Used:

- Hierarchical UNFCCC CRF data provided by EEA: https://www.eea.europa.eu/data-and-maps/data/national-emissions-reported-to-the-unfccc-and-to-the-eu-greenhouse-gas-monitoring-mechanism-16
- UNFCCC CRF category defitions from Johannes Gütschow: https://twitter.com/JoGuetschow/status/1330854682743484419?s=20
- Belgian National Inventory Report category information (work in progress): http://cdr.eionet.europa.eu/be/eu/mmr/art07_inventory/ghg_inventory/envxpvoyw/

## Interesting for future:

- More fine-grained breakdown of UNFCCC CRF emissions: @mikapfl and @openclimatedata (and a tiny little bit @floriandierickx :)) [read_di_unfccc](https://github.com/mikapfl/read_di_unfccc) data from UNFCCC API
- IEA energy production and use data for energy sunbursts
- (feel free to add here..)

# Installation and workflow documentation

## 1. Platform

- Angular highcharts project on **CodeSandBox** https://codesandbox.io/s/unfccc-crf-angular-6ks2v

## 2. Documentation

- Angular Material documentation: https://angular.io/tutorial/toh-pt0
- **Highcharts** integration in Angular app using documentation on https://github.com/highcharts/highcharts-angular

# Idea/inspiration

- [ghg_country_selector](https://github.com/martindaniel4/ghg_country_sector) from @martindaniel4
- @HannahRitchie and @OurWorldInData-User from @owid : https://ourworldindata.org/ghg-emissions-by-sector
