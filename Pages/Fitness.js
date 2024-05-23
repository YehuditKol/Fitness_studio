// פונקציות למעבר בין עמודים
function BMIPage() {//עמוד BMI
    document.getElementById("BMI-Page").style.display = "block";
    document.getElementById("Home-Page").style.display = "none";
    document.getElementById("Products-Page").style.display = "none";
    const colors=document.getElementById("colors");
    colors.id="AfterColors";
}
function ProductsPage() {//עמוד מוצרים
    document.getElementById("courses").style.fontWeight = "bolder";
    document.getElementById("Products-Page").style.display = "block";
    document.getElementById("Home-Page").style.display = "none";
    document.getElementById("BMI-Page").style.display = "none";
    document.getElementById("colors").id="colors";
}
function HomePage() {//עמוד הבית
    document.getElementById("BMI-Page").style.display = "none";
    document.getElementById("Products-Page").style.display = "none";
    setTimeout(popupCoupon,1000);
}
Products.forEach(creatProduct);
const cart = new Cart();


//מוצרים לlocalstorage עי תנאי חד פעמי
const updateInventory  = function (product) {
    localStorage.setItem(`amount-${product.id}`, product.amount);
}
//localStorage.clear();
if (localStorage.getItem("1") == null) {
    Products.forEach(updateInventory);
}
signProductCart();
 updateProductsAmount();
//search
 const search = document.getElementById('search_nav_input');
//  search.addEventListener('keypress', function (e) {
//     let filteredItems = Products.find(
//         (product) => product.description.includes(e.target.value)
//     );
//     creatProduct(filteredItems);
// });
//הוספת מוצר לסל
function addToCart() {
    const current_amount = localStorage.getItem(`amount-${this.id}`);
    const amount = JSON.parse(current_amount);//המרה לint
    const productID = this.id;
    const exist_product=cart.findProduct(productID);

    if (exist_product) {//אם כבר קיים בסל מוצר זה
        if (amount > exist_product.amount) {//אם המלאי לא הסתיים
            cart.updateProductAmount(productID);
        }
        else {
            alert('נגמרה ההרשמה לקורס😒');
        }
    }
    else  {
        cart.addProductToCart(productID);
    }
     this.parentElement.class = "mark_product";
    // this.parentElement.style.border="4px solid ";
    // this.parentElement.style. borderImage=" linear-gradient(to right, #82009f 0, #5d34af 50%, #00ceab 100%)50";
     //עדכון העגלה
     //updateCart(cart);
     updateProductsAmount();//
     openNav();//פתיחת הסל
     setTimeout(closeNav,1000);
}

const cart_product = document.createElement('div');//יצירת מקום בסל לתוכן שלו
cart_product.id = "cart_product";
// וציור הסל
function drawCart() {
    const str_cart = localStorage.getItem("cart");//מחרוזת ששולפת את העגלה מהלקל
    const myCart = document.querySelector("#myCart");//קריאה לסל הקניות מהhtml
    // const cart_product = document.createElement('div');//יצירת מקום בסל לתוכן שלו
    // cart_product.id = "cart_product";
    myCart.append(cart_product);
    if (str_cart=="[]"||!str_cart)//אם אין מוצרים שנוספו לסל
    {
        cart_product.innerHTML = " ";
        cart_product.innerHTML = "אין פה עדיין כלום... זה הזמן לחזור  ולהתחיל למלא את היום שלכם בפעילות :)";
    }
    else {
        document.getElementById("sumPrice").style.display="block"
        let buy_product = [];//מערך המוצרים שבסל
        buy_product = JSON.parse(str_cart);//המרה לאוביקט במערך
        console.log(buy_product);
        buy_product.forEach(p => {//למצוא את המוצרים שבסל במערך המקורי
            const current_product = Products.find(obj => {
                return obj.id === parseInt(p.productID);
            });
            console.log(p.amount + " " + current_product.amount);
            // cart_product.innerHTML=" ";//ריקון הסל הקודם
            const divProd = document.createElement('div');//מקום למוצר
            divProd.id = "divProd";
            cart_product.append(divProd);
            divProd.innerHTML = `<span>${current_product.description}</span>`;
            const amountdiv = document.createElement('div');
            divProd.append(amountdiv);
            amountdiv.innerHTML = `<p>${p.amount}</p>`;
            const pricediv = document.createElement('p');
            divProd.append(pricediv);
            pricediv.innerHTML=`₪${current_product.price}`;
            const prodImg = document.createElement('img');
            prodImg.src = current_product.img;
            divProd.append(prodImg);
            prodImg.className = "prodImg";
            const divProdIcons=document.createElement('div');
            divProd.append(divProdIcons);
            divProdIcons.id="divProdIcons";
            const deleteProd=document.createElement('img');
            divProdIcons.append(deleteProd);
            deleteProd.id="deleteProd";
            deleteProd.src="./pictures/icons/delete.gif";
            deleteProd.productID = current_product.id;
            deleteProd.addEventListener('click',deleteFromCartEvent);//הסרה מהסל
            const plus= document.createElement('img');//הוספת והורדת כמות
            divProdIcons.append(plus);
            plus.id="plus";
            plus.productID = current_product.id;
            plus.src="./pictures/icons/plus.gif";
            plus.addEventListener('click', (event) => {
                //const productId = event.target.productID; 
                let cart = JSON.parse(localStorage.getItem('cart'));
                const exist_product=getByProductId(event.target.productID);
                // const exist_product = cart.find(obj => {
                //   return parseInt(obj.productID) === productId;
                // });
                const amountProduct=localStorage.getItem(`amount-${event.target.productID}`);
                const p_amount = JSON.parse(amountProduct);
                if(exist_product){
                    if(p_amount > exist_product.amount){
                        exist_product.amount += 1;//תוסיף לכמות
                        pricediv.innerHTML=`₪${current_product.price}`;
                    }
                    else{
                        alert('נגמרה ההרשמה לקורס😒');
                    }
                }
                amountdiv.innerHTML = `<p>${exist_product.amount}</p>`
                const str = JSON.stringify(cart);
                localStorage.setItem("cart", str);
              });
            const minus= document.createElement('img');
            divProdIcons.append(minus);
            minus.id="minus";
            minus.src="./pictures/icons/minus.gif";
            minus.productID = current_product.id;
            minus.addEventListener('click', (event) => {
                const productId = event.target.productID; 
                let cart = JSON.parse(localStorage.getItem('cart'));
                const exist_product = cart.find(obj => {
                  return parseInt(obj.productID) === productId;
                });
              
                if(exist_product){
                    if( exist_product.amount>1){
                        exist_product.amount -= 1;//תוסיף לכמות
                        amountdiv.innerHTML = `<p>${exist_product.amount}</p>`
                        const str = JSON.stringify(cart);
                        localStorage.setItem("cart", str);
                    }
                    else{
                       
                        deleteFromCart(event.target.parentElement.parentElement,productId);
                    
                    }
                }
              });
        });
        console.log(buy_product)
        // const sumPrice=document.createElement('div');
        // sumPrice.id="sumPrice";
        // myCart.append(sumPrice);
    }

}

