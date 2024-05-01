import React, { useEffect, useState } from 'react';
import "../AccountPage/Orders.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethod';
import OrderPopup from './OrderPopup';

const Orders = () => {
    const user = useSelector(state => state.user.currentUser);
    const [orderData, setOrderData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await userRequest.get(`order/find/${user._id}`);
                setOrderData(res.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, [user._id]);

    const openPopup = (order) => {
        setSelectedOrder(order);
    };

    const closePopup = () => {
        setSelectedOrder(null);
    };

    const cancelOrder = async (orderId) => {
        try {
            await userRequest.put(`order/cancel/${orderId}`);
            // Optionally, you may want to refresh the order data after cancellation
            const updatedOrders = orderData.filter(order => order._id !== orderId);
            setOrderData(updatedOrders);
            alert("Your order has been canceled");
            closePopup(); 
        } catch (error) {
            console.error("Error canceling order:", error);
        }
    };

    return (
        <div className="orders-container">
            <h2>Order History</h2>
            {orderData.map(order => (
                <div key={order._id} className="order-item">
                    <h4>Order ID: {order._id}</h4>
                    <div className="singleproduct">
                        {order.products.map(product => (
                            <div key={product.id} className="product-details">
                                <img src={product.img} alt={product.title} />
                                <div>
                                    <h3>{product.title}</h3>
                                    <p>{product.desc}</p>
                                    <p>Size:{product.size} ,Qty: {product.quantity}</p>
                                    {/* <p></p> */}
                                    <p>Rs.{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <h3>Order Status: {order.status}</h3> */}
                    <h3>Total: {order.amount}</h3>
                    <h4>Payment Mode: {order.pay}</h4>
                    <p>Expected Delivery: {order.expectedDeliveryDate}</p>
                    {order.status !== "Cancelled" ? (
                        <Link to="#" onClick={() => openPopup(order)}><button>View Details</button></Link>
                    ) : (
                        <p style={{color:"red", fontWeight:700}}>Order canceled.</p>
                    )}
                </div>
            ))}
            {selectedOrder && (
                <OrderPopup
                    order={selectedOrder}
                    onClose={closePopup}
                    onCancel={() => cancelOrder(selectedOrder._id)}
                />
            )}
        </div>
    );
}

export default Orders;
