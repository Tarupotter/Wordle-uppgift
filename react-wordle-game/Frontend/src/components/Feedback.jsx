export default function Feedback({ feedback }) {
  return (
    <div className="feedback-row">
      {feedback.map((item, index) => (
        <div
          key={index}
          className={`feedback-box feedback-${item.result}`}
        >
          {item.letter.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
