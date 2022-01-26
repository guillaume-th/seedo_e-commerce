export const reduce = (cart, fidel) => {
    let total = 0;
    /*   if (cart[0].hasOwnProperty('quantity')) {
          for (let i = 0; i < cart.length; i++) {
              fidel ?
                  total += (cart[i].price * cart[i].quantity) * 0.9
                  : total += cart[i].price * cart[i].quantity;
          }
      } else if (cart[0].hasOwnProperty('selectedQuantity')) { */
    for (let i = 0; i < cart.length; i++) {
        total += fidel ? (cart[i].updatedPrice * cart[i].selectedQuantity) * 0.9 : cart[i].updatedPrice * cart[i].selectedQuantity;
    }
    // }
    console.log(total); 
    return total.toFixed(2);
};