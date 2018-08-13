'use strict';
// shows more errors in the console
let cart = [];
// cart array to store products
const cartDom = document.querySelector('.cart');
// selects cart class
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');
// selects all the add to cart buttons

// addToCartButtonsDOM.forEach(function (addToCartButtonDOM) {
addToCartButtonsDOM.forEach(addToCartButtonDOM => {
  addToCartButtonDOM.addEventListener('click', () => {
    // takes 2 arguements, first the event and then the callback function
    const productDOM = addToCartButtonDOM.parentNode;
    // accesses the product element
    const product = {
      name: productDOM.querySelector('.product__name').innerText,
      // innerText gets name from HTML
      price: productDOM.querySelector('.product__price').innerText
    }
    // creates product object
    // console.table(product);

    const isInCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);
      // filter creates array of products already in cart
      // if (isInCart === false) {
      if (!isInCart) {
        // only adds products that are not in the cart
        cartDom.insertAdjacentHTML('beforeend', `
        <div class="cart__item">
          <h3 class="class__item__name">${product.name}</h3>
          <h3 class="class__item__price">${product.price}</h3>
          </div>
        `);
        // beforeend adds to the top of the cart
        // backticks create a template string
        // adds products to cart HTML
        cart.push(product);
        // pushes products to cart array
        addToCartButtonDOM.innerText = 'In Cart';
        // changes add to cart text to in cart
        // console.log(cart);
      }
  });
});
