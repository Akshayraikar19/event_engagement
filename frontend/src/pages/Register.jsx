import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    const res = await axios.post(
      "http://localhost:5005/api/users/register",
      form
    );
    navigate(`/quiz/${res.data._id}`);
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Company (optional)" onChange={e=>setForm({...form,company:e.target.value})}/>
      <button onClick={submit}>Start Quiz</button>
    </div>
  );
}
