'use strict';

// Declearing list of product items to be used.
let items = [
  {
    itemName: 'Watch One',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 10,
    numInCart: 0,
    imgurl: "images/watch1.jpg"
  },
  {
    itemName: 'Watch Two',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 15,
    numInCart: 0,
    imgurl: "images/watch2.jpg",
  },
  {
    itemName: 'Watch Three',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 20,
    numInCart: 0,
    imgurl: "images/watch3.jpg"
  },
  {
    itemName: 'Watch Four',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 25,
    numInCart: 0,
    imgurl: "images/watch4.jpg"
  },
  {
    itemName: 'Watch Five',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 30,
    numInCart: 0,
    imgurl: "images/watch5.jpg"
  }
]

//Displaying each item from our list on the page by appending it to .shoppinglist
function displayShoppingItems(){
  items.forEach((item, i) => {
    $(".shoppinglist").append(
      `
      <div class="singleproduct">

        <div class="productInfo">
          <div class="productHead">
            <p>${item.itemName}</p>
            <img class="productImage" src="images/watch${i+1}.jpg" >
          </div>

          <div class="itemDescription">${item.description}</div>
          <div>$${item.price},00</div>
        </div>


        <div class= "productButtons">
          <i class="addtocart cart${i} fas fa-plus-circle"></i>
          <i class="remove cart${i} fas fa-trash-alt"></i>
        </div>

      </div>
      `
    );
    productButtons(item, i)
    // if(localStorage.getItem('cartProducts')[item.itemName].numInCart)
  });
}
displayShoppingItems(items);


//function to toggle the add and remove from cart buttons from products.
function productButtons(item, i){
  let items = localStorage.getItem("cartProducts");
  items = JSON.parse(items);

  if(items[item.itemName] === undefined){
    $(".remove.cart"+i).hide();
  }
  else {
    $(".remove.cart"+i).show();
  }
}

//Function to toggle between showing and hiding basket.
function toggleBasket(){
  $('.cart').click(function(){
    $('.cartInfo').toggle(1000);
  })
}


//Function that checks if basket is in right condition
// If yes, POST basket data.
function commence_payment(){
  $('#checkout-button').click(function(){
    let totalcost = localStorage.getItem('totalCost');
    let cartNumb = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('cartProducts');
    cartItems = JSON.parse(cartItems);
    cartNumb = JSON.parse(cartNumb);


    let should_post = true;

  //The list that will contain the data sent via POST
    let to_send = [];

    // Check if basket is empty
    if(cartNumb == 0){
      alert('Your shopping cart is empty');
    //if not empty..
    }else {
      Object.values(cartItems).map((item) =>{


        to_send.push([{
          name : item.itemName,
          price : item.price,
          quantity : item.numInCart
        }])


      // if any of the basket items have quantity over 5, should_post becomes false.
        if(item.numInCart > 5){
          alert('The selected quatity of product ' + item.itemName + " is out of stock.");
          should_post = false;
          // console.log(should_post);
          return;
        }
      })

      //If basket is not empty and no item is over 5 quantity.
      if(should_post){

        alert('Payment..');
        //add total cost to the array that will be sent via ajax
        to_send.push([{
          totalCost: localStorage.getItem('totalCost')
        }])

        // POSTing to my-json-servers for a sample response
        $.ajax("https://my-json-server.typicode.com/typicode/demo/posts", {
          dataType: "json",
          data:{
            products: to_send,
          },
          type: "POST",
          success: function(data, status){
            console.log(status);
            // console.log(data);
          }
        })
      }
    }
  })
}

//Function that adds an item to the cart and toggles the remove from cart button.
function addToCart(){
  let carts = document.querySelectorAll('.addtocart');

  for(let i =0; i< carts.length; i++){
    carts[i].addEventListener('click', ()=>{
      // console.log("added to cart");

      let target = $(".remove.cart"+i);
      target.show();

      totalCost(items[i]);
      cartNumbers(items[i]);

    })
  }
}

