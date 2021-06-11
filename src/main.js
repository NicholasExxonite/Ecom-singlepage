'use strict';

// function counter() {
//   let seconds = 0;
//   setInterval(() => {
//     seconds += 1;
//     document.getElementById('app').innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
//   }, 1000);
// }
//
// counter();


// List of items
var items = [
  {
    itemName: 'Watch One',
    description: 'Description for item One',
    price: 10,
    numInCart: 0,
    imgurl: "images/watch1.jpg"
  },
  {
    itemName: 'Watch Two',
    description: 'Description for item Two',
    price: 15,
    numInCart: 0,
    imgurl: "images/watch2.jpg",
  },
  {
    itemName: 'Watch Three',
    description: 'Description for item Three',
    price: 20,
    numInCart: 0,
    imgurl: "images/watch3.jpg"
  },
  {
    itemName: 'Watch Four',
    description: 'Description for item Four',
    price: 25,
    numInCart: 0,
    imgurl: "images/watch4.jpg"
  },
  {
    itemName: 'Watch Five',
    description: 'Description for item Five',
    price: 30,
    numInCart: 0,
    imgurl: "images/watch5.jpg"
  }
]

    // <a class="remove cart${i}" href=#> Remove from cart</a>

// <a class="addtocart cart${i}">
//
// </a>
//Display shopping products


items.forEach((item, i) => {
  $(".shoppinglist").append(
    `
    <div class="singleproduct">
      <p>${item.itemName}</p>
      <img src="images/watch${i+1}.jpg" style="width:100%; height:200px;">

      <p>${item.description}</p>
      <p>$${item.price}</p>

      <div class= "productButtons">
        <i class="addtocart cart${i} fas fa-plus-circle"></i>
        <i class="remove cart${i} fas fa-trash-alt"></i>
      </div>
    </div>
    `
  );
  $(".remove.cart"+i).hide();
  // checkRemoveButton(item, i);
});


$('.cart').click(function(){
  $('.cartInfo').toggle(1000);
})

// function checkRemoveButton(item, i){
//   let cartItems = localStorage.getItem('cartProducts');
//   cartItems = JSON.parse(cartItems);
//   let target = $(".remove.cart"+i);
//
//   if(cartItems[item.itemName] == undefined){
//     target.hide();
//     // console.log("not in cart.." + i);
//
//   }else {
//     target.show();
//     console.log(cartItems[item.itemName]);
//     console.log(cartItems[item.itemName].numInCart + " : "+  i);
//   }
//
// }

// $(document).ready(function(){
//   let cartItems = localStorage.getItem('cartProducts');
//   cartItems = JSON.parse(cartItems);
//
//   items.forEach((item, i) => {
//     var target =$(".remove.cart"+i);
//
//     if (cartItems[item.itemName] == undefined) {
//       console.log("not in cart");
//       target.hide();
//     }else {
//       console.log(cartItems[item.itemName].itemName+" in cart!");
//       target.show();
//     }
//   });


  // console.log(cartItems);
  // Object.values(cartItems).map((item, i) => {
  //   let target = $(".remove.cart"+i);
  //
  //   console.log(item);
  // })

// })



let carts = document.querySelectorAll('.addtocart');

for(let i =0; i< carts.length; i++){
  carts[i].addEventListener('click', ()=>{
    console.log("added to cart");

    var target = $(".remove.cart"+i);
    target.show();
    
    totalCost(items[i]);
    cartNumbers(items[i]);

  })
}

function removeFromCart(){
  let removecart = document.querySelectorAll('.remove');

  for(let i=0; i<removecart.length; i++){
    removecart[i].addEventListener('click', ()=>{
      console.log("removed from cart: " + items[i].itemName);

      let cartItems = localStorage.getItem('cartProducts');
      cartItems = JSON.parse(cartItems);
      console.log(cartItems);

      //check if it exists using name
      if(cartItems.hasOwnProperty(items[i].itemName)){
        //get cur totalCart
        let totalcost = localStorage.getItem('totalCost')
        totalcost = parseInt(totalcost);

        //get cur number of items in cart
        let productNumb = localStorage.getItem('cartNumbers');
        productNumb = parseInt(productNumb);

        //If it's more than 1, reduce quantity
        if(cartItems[items[i].itemName].numInCart > 1 ){
          console.log(cartItems[items[i].itemName].numInCart);
          console.log("more than 1");

          //decrease quantity with 1
          cartItems[items[i].itemName].numInCart -= 1;


          //set new local storage
          localStorage.setItem("cartProducts", JSON.stringify(cartItems));

          //set new total total
          console.log("previous totalcost: "+ totalcost);
          localStorage.setItem("totalCost", totalcost - items[i].price)

          //set new number of items in cart
          localStorage.setItem('cartNumbers', productNumb - 1);
          document.querySelector('.cart span').textContent = productNumb - 1;

          console.log("new totalcost: " + parseInt(localStorage.getItem('totalCost')));

        // If quantity is 1, remove item from cart.
        }else {
          console.log("less than 1 in cart, delete whole item");

          var target = $(".remove.cart"+i);
          target.hide();
          // console.log(cartItems[items[i].numInCart]);

          console.log(cartItems[items[i].itemName].numInCart);

          //0 of this item are in the cart after removing
          cartItems[items[i].itemName].numInCart = 0;
          items[i].numInCart = 0;

          //delete whole item entry
          delete cartItems[items[i].itemName];

          //update cart items in local storage
          localStorage.setItem("cartProducts", JSON.stringify(cartItems));

          //set new total total
          console.log("previous totalcost: "+ totalcost);
          localStorage.setItem("totalCost", totalcost - items[i].price)

          //set new number of items in cart
          localStorage.setItem('cartNumbers', productNumb - 1);
          document.querySelector('.cart span').textContent = productNumb - 1;

        }
        //update cart
        getCart();

      }


      // console.log(typeof items[i]);
    });
  }
}


function loadCartNumbs(){
  let productNumb = localStorage.getItem('cartNumbers');

  document.querySelector('.cart span').textContent = productNumb;
}




function cartNumbers(item){

  // console.log(item);

  let productNumb = localStorage.getItem('cartNumbers');

  productNumb = parseInt(productNumb);

  if(productNumb){
    localStorage.setItem('cartNumbers', productNumb + 1);
    document.querySelector('.cart span').textContent = productNumb + 1;
  }else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent =1;
  }

  setCartItems(item);
}

function setCartItems(item){
  let cartItems = localStorage.getItem('cartProducts');
  cartItems = JSON.parse(cartItems);

  if(cartItems == null){
    item.numInCart = 1;
    // cartItems[item.itemName].numInCart = 1;
    cartItems = {
      [item.itemName] : item
    }
  }else {

    // get the previous items from local storage and all others
    if(cartItems[item.itemName] == undefined){
      cartItems = {
        ...cartItems,
        [item.itemName]: item
      }
    }
    cartItems[item.itemName].numInCart += 1;
  }

  localStorage.setItem("cartProducts", JSON.stringify(cartItems));

  //update cart
  getCart();
}

function totalCost(item){
  let totalCartCost = localStorage.getItem('totalCost');
  console.log("added item: "+ item.itemName + " with cost of: " + item.price);
  console.log("total cost before is: "+ totalCartCost);

// If an item is already selected add its price to total cost, else save the first added item's price as the total cost.
  if(totalCartCost != null){
    totalCartCost = parseInt(totalCartCost);

    localStorage.setItem("totalCost", totalCartCost + item.price)

  }else {
    localStorage.setItem("totalCost", item.price)
  }
  console.log("total cost now is: " + localStorage.getItem("totalCost"));
}


function getCart(){
  let items = localStorage.getItem("cartProducts");
  items = JSON.parse(items);

  let container = document.querySelector(".products");

  let totalCartCost = localStorage.getItem('totalCost');
  totalCartCost = JSON.parse(totalCartCost);
  // run only if items and .cart-container is running.
  if (items && container) {
    container.innerHTML = '';

    // check the values of the cart items
    Object.values(items).map((item) => {
      container.innerHTML += `
      <div class=productItem>
        <div class="item-title">
          <div>${item.itemName}</div>
          <img src="${item.imgurl}" style="width:60px; height:60px;">
        </div>
        <div class="item-price">${item.price}</div>
        <div class="item-quantity">${item.numInCart}</div>
        <div class="item-total">$${item.price * item.numInCart},00</div>
      </div>
      `
    });

    container.innerHTML += `
    <div class="basket-total-container">
      <h4 class="basket-total-title">
        Basket Total
      </h4>
      <h4 class="basket-total-amount">
      $${totalCartCost},00
      </h4>
    `
  }


  // console.log(items);
}


// run when page loads.
// checkRemove();
getCart()
removeFromCart();
loadCartNumbs();
