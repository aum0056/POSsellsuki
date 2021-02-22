<template>
  <div class="row">
    <div class="col-lg-8">
        <div class="card box" v-for="(item,index) in bookData" :key="item.id" v-on:click="bookOnClick(item, index)">
            <img class="card-img-top" :src= item.cover alt="Card image cap">
            <div class="card-body">
                <p class="card-text">{{ item.title }}</p>
            </div>
        </div>
        <div class="row calculator">
            <div class="col-6">
                <div>
                    <div class="concludeCost"><span>Subtotal</span><span>{{totalPrice.toFixed(2)}} บาท</span></div>
                    <div class="concludeCost"><span>Discount</span><span>{{discount.toFixed(2)}} บาท</span></div>
                    <div class="concludeCost"><span>Total</span><span>{{(totalPrice-discount).toFixed(2)}} บาท</span></div>
                </div>
            </div>
            <div class="col-6">
                <div>
                    <div class="concludeCost"><span>Paid</span><span><input class="paid-box" type="number" v-model="paid"> บาท</span></div>
                    <div v-if="paid >= (totalPrice-discount)">
                        <div class="concludeCost"><span>Change</span><span>{{(paid-(totalPrice-discount)).toFixed(2)}} บาท</span></div>
                    </div>
                    <div v-else>
                        <div class="concludeCost"><span>Change</span><span>0.00 บาท</span></div>
                    </div>
                    <div class="submitBox" v-if="paid !== null">
                        <button :onclick="putToCustomer" type="button" class="btn btn-success submit">submit</button>
                    </div>
                    <div class="submitBox" v-else>
                        <button type="button" class="btn btn-secondary submit">submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col" width="10%">Qty</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col" width="10%"></th>
                </tr>
            </thead>
            <tbody class="fontBox" v-for="(num,index) in count" :key="index">
                <tr  v-if="count[index] !== 0" >
                    <th scope="row"><input class="col-12 price-box" type="number" v-model="count[index]" @input="changePrice(index)"></th>
                    <td> {{bookData[index].title}}</td>
                    <td>{{price[index]}}</td>
                    <td>
                        <button type="button" class="close" aria-label="Close" v-on:click="bookCancel(index)">
                            <span aria-hidden="true">&times;</span>
                         </button>
                    </td>
                </tr>
            </tbody>
        </table>    
    </div>
  </div>
</template>

