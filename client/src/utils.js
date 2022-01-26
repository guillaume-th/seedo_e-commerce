export const reduce = (cart, fidel) => {
    let total = 0;
    console.log(cart);
    for (let i = 0; i < cart.length; i++) {
        fidel ?
        total += (cart[i].price * cart[i].selectedQuantity)*0.9
        : total += cart[i].price * cart[i].selectedQuantity;
    }
    console.log(total); 
    return total.toFixed(2);
};