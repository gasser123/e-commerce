import { Alert } from "react-bootstrap";

interface Props {
  variant?: string;
  children: React.ReactNode;
}
const Message: React.FC<Props> = ({ variant, children }) => {
  return <Alert variant={variant ? variant : "info"}>{children}</Alert>;
};

export default Message;