//Function called when an item is being removed from the cart.
function removeFromCart(){
  let removecart = document.querySelectorAll('.remove');

  for(let i=0; i<removecart.length; i++){
    removecart[i].addEventListener('click', ()=>{
      // console.log("removed from cart: " + items[i].itemName);

      let cartItems = localStorage.getItem('cartProducts');
      cartItems = JSON.parse(cartItems);
      // console.log(cartItems);

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

          //decrease quantity with 1
          cartItems[items[i].itemName].numInCart -= 1;


          //set new local storage
          localStorage.setItem("cartProducts", JSON.stringify(cartItems));

          //set new total total
          // console.log("previous totalcost: "+ totalcost);
          localStorage.setItem("totalCost", totalcost - items[i].price)

          //set new number of items in cart
          localStorage.setItem('cartNumbers', productNumb - 1);
          document.querySelector('.cart span').textContent = productNumb - 1;

          // console.log("new totalcost: " + parseInt(localStorage.getItem('totalCost')));

        // If quantity is 1, remove item from cart.
        }else {
          //hide the remove from cart button
          var target = $(".remove.cart"+i);
          target.hide();


          // console.log(cartItems[items[i].itemName].numInCart);

          //0 of this item are in the cart after removing
          cartItems[items[i].itemName].numInCart = 0;
          items[i].numInCart = 0;

          //delete whole item entry
          delete cartItems[items[i].itemName];

          //update cart items in local storage
          localStorage.setItem("cartProducts", JSON.stringify(cartItems));

          //set new total total
          localStorage.setItem("totalCost", totalcost - items[i].price)

          //set new number of items in cart
          localStorage.setItem('cartNumbers', productNumb - 1);
          document.querySelector('.cart span').textContent = productNumb - 1;

        }
        //update cart
        getCart();
      }
    });
  }
}

//Function that loads cart numbers from local storage.
function loadCartNumbs(){
  let productNumb = localStorage.getItem('cartNumbers');

  document.querySelector('.cart span').textContent = productNumb;
}



//function that updates the cart quantity
function cartNumbers(item){

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

// Function that updates the products in the cart when adding a new product.
function setCartItems(item){
  let cartItems = localStorage.getItem('cartProducts');
  cartItems = JSON.parse(cartItems);

//If no items in cart, set cartItems as the product just added.
  if(cartItems == null){
    item.numInCart = 1;
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

//set new products in cart.
  localStorage.setItem("cartProducts", JSON.stringify(cartItems));

  //update cart
  getCart();
}

//function to update total cost
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

//Function to get and display the current basket/cart.
function getCart(){
  let items = localStorage.getItem("cartProducts");
  items = JSON.parse(items);

  let container = document.querySelector(".products");

  // let baskettotal = document.querySelector(".basket-total");

  let totalCartCost = localStorage.getItem('totalCost');
  totalCartCost = JSON.parse(totalCartCost);
  displayCheckout();
  // run only if items and .cart-container is running.
  if (items && container) {
    container.innerHTML = '';

    // check the values of the cart items
    Object.values(items).map((item) => {
      //display each basket item.
      container.innerHTML += `
      <div class=productItem>
        <div class="item-title">
          <div>${item.itemName}</div>
          <img src="${item.imgurl}" style="width:60px; height:60px;">
        </div>
        <div class="item-price">$${item.price},00</div>
        <div class="item-quantity">${item.numInCart}</div>
        <div class="item-total">$${item.price * item.numInCart},00</div>
      </div>
      `
    });
  }
}

//function for animated text looping from right to left.
function loopText(){
  $(document).ready(function(){
    function loop(){
      $('#text-loop').css({right:0});
      $('#text-loop').animate({
        right: screen.width,
      }, 10000, 'linear', function(){
        loop();
      });
    }
    loop();

  })
}

//function that displays the checkout quantity and amount
function displayCheckout(){

  let productNumb = localStorage.getItem('cartNumbers');
  let totalCartCost = localStorage.getItem('totalCost');

  $('.basket-total-cost').html("Basket Total ("+ productNumb +" items): $"+totalCartCost + ",00");

}


// run when page loads.
// checkRemove();
addToCart();
toggleBasket();
commence_payment();
loopText();
displayCheckout();
getCart()
removeFromCart();
loadCartNumbs();
