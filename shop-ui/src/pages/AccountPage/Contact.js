import React, { useEffect, useState } from 'react'
import "./Contact.css";
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethod';

const Contact = () => {
    const user = useSelector(state => state.user.currentUser);
    const [message,setMessage]=useState(false);
    const [formData, setFormData] = useState({
        userId:user._id,
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userRequest.post('contact/contacts', formData);
            // alert('Form data successfully submitted:', response.data);
            setMessage(true);
            // Optionally, you can reset the form here
            setFormData({
                userId:user._id,
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setTimeout(() => {
                setMessage(false);
            }, 5000);

        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div className="contact-container">
            <div className="left-section">
                <h2>Get In Touch</h2>
                {message && <p style={{color:"green",fontWeight:700}}>Your request has been submitted successfully. We'll get back to you soon.</p>}
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="right-section">
            <h2>Contact Us</h2>
                <div className="location">
                    <h3>Our Location</h3>
                    <p>123 Main Street</p>
                    <p>Cityville, State</p>
                </div>
                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <p>Email:geetangalireadymade@gmail.com </p>
                    <p>Phone: +91 6202384284</p>
                </div>
            </div>
        </div>
    );
}

export default Contact;