<script>
import store from '../store'
import axios from 'axios'
export default {
    name: 'POS',
    data(){
        return {
            bookData: null,
            count: [],
            price: [],
            paid: null,
            totalPrice: 0,
            totalBook: 0,
            discount: 0,
            discountBook: 0,
            defaultPrice: [],
            maxDiscountBook: 0,
            test: [],
            discountGroup: [],
        }
    },
    async created() {
        const response = await axios.get("https://api.jsonbin.io/b/5f3154b06f8e4e3faf2f99de?fbclid=IwAR04RYRAxNxJZCu_YhjftxrpdqcAKDbnbD64ts9EFt5zV7vs4AFTBzyp7UU");
        this.bookData = response.data.books;
        this.counter()
    },
    methods: {
        setbooks() {
            store.commit({ type: 'SET_BOOKS', newBooks: this.bookData })
        },
        async putToCustomer(){
          await axios.put('http://localhost:3000/customer',{totalPrice: this.totalPrice, count: this.count, bookData: this.bookData, paid: this.paid, price: this.price, discount: this.discount})
          this.resetData()
        },
        counter() {
            for (var i = 0;i< this.bookData.length;i++) {
                this.count.push(0)
                this.price.push(0)
            }
            this.defaultPrice = this.bookData.map(data => parseInt(data.price))
        },
        resetData() {
            this.price = []
            this.count = []
            this.paid = null
            this.totalPrice = 0
            this.totalBook = 0
            this.discount = 0
            this.discountBook = 0
            this.maxDiscountBook = 0
            this.test = []
            this.discountGroup = []
        },
        bookOnClick(item, index) {
            this.price[index]+=parseInt(item.price)
            this.count[index]+=1
            this.totalPrice= this.price.reduce((a, b) => a + b)
            this.totalBook= this.count.reduce((a,b) => a + b)
            this.discount=0
            this.discountGroup = this.count.slice(0,-1)
            this.haveDiscount()
        },
        bookCancel(index){
            this.price[index] = 0;
            this.count[index] = 0;
            this.totalPrice= this.price.reduce((a, b) => a + b)
            this.totalBook= this.count.reduce((a,b) => a + b)
            this.discount=0
            this.discountGroup = this.count.slice(0,-1)
            this.haveDiscount()
        },
        haveDiscount() {
            this.test = []
            this.maxDiscountBook = Math.max(...this.discountGroup)
            if(this.maxDiscountBook > 0){
                var oneIndex = this.discountGroup.indexOf(this.maxDiscountBook)
                while (oneIndex != -1) {
                    this.test.push(oneIndex);
                    oneIndex = this.discountGroup.indexOf(this.maxDiscountBook, oneIndex + 1);
                }
                if(this.test.length > 1){
                    var cost = this.test.map( data => this.defaultPrice[data])
                    var beforeDiscount = cost.reduce((a,b) => a + b)
                    if(this.test.length === 2){
                        this.discount += beforeDiscount*0.1 
                    }
                    else if(this.test.length === 3){
                        this.discount += beforeDiscount*0.11 
                    }
                    else if(this.test.length === 4){
                        this.discount += beforeDiscount*0.12 
                    }
                    else if(this.test.length === 5){
                        this.discount += beforeDiscount*0.13 
                    }
                    else if(this.test.length === 6){
                        this.discount += beforeDiscount*0.14 
                    }
                    else if(this.test.length === 7){
                        this.discount += beforeDiscount*0.15 
                    }
                }
                for( var i in this.test ) {
                    this.discountGroup[this.test[i]] = this.discountGroup[this.test[i]]-1
                }
                this.haveDiscount()
                }
        },
        changePrice(index) {
            if(this.count[index] === ""){
                this.count[index] = null
            }
            else{
                this.count[index] = parseInt(this.count[index])
            }
            this.price[index] = this.defaultPrice[index]*this.count[index]
            this.totalPrice= this.price.reduce((a, b) => a + b)
            this.totalBook= this.count.reduce((a,b) => a + b)
            this.discount=0
            this.discountGroup = this.count.slice(0,-1)
            console.log(this.count)
            this.haveDiscount()
        }
        
    },
}
</script>

<style scoped>

@media (min-width:768px) and (max-width: 991.98px) {
    .box {   
        height: calc(110% / 4);
        width: calc(90% / 4);
        display: inline-block;
        font-size: 12px;
        margin: 0.5rem 0.25rem;
    }
    .col-lg-4 {
        margin-top: 10vw;
    }
    
}

@media (min-width: 992px) {
    .box {   
        height: calc(100vh / 4);
        width: calc(60vw / 4);
        display: inline-block;
        font-size: 1.4vh;
        margin: 0.5rem 0.25rem;
    }
}
.paid-box{
    width: 15vw;
    text-align: right;
}

img {
    height: 100%;
}

.card-body {
    padding: 0.5rem;
    border: 1px solid black;
}
.col-lg-8 {
    height: 100%;
}

.price-box {
    text-align: center;
    margin: auto 0;
    padding: 0px;
}
form.index-add-form {
  position: relative;
  display: inline-block;
  padding: 0px;
}
.concludeCost {
    display: flex;
    padding: 1vw 3vw;
    justify-content: space-between;
    font-size: 2vh;
}
.submit {
    position: absolute;
    right: 3vw;
}
.submitBox {
    padding: 1vw 3vw;
    position: relative;
}
.calculator {
    margin-top: 5vh;
}
.fontBox {
    font-size: 1.4vh;
}
</style>
