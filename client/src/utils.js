export const reduce = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].selectedQuantity;
    }        
    return total.toFixed(2);
};