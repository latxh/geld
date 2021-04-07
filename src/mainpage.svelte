<script lang="ts">
  import { Button } from "svelte-materialify";
  import { darkTheme } from "./stores";
</script>

<div class="container">
  <Button
    class="toggle"
    on:click={() => {
      $darkTheme = !$darkTheme;
    }}
  >
    Theme
  </Button>
  <div class="container-input">
    <div class="action-btn1">
      <label for="Fixed">Fixed Expenses</label>
      <button class="btn1">+</button>
    </div>
    <form class="action-btn2">
      <label for="Fixed">Variable Expenses</label>
      <button class="btn2">+</button>
    </form>
    <form class="action-btn3">
      <label for="Fixed">Utilities</label>
      <button class="btn3">+</button>
    </form>
    <form class="action-btn4">
      <label for="Fixed">Create New</label>
      <button class="btn4">+</button>
    </form>
  </div>
  <div class="categories">
    <div class="categories-left">
      <input type="text" placeholder="Company name" />
      <input type="text" placeholder="Time perriod" />
    </div>
    <div class="categories-right">
      <div class="exit-btn"><button>x</button></div>
      <button>Food Product</button>
      <button>Food Product</button>
      <button>Food Product</button>
      <button>Food Product</button>
      <button>Food Product</button>
      <button>Food Product</button>
      <button>Food Product</button>
      <button>Food Product</button>
      <button>Food Product</button>
      <button>Food Product</button>
      <button>Food Product</button>
    </div>
  </div>
  <div class="search-bar">
    <input type="search" placeholder="Search" />
  </div>
  <div class="new-transaction">
    <p>New Transaction</p>
    <input type="text" />
  </div>
  <div class="sorted-transaction">
    <p>Previously Sorted Transaction</p>
    <input type="text" />
  </div>
</div>
