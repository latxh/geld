<script>
  import FusionCharts from "fusioncharts";
  import Charts from "fusioncharts/fusioncharts.charts";
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";
  //import Transaction from "./types";

  fcRoot(FusionCharts, Charts, FusionTheme);

  let dataSource = {
      chart: {
        //need the update
        caption: "Transaction",
        subCaption: "In MMbbl = One Million barrels",
        xAxisName: "Country",
        yAxisName: "Reserves (MMbbl)",
        numberSuffix: "K",
        theme: "fusion",
      },
      //data from the transaction
      data: [
        {
          label: "todo", //Transaction.category,
          value: "290",
        },
        {
          label: "Saudi",
          value: "260",
        },
        {
          label: "Canada",
          value: "180",
        },
        {
          label: "Iran",
          value: "140",
        },
        {
          label: "Russia",
          value: "115",
        },
        {
          label: "UAE",
          value: "100",
        },
        {
          label: "US",
          value: "30",
        },
        {
          label: "China",
          value: "30",
        },
      ],
    },
    chartConfig = {
      type: "column2d",
      width: "600",
      height: "400",
      dataFormat: "json",
      dataSource,
    };
</script>

<div id="chart-container">
  <SvelteFC {...chartConfig} />
</div>
