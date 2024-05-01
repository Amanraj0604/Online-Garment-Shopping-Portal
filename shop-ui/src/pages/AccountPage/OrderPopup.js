import React from 'react';
import "./Orders.css";

const OrderPopup = ({ order, onClose, onCancel }) => {
    const handleCancel = () => {
        onCancel(order._id);
    };

    return (
        <div className="order-popup">
            <div className="popup-content">
                <h2>Order Details</h2>
                <div className="order-details">
                    {order.products.map(product => (
                        <div key={product.id} className="product-details">
                            <img src={product.img} alt={product.title} />
                            <div>
                                <h3>{product.title}</h3>
                                <p>{product.desc}</p>
                                <p>Rs.{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <h3>Total: {order.amount}</h3>
                <h4>Payment Mode: {order.pay}</h4>
                <p>Expected Delivery: {order.expectedDeliveryDate}</p>
                <p>Address:{order.address.name},{order.address.phoneNo},{order.address.city},{order.address.state},{order.locality},{order.flatNo},{order.landmark},{order.addressType}</p>
             
                <button onClick={handleCancel}>Cancel Order</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};



export default OrderPopup
