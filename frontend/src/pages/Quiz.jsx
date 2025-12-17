import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../socket";
import { useParams } from "react-router-dom";

export default function Quiz() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [error, setError] = useState("");
  const [quizEnded, setQuizEnded] = useState(false);
  const [finalResults, setFinalResults] = useState(null);

  useEffect(() => {
    // Load all questions
    axios.get("http://localhost:5005/api/quiz/questions")
      .then(r => setQuestions(r.data))
      .catch(err => setError("Failed to load questions"));

    // Listen for admin moving to next question
    socket.on("quiz:update", data => {
      setIndex(data.currentQuestion);
      setAnswered(false); // reset when admin moves question
    });

    // Listen for quiz end
    socket.on("quiz:end", data => {
      setQuizEnded(true);
      setFinalResults(data); // { users, winner }
    });

    return () => {
      socket.off("quiz:update");
      socket.off("quiz:end");
    };
  }, []);

  const answer = async (i) => {
    if (answered || quizEnded) return;

    try {
      await axios.post(`http://localhost:5005/api/users/answer/${id}`, {
        answer: i,
        correct: i === questions[index].correctIndex
      });

      alert(`Answer recorded: ${questions[index].options[i]}`);
      setAnswered(true);

      // Auto-move to next question after short delay (if not last question)
      if (index + 1 < questions.length) {
        setTimeout(() => {
          setIndex(prev => prev + 1);
          setAnswered(false);
        }, 500); // 0.5s delay
      }

    } catch (err) {
      console.error("Answer submission error:", err.response || err);
      setError("Failed to submit answer");
    }
  };

  if (!questions.length) return <p>Waiting for quiz…</p>;

  // Show final results if quiz ended
  if (quizEnded && finalResults) {
    return (
      <div className="card">
        <h2>Quiz Ended!</h2>
        <h3>Winner: {finalResults.winner.name} 🏆</h3>
        <h3>Scores:</h3>
        <ul>
          {finalResults.users.map(u => (
            <li key={u._id}>{u.name} — {u.score}</li>
          ))}
        </ul>
      </div>
    );
  }

  // Normal quiz view
  const q = questions[index];

  return (
    <div className="card">
      <h3>Question {index + 1} of {questions.length}</h3>
      <h2>{q.text}</h2>

      {q.options.map((o,i) => (
        <button
          key={i}
          onClick={() => answer(i)}
          disabled={answered} // only disable while processing
          style={{ margin: "5px", padding: "10px" }}
        >
          {o}
        </button>
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
