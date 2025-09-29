import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
    const [order, setOrder] = useState(null);
    const { orderId, productId } = useParams();

    useEffect(() => {
        const fetchOrderData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        };

        fetchOrderData();
    }, [orderId]);

    if (!order) {
        return null;
    }

    const orderItem = order.products.find((orderItem) => {
        return orderItem.productId === productId;
    });

    const totalDeliveryTimeMs = orderItem.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return (
        <>
            <link rel='icon' href='tracking-favicon.png' />
            <title>Tracking</title>

            <Header cart={cart} />

            <div className='tracking-page'>
                <div className='order-tracking'>
                    <Link className='back-to-orders-link link-primary' to='/orders'>
                        View all orders
                    </Link>

                    <div className='delivery-date'>
                        {`${deliveryPercent >= 100 ? "Delivered On" : "Arriving On"} ${dayjs(
                            orderItem.estimatedDeliveryTimeMs
                        ).format("dddd, MMMM D")}`}
                    </div>

                    <div className='product-info'>{orderItem.product.name}</div>

                    <div className='product-info'>Quantity: {orderItem.quantity}</div>

                    <img className='product-image' src={orderItem.product.image} />

                    <div className='progress-labels-container'>
                        <div className={`progress-label ${isPreparing && "current-status"}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && "current-status"}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && "current-status"}`}>
                            Delivered
                        </div>
                    </div>

                    <div className='progress-bar-container'>
                        <div
                            className='progress-bar'
                            style={{ width: `${deliveryPercent}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
}
