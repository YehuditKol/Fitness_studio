// רשימת מוצרים
const Products = [
    {
        id: 1,
        price: 120,
        amount: 12,
        description: 'Water gym',
        img: "./pictures/icons/water.png"
    },
    {
        id: 2,
        price: 100,
        amount: 18,
        description: 'Pilates',
        img: "./pictures/icons/pilatis.png"
    },
    {
        id: 3,
        price: 80,
        amount: 25,
        description: 'Running group',
        img: "./pictures/icons/run.png"
    },
    {
        id: 4,
        price: 200,
        amount: 30,
        description: 'Gym',
        img: "./pictures/icons/erobi.png"
    },
    {
        id: 5,
        price: 90,
        amount: 15,
        description: 'aerobic',
        img: "./pictures/icons/erobi.png"
    },
    {
        id: 6,
        price: 130,
        amount: 10,
        description: 'Gymnastics',
        img: "./pictures/icons/acrobatic.png"
    }
];
//המוצרים- ציור האלמנטים
const creatProduct = function (product) {
    const productDiv = document.createElement('div');//דיב לכל מוצר
    document.getElementById('productContent').appendChild(productDiv);
    productDiv.className = "course";
    productDiv.id = product.id;//לכל אחד יהיה את הid היחודי לו
    productDiv.innerHTML = `<h2>${product.description}</h2>`;
    const priceSpan=document.createElement("span");
    productDiv.append(priceSpan);
    priceSpan.innerHTML= `<h5>${product.price}שח</h5>`;
    const prodImg = document.createElement('img');
    prodImg.src = product.img;
    productDiv.append(prodImg);
    prodImg.className = "imgCourse";
    //יצירת כפתור הוספה לסל
    const btn = document.createElement("button"); // יצרנו כפתור
    btn.innerHTML = "Buy now"; // הוספנו לתוכו טקסט
    btn.id = product.id;
    btn.addEventListener("click", addToCart);
    productDiv.append(btn);
    btn.className = "CartBtn";
}
function updateProductsAmount()//(העגול)עדכון המלאי של הסל
{
    const productsCart = cart.getCart();//שליפץ הסל
    const total = productsCart.reduce( function(a, b){
        return a + b['amount'];
    }, 0);
    const BasketCount = document.getElementById("BasketCount");
    BasketCount.innerHTML = total;
 }
 // סימון המוצרים בסל
function signProductCart(){
    //const cart = new Cart();
    const productsCart = cart.getCart();//שליפת הסל מlocalstorge
    productsCart.forEach(value=>{
        const divSignProd=document.getElementById(parseInt(value.productID));
        divSignProd.class="mark_product";
    });
}