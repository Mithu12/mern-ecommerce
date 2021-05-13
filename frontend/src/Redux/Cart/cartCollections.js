
const CartCollections = (item) => {
    return {
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        stock: item.stock
    }
};

export default CartCollections;