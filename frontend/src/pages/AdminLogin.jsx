import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5005/api/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      // ✅ NAVIGATE AFTER LOGIN
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
