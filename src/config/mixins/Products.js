import {url, baseStorage} from '@/config/global'
export default {
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
            urlImageStorage: `${baseStorage}${this.image}`
        }
    },
    methods: {
        start(){
            this.contador = 0
            this.cart = false
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
            console.log('aqui ->'+quantity)
            if(this.cartQuantity == 0){
                this.cartQuantity = this.contador+ quantity
            }
            this.cartQuantity = this.cartQuantity+quantity
            
            this.cartValue =  value*this.cartQuantity
            this.controlCart(this.cartQuantity,true,value);
        },
        toDecrease(quantity, value){
            if(this.cartQuantity >= 0){
                this.controlCart(quantity,false,value);
                this.cartQuantity = this.cartQuantity-quantity
            }
            if(this.cartQuantity <= 0){
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
                'value':this.cartValue
            }

            this.cartSent = cartHome
        },
        addSix(){
            this.contador+this.six
        },
        addEleven(){
            this.contador+this.eleven
        },
    }
}