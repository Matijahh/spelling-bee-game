import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export function Message({ text, setMessage }) {
  return (
    <div className="message-component">
      <p>{text}</p>
      <button onClick={() => setMessage(null)}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  );
}
