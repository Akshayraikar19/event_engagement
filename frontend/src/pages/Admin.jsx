import axios from "axios";
import { socket } from "../socket";
import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [question, setQuestion] = useState(0);
  const [winner, setWinner] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch users and quiz state initially
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5005/api/users", {
          headers: { Authorization: token }
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    const fetchState = async () => {
      try {
        const res = await axios.get("http://localhost:5005/api/quiz/state");
        if (res.data) setQuestion(res.data.currentQuestion || 0);
      } catch (err) {
        console.error("Failed to fetch quiz state:", err);
      }
    };

    fetchUsers();
    fetchState();

    // Optional: live updates via polling every 2s
    const interval = setInterval(fetchUsers, 2000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  // Next Question
  const next = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5005/api/quiz/state",
        { currentQuestion: question + 1, isActive: true },
        { headers: { Authorization: token } }
      );
      setQuestion(res.data.currentQuestion);
      socket.emit("quiz:update", res.data); // notify attendees
    } catch (err) {
      console.error("Failed to move to next question:", err.response || err);
    }
  };

  // End Quiz
  const endQuiz = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5005/api/quiz/end",
        {},
        { headers: { Authorization: token } }
      );

      setUsers(res.data.users);
      setWinner(res.data.winner);

      alert(`Quiz ended. Winner: ${res.data.winner.name} with score ${res.data.winner.score}`);
      socket.emit("quiz:end", res.data); // notify attendees
    } catch (err) {
      console.error("Failed to end quiz:", err.response || err);
      alert("Failed to end quiz");
    }
  };

  return (
    <div className="card">
      <h1>Admin Panel</h1>

      <h3>Live Scores</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} — {u.score} {winner?._id === u._id && "🏆"}
          </li>
        ))}
      </ul>

      <p>Current Question: {question + 1}</p>

      <button onClick={next} style={{ marginRight: "10px" }}>
        Next Question
      </button>
      <button onClick={endQuiz} style={{ background: "#dc2626", color: "#fff" }}>
        End Quiz
      </button>
    </div>
  );
}
