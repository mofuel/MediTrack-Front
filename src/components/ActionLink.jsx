import { Link } from "react-router-dom";

function ActionLink({ text, href, ...props }) {
  return (
    <Link to={href} className="text-decoration-none" {...props}>
      {text}
    </Link>
  );
}


export default ActionLink;
