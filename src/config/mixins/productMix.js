import {url, baseStorage} from '@/config/global'
import {  mapMutations, mapState } from 'vuex'
export default {
    computed:{
        ...mapState('shopping',['cart']),
    },
    data(){
        return {
            contador:0, 
            six: 6,
            eleven:12,
            sectionCart:false,
            cartQuantity:0,
            cartValue:0,
            cartSent:{},
            addItem:true,
            urlImageDefault: `${url}${this.image}`,
            urlImageStorage: `${baseStorage}${this.image}`,
        }
    },
    methods: {
        start(){
            this.addItem = true
            this.sectionCart= true
        },
        controlCart(quant, add, productValue){
            if(add){
                this.cartValue = parseFloat((quant*productValue).toFixed(2))
              
                
            }else{
              
                let toDecrease = productValue*quant
                
                this.cartValue =  parseFloat((this.cartValue-toDecrease).toFixed(2))
            }
        },
        toAdd(quantity, value){
           
            if(this.cartQuantity == 0){
                this.cartQuantity = this.contador+ quantity
            }
            this.cartQuantity = this.cartQuantity+quantity
            
            this.cartValue =  value*this.cartQuantity
            this.controlCart(this.cartQuantity,true,value);
        },
        toDecrease(quantity, value){
            if(this.cartQuantity >= 1){
                
                this.controlCart(quantity,false,value);
                this.cartQuantity = this.cartQuantity-quantity
            }else if(this.cartQuantity <= 0 && this.cart.find(e=> e.id == this.id)){
                this.$store.commit('shopping/deleteProductCart', this.id)
                this.sectionCart = true
                this.cartQuantity = 0
                this.cartValue = 0
            }else{
                
                this.sectionCart = false
                this.addItem = true
                this.cartQuantity = 0
                this.cartValue = 0
            }            
        },
        SentCartHome(){
            console.log(this.SentCartHome.name)
            let cartHome ={
                'name': this.name,
                'price': this.value,
                'quantity':this.cartQuantity,
                'value':this.cartValue,
                'id': this.id,
                'image':this.image
            }
            console.log(cartHome)
            this.cartSent = cartHome
            // this.setCart(cartHome)
            this.$store.dispatch('shopping/setState', cartHome)
            // this.$store.commit('setCart', cartHome)
        },
        addSix(){
            this.contador+this.six
        },
        addEleven(){
            this.contador+this.eleven
        },
        getProduct(){
            if(this.cart.length > 0) {
                let product = this.cart.find(e=> e.id == this.id)
                console.log('Produto -> ', product)
                if(product){
                    this.cartQuantity = product.quantity
                    this.cartValue = product.value
                }
            }
        },
        selectItem(item){
            if(this.cart.length > 0){
                this.sectionCart = this.cart.find(e=>e.id == item) ? true : false
                
                this.addItem = this.sectionCart ? false : true
            }
        }
    },
    mounted() {
      this.getProduct()  
      this.selectItem(this.id)
    },
}