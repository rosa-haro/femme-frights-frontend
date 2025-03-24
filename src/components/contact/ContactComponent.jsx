import React, { useState } from "react";
import "../user/user-form/UserFormComponent.css"
import { send } from "@emailjs/browser";

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ name: "", email: "", title: "", message: "" });
    } catch (error) {
      console.error("Email sending error:", error);
      setStatus("error");
    }
  };
  
  return (
    <div className="contact-form">
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Your message:</label>
          <input
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="success">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="error">Oops! Something went wrong. Try again.</p>
        )}
      </form>
    </div>
  );
};

export default ContactComponent;
