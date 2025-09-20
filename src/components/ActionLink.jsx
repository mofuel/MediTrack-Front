import { Link } from "react-router-dom";

// Recibe texto, href y cualquier otra prop adicional
function ActionLink({ text, href, ...props }) {
  return (
    <Link to={href} className="text-decoration-none" {...props}>
      {text}
    </Link>
  );
}


export default ActionLink;
