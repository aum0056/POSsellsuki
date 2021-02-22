<template>
  <div class="bigbox"  v-if="isLoading === true">
    <h1>Shiba Book Shop</h1>
    <table class="table table-borderless">
      <thead>
        <tr>
          <th scope="col" width='20vw'></th>
          <th scope="col" class="productbox">Product Description</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody  v-for="(num,index) in customerData.count" :key="index">
        <tr v-if="customerData.count[index] !== 0">
          <th scope="row">{{customerData.count[index]}}</th>
          <td class="detail-left">{{customerData.bookData[index].title}}</td>
          <td></td>
          <td></td>
          <td class="detail-right">{{customerData.price[index]}}</td>
          <td></td>
        </tr>
      </tbody>
      <tbody class="subtotal">
          <th scope="row"></th>
          <td></td>
          <td class="detail-left">subtotal</td>
          <td></td>
          <td class="detail-right">{{customerData.totalPrice}}</td>
      </tbody>
      <tbody>
          <th scope="row"></th>
          <td></td>
          <td class="detail-left">discount</td>
          <td></td>
          <td class="detail-right">{{customerData.discount}}</td>
      </tbody>
      <tbody>
          <th scope="row"></th>
          <td></td>
          <td class="detail-left">total</td>
          <td></td>
          <td class="detail-right">{{customerData.totalPrice-customerData.discount}}</td>
      </tbody>
       <tbody class="subtotal">
          <th scope="row"></th>
          <td></td>
          <td class="detail-left">paid</td>
          <td></td>
          <td class="detail-right">{{customerData.paid}}</td>
      </tbody>
      <tbody>
          <th scope="row"></th>
          <td></td>
          <td class="detail-left">change</td>
          <td></td>
          <td class="detail-right">{{(customerData.paid-(customerData.totalPrice-customerData.discount)).toFixed(2)}}</td>
      </tbody>
    </table>
  </div>
</template>

<script>
import store from '../store'
import axios from "axios"

export default {
  data() {
    return {
      books: store.state.books,
      customerData: null,
      isLoading: false
    }
  },
  async created(){
    await setInterval(this.getData, 2000)
  },
  methods: {
    async getData() {
      const response = await axios.get("http://localhost:3000/customer")
      this.customerData = response.data
      this.isLoading = true;
      console.log(this.customerData)
    }
  }
}

</script>

<style scoped>
h1 {
  padding-bottom: 10vh;
  border-bottom: solid black 3px;
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
  width: 30vw;
  text-align: left;
}
.bigbox {
  margin: 2vw;
}
.subtotal {
  border-top: solid;
}
.detail-right {
  text-align: right;
}
.detail-left {
  text-align: left;
}
</style>