function deleteFromCart(elementToDelete,productId)
{
    elementToDelete.remove();//להסיר בסל את המוצר
    //const productId = this.productID;//שמירת הid לזיהוי המוצר

    const str_cart = localStorage.getItem("cart");//שליפת הסל
    if (str_cart) {
        cart = JSON.parse(str_cart);
    }
    const exist_product = cart.find(obj => {//   חיפוש מחזיר אלמנט בודד

        return parseInt(obj.productID) === productId;//מחזיר את האלמנט הראשון שעונה לפרמטר החיפוש
    });
  
    const divSignProd=document.getElementById(exist_product.productID);
   
    // cart.forEach(value=>{
    //     const divSignProd=document.getElementById(parseInt(value.productID));
    //     divSignProd.id="mark_product";
    // });
divSignProd.style.border="none";
    removeElement(exist_product);//מחיקת האלמנט מהלוקל
    //עדכון העגלה לאחר ההסרה
    updateProductsAmount();
    const str = JSON.stringify(cart);
    localStorage.setItem("cart", str);

}

function  deleteFromCartEvent()//פונקציה להסרה מהסל
{
    deleteFromCart(this.parentElement.parentElement,this.productID);
}
//פןנקציה שמבצעת את המחיקה מהלוקל
const removeElement = (element) => {
    const index = cart.indexOf(element);
    if (index > -1) {
        cart.splice(index, 1);
    } 

}

function bigCart(){
    document.getElementById("myCart").style.width = "100%"; 
    document.getElementById("myCart").style.opacity="90%";
    const chezBasket= document.getElementById("chezBasket").onclick=openNav;
    document.getElementById("chezBasket").style.marginRight="1400px";
    const divProd=document.getElementById(" divProd");
  
   
}
/* Set the width of the side navigation to 250px */
function openNav() {
     cart_product.innerHTML="";
    drawCart();
    document.getElementById("myCart").style.width = "250px";
    document.getElementById("myCart").style.opacity="100%";
    document.getElementById("chezBasket").onclick=bigCart;
    document.getElementById("chezBasket").style.marginRight="150px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("myCart").style.width = "0";
   updateProductsAmount();
}
//function to popup coupon
function popupCoupon(){
    // document.getElementById("coupon").style.display = "block";


    document.getElementById("coupon").style.transform="scale(1.0)";
    document.getElementById("coupon").style.transition="transform 0.2s";
}
popupCoupon();
function closecoupon(){
    // document.getElementById("coupon").style.display = "block";


    document.getElementById("coupon").style.transform="scale(0)";
    document.getElementById("coupon").style.transition="transform 0.2s";
}
setTimeout(closecoupon,4000);



