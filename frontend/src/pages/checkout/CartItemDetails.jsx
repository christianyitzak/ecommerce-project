import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    const updateCartQuantity = async () => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity,
        });

        setIsUpdating(false);
    };

    return (
        <>
            <img className='product-image' src={cartItem.product.image} />
            <div className='cart-item-details'>
                <div className='product-name'>{cartItem.product.name}</div>
                <div className='product-price'>{formatMoney(cartItem.product.priceCents)}</div>
                <div className='product-quantity'>
                    <span>
                        Quantity:
                        {isUpdating && (
                            <input
                                type='text'
                                style={{ width: "50px" }}
                                value={quantity}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        updateCartQuantity();
                                    }
                                }}
                                onChange={(event) => {
                                    setQuantity(Number(event.target.value));
                                }}
                            />
                        )}
                        {!isUpdating && <span className='quantity-label'>{quantity}</span>}
                    </span>
                    <span
                        className='update-quantity-link link-primary'
                        onClick={() => {
                            setIsUpdating(true);

                            if (isUpdating) {
                                updateCartQuantity();
                            }
                        }}
                    >
                        Update
                    </span>
                    <span className='delete-quantity-link link-primary' onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}
