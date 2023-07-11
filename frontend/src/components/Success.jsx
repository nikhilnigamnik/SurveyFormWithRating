import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="font-semibold">Thank you for your feedback...</h1>;
      {setTimeout(() => {
        navigate("/");
      }, 5000)}
    </div>
  );
};

export default Success;
