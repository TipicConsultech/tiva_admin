// SendResetLink.js
import React, { useState } from "react";
import { post } from "../../../util/api";
import { useNavigate } from "react-router-dom";

function SendResetLink() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendLink = async () => {
    if (!email) {
      setMessage("Email is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await post("/api/reset-password-link", { email });
      setMessage( "Password Reset link sent successfully.");
      //Navigate to login page
      setTimeout(() => {
        navigate("/login");
      }, 5000);

    } catch (error) {
      setMessage(
        error.response?.message || "User is not found. Contact admin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          padding: "20px 30px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "1.5rem", color: "#333" }}>
          Send Reset Password Link
        </h2>
        <input
          type="email"
          style={{
            width: "100%",
            padding: "10px 15px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          style={{
            background: loading ? "#ccc" : "#6a11cb",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.3s ease",
            width: "100%",
          }}
          disabled={loading}
          onClick={handleSendLink}
        >
          {loading ? "Sending..." : "Send Link"}
        </button>
        {message && (
          <p
            style={{
              marginTop: "15px",
              fontSize: "0.9rem",
              color: message.includes("successfully") ? "#28a745" : "#dc3545",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default SendResetLink;
