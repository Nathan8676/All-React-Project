import { useParams } from "react-router-dom";

function User() {
  const { userid } = useParams();
  return (
    <div className="bg-gray-600 text-white p-2 text-center">User: {userid}</div>
  );
}

export default User;
