'use strict';

function counter() {
  let seconds = 0;
  setInterval(() => {
    seconds += 1;
    document.getElementById('app').innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}

counter();


// List of items
var items = [
  {
    itemName: 'itemOne',
    description: 'Description item One',
    price: 10,
    numInCart: 0,
  },
  {
    itemName: 'itemTwo',
    description: 'Description item Two',
    price: 15,
    numInCart: 0,
  },
  {
    itemName: 'itemThree',
    description: 'Description item Three',
    price: 20,
    numInCart: 0,
  },
  {
    itemName: 'itemFour',
    description: 'Description item Four',
    price: 25,
    numInCart: 0,
  },
  {
    itemName: 'itemFive',
    description: 'Description item Five',
    price: 30,
    numInCart: 0,
  }
]



items.forEach((item, i) => {
  $(".shoppinglist").append(
    `
    <div>
    <p>${item.itemName}</p>
    <p>${item.description}</p>
    <p>${item.price}</p>

    <a class="addtocart cart${i}" href=#> add to cart
    </a>

    </div>
    `
  );
});



let carts = document.querySelectorAll('.addtocart');

for(let i =0; i< carts.length; i++){
  carts[i].addEventListener('click', ()=>{
    console.log("added to cart");
    cartNumbers(items[i]);
    totalCost(items[i]);
  })
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
}

function totalCost(item){
  let totalCartCost = localStorage.getItem('totalCost');

// If an item is already selected add its price to total cost, else save the first added item's price as the total cost.
  if(totalCartCost != null){
    totalCartCost = parseInt(totalCartCost);

    localStorage.setItem("totalCost", totalCartCost + item.price)

  }else {
    localStorage.setItem("totalCost", item.price)
  }
}


loadCartNumbs();
console.log(items);
