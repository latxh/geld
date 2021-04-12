<script lang="ts">
  import FusionCharts from "fusioncharts";
  import Charts from "fusioncharts/fusioncharts.charts";
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";
  import { transactions } from "./stores";
  //import Transaction from "./types";

  fcRoot(FusionCharts, Charts, FusionTheme);

  // let dataSource = {
  //     chart: {
  //       //need the update
  //       caption: "Transaction",
  //       subCaption: "In MMbbl = One Million barrels",
  //       xAxisName: "Country",
  //       yAxisName: "Reserves (MMbbl)",
  //       numberSuffix: "K",
  //       theme: "fusion",
  //     },
  //     //data from the transaction
  //     data: [
  //       {
  //         label: "todo", //Transaction.category,
  //         value: "290",
  //       },
  //       {
  //         label: "Saudi",
  //         value: "260",
  //       },
  //       {
  //         label: "Canada",
  //         value: "180",
  //       },
  //       {
  //         label: "Iran",
  //         value: "140",
  //       },
  //       {
  //         label: "Russia",
  //         value: "115",
  //       },
  //       {
  //         label: "UAE",
  //         value: "100",
  //       },
  //       {
  //         label: "US",
  //         value: "30",
  //       },
  //       {
  //         label: "China",
  //         value: "30",
  //       },
  //     ],
  //   },
  let chartConfig = {};
  $: {
    let categoriesSet = new Set<string>();
    for (const transaction of $transactions) {
      categoriesSet.add(transaction.category);
    }
    let categories = Array.from(categoriesSet);

    let data = [];
    for (const category of categories) {
      data.push({
        label: category,
        value: $transactions.filter((item) => item.category === category)
          .length,
      });
    }

    chartConfig = {
      type: "column2d",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Transaction Categories",
          subCaption: "All Categories",
          xAxisName: "Categories",
          yAxisName: "Number of Transactions",
          numberSuffix: "",
          theme: "fusion",
        },
        data: data,
      },
    };
  }
</script>

<div id="chart-container">
  <SvelteFC {...chartConfig} />
</div>

<style>
  #chart-container {
    width: 100%;
    overflow-x: auto;
  }

  #chart-container :global(text[x="6"]) {
    display: none;
  }
</style>
