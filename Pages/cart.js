class Cart {
    constructor() {
      this.cart = [];
    }

    setCart(){
        const str = JSON.stringify(this.cart);
        localStorage.setItem("cart", str);  
    }
   
    updateProductAmount(productID){
        const exist_product = this.cart.find(obj => {//   חיפוש מחזיר אלמנט בודד
            if(obj.productID === productID)//מחזיר את האלמנט הראשון שעונה לפרמטר החיפוש
                obj.amount +=1;
        });
        const str = JSON.stringify(this.cart);
        localStorage.setItem("cart", str); 
        //setCart();
    }

    getCart() {
        const cartStr = localStorage.getItem("cart");
        if (cartStr) {
            this.cart = JSON.parse(cartStr);//המרה לאוביקט
        }
        return this.cart;
    }
  
    findProduct(productId){
            const exist_product = this.cart.find(obj => {//   חיפוש מחזיר אלמנט בודד
                return obj.productID === productId;//מחזיר את האלמנט הראשון שעונה לפרמטר החיפוש
            });
            return exist_product;
    }
   
    addProductToCart(productID){
        this.cart.push(
            {// יוצר מוצר ומכניס למערך של הסל
                productID: productID,
                amount: 1
            }
        )
        const str = JSON.stringify(this.cart);
        localStorage.setItem("cart", str); 
        //setCart();
    }
}

// function getCart(){
//     let cart = [];
//     const cartStr = localStorage.getItem("cart");
//     if (cartStr) {
//         cart = JSON.parse(cartStr);//המרה לאוביקט
//     }
//     return cart;
// }
// function findProduct(productId){
//     let cart = getCart();
//     const exist_product = cart.find(obj => {//   חיפוש מחזיר אלמנט בודד
//         return obj.productID === productId;//מחזיר את האלמנט הראשון שעונה לפרמטר החיפוש
//     });
//     return exist_product;
// }

// function addProductToCart(productID,cart){
//     cart.push(
//         {// יוצר מוצר ומכניס למערך של הסל
//             productID: productID,
//             amount: 1
//         }
//     )
// }

// function updateCart(cart){
   
//     const str = JSON.stringify(cart);
//     localStorage.setItem("cart", str);  
// }

// function updateProductAmount(productID){
//     const existProduct = findProduct(productID);
//     let cart = getCart();
//     existProduct.amount += 1;
//     updateCart(cart);
// }