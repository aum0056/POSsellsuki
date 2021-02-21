<template>
  <div class="hello">
    <h1>Shiba Book Shop</h1>
    <table class="table table-borderless">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Product Description</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody  v-for="(num,index) in count" :key="index">
        <tr v-if="count[index] !== '0'">
          <th scope="row">{{count[index]}}</th>
          <td>{{bookData[index].title}}</td>
          <td></td>
          <td>{{price[index]}}</td>
        </tr>
      </tbody>
</table>
    <h1>{{ discount }}</h1>
    <h1>{{ paid }}</h1>
    <h1>{{ totalPrice }}</h1>
    <router-link to="/">Client</router-link> 
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['discount','totalPrice', 'paid', 'count', 'price', 'bookData'],
  mounted() {
    console.log(this.count)
  }
}

// console.log(this.msg)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-bottom: 15vh;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.productbox {
  align-items: left;
}
</style>
