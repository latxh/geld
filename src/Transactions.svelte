<script lang="ts">
  import { Button } from "svelte-materialify";
  import {
    Icon,
    ExpansionPanel,
    ExpansionPanels,
    MaterialApp,
  } from "svelte-materialify";

  import { darkTheme, transactions } from "./stores";
  import { mdiArrowUp } from "@mdi/js";

  let sortCol = "";
  let direction = -1;
  let sorted: Transactions = [];

  $: {
    if (sortCol === "") {
      sorted = $transactions;
    } else {
      sorted = $transactions.slice();
      sorted.sort((a, b) => {
        if (a[sortCol] < b[sortCol]) return -direction;
        if (a[sortCol] == b[sortCol]) return 0;
        return direction;
      });
    }
  }
</script>

<h4>All Transactions</h4>
<table>
  <tr>
    <th
      on:click={() => {
        if (sortCol !== "date") {
          sortCol = "date";
          direction = -1;
        } else if (direction === -1) {
          direction = 1;
        } else {
          sortCol = "";
        }
      }}
    >
      Date
      {#if sortCol === "date"}
        <Icon path={mdiArrowUp} />
      {/if}
    </th>
    <th>Posted Date</th>
    <th>Card Number</th>
    <th>Description</th>
    <th>Category</th>
    <th>Amount</th>
  </tr>

  {#each sorted as transaction}
    <tr class={transaction.amount >= 0 ? "positive" : "negative"}>
      <td>{transaction.date.toDateString().slice(4)}</td>
      <td>{transaction.postedDate.toDateString().slice(4)}</td>
      <td>{transaction.cardNumber}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td class={transaction.amount >= 0 ? "positive" : "negative"}
        >{transaction.amount}</td
      >
    </tr>
  {/each}
</table>

<style>
  table,
  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    padding: 15px;
  }

  h3 {
    margin-bottom: 15px;
  }

  tr.positive {
    color: #137333;
    background: #e6f4ea;
  }

  tr.negative {
    color: #c5221f;
    background: #fce8e6;
  }
</style>
