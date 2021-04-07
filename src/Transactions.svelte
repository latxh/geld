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
  const toggleColumn = (col: string) => {
    if (sortCol !== col) {
      sortCol = col;
      direction = -1;
    } else if (direction === -1) {
      direction = 1;
    } else {
      sortCol = "";
    }
  };
</script>

<h4>All Transactions</h4>
<table class="transtable">
  <tr>
    <th on:click={() => toggleColumn("date")}>
      Date
      <Icon
        path={mdiArrowUp}
        class={`arrow ${
          sortCol === "date" ? (direction === -1 ? "up" : "down") : "hidden"
        }`}
      />
    </th>
    <th on:click={() => toggleColumn("postedDate")}>
      Posted Date
      <Icon
        path={mdiArrowUp}
        class={`arrow ${
          sortCol === "postedDate"
            ? direction === -1
              ? "up"
              : "down"
            : "hidden"
        }`}
      />
    </th>
    <th on:click={() => toggleColumn("cardNumber")}>
      Card Number
      <Icon
        path={mdiArrowUp}
        class={`arrow ${
          sortCol === "cardNumber"
            ? direction === -1
              ? "up"
              : "down"
            : "hidden"
        }`}
      />
    </th>
    <th on:click={() => toggleColumn("description")}>
      Description
      <Icon
        path={mdiArrowUp}
        class={`arrow ${
          sortCol === "description"
            ? direction === -1
              ? "up"
              : "down"
            : "hidden"
        }`}
      />
    </th>
    <th on:click={() => toggleColumn("category")}>
      Category
      <Icon
        path={mdiArrowUp}
        class={`arrow ${
          sortCol === "category" ? (direction === -1 ? "up" : "down") : "hidden"
        }`}
      />
    </th>
    <th on:click={() => toggleColumn("amount")}>
      Amount
      <Icon
        path={mdiArrowUp}
        class={`arrow ${
          sortCol === "amount" ? (direction === -1 ? "up" : "down") : "hidden"
        }`}
      />
    </th>
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
  :global(i.arrow.hidden) {
    opacity: 0;
  }

  :global(th:hover i.arrow.hidden) {
    opacity: 0.5;
  }

  :global(i.arrow.down) {
    transform: rotateX(180deg);
  }

  :global(i.arrow) {
    width: 17px;
  }

  .transtable tr:first-child th {
    cursor: pointer;
  }

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
