import {url, baseStorage} from '@/config/global'
import { mapGetters } from 'vuex'
export default {
    computed:mapGetters(['EstadoCart']),
    data(){
        return {
            contador:0, 
            six: 6,
            eleven:12,
            cart:true,
            cartQuantity:0,
            cartValue:0,
            cartSent:{},
            urlImageDefault: `${url}${this.image}`,
            urlImageStorage: `${baseStorage}${this.image}`,
        }
    },
    methods: {
        start(){
            this.cart = false
        },
        controlCart(quant, add, productValue){
            if(add){
                this.cartValue = parseFloat((quant*productValue).toFixed(2))
                console.log(this.controlCart.name, ' add if')
                // console.log()
            }else{
                console.log(this.controlCart.name, 'else')
                let toDecrease = productValue*quant
                
                this.cartValue =  parseFloat((this.cartValue-toDecrease).toFixed(2))
            }
        },
        toAdd(quantity, value){
            console.log('aqui ->'+quantity)
            if(this.cartQuantity == 0){
                this.cartQuantity = this.contador+ quantity
            }
            this.cartQuantity = this.cartQuantity+quantity
            
            this.cartValue =  value*this.cartQuantity
            this.controlCart(this.cartQuantity,true,value);
        },
        toDecrease(quantity, value){
            if(this.cartQuantity >= 1){
                console.log('ESTOU AQUI if', this.cartQuantity)
                this.controlCart(quantity,false,value);
                this.cartQuantity = this.cartQuantity-quantity
            }else if(this.cartQuantity <= 0 && this.EstadoCart.find(e=> e.id == this.id)){
                console.log('ESTOU AQUI ELSEIF')
                this.$store.commit('deleteProductCart', this.id)
                this.cart = true
                this.cartQuantity = 0
                this.cartValue = 0
            }else{
                console.log('ESTOU AQUI ELSE')
                this.cart = true
                this.cartQuantity = 0
                this.cartValue = 0
            }            
        },
        SentCartHome(){
            const cartHome = {
                'name': this.name,
                'price': this.value,
                'quantity':this.cartQuantity,
                'value':this.cartValue,
                'id': this.id,
                'image':this.image
            }
            this.cartSent = cartHome
            
            this.$store.commit('setCart', cartHome)
        },
        addSix(){
            this.contador+this.six
        },
        addEleven(){
            this.contador+this.eleven
        },
        getProduct(){
            if(this.EstadoCart.length > 0) {
                let product = this.EstadoCart.find(e=> e.id == this.id)
                if(product){
                    this.cartQuantity = product.quantity
                    this.cartValue = product.value
                }
            }
        }
    },
    mounted() {
      this.getProduct()  
    },
}