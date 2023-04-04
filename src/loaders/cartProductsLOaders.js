import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json()

// if cart data  is in database, you have to use async awwait
    const savedCart = [];
    const storedCart = getShoppingCart()
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd.id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }


// if you need to send two things (array vabe pathate hobe)
    // [products,savedProducts]----- example
    //  another options
    


    
    return savedCart;
}


export default cartProductsLoader