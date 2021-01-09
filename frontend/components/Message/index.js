import { Alert } from "reactstrap";

function Message({ className, color, children }) {
  return (
    <Alert color={color} className={className}>
      {children}
    </Alert>
  );
}

Message.defaultProps = {
  color: "info",
};

export default Message;
