import QRCode from "react-qr-code";

export default function Landing() {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h1>🎉 Event Quiz</h1>
      <p>Scan to join</p>
      <QRCode value="http://localhost:5173/register" />
    </div>
  );
}
