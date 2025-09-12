import { Link } from "react-router-dom";

function ActionLink({ text, href }) {
  return (
    <Link to={href} className="text-decoration-none">
      {text}
    </Link>
  );
}

export default ActionLink;
