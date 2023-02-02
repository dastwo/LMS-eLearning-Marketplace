import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routers/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="text-center">
        User dashboard
      </h1>
    </UserRoute>
  );
};

export default UserIndex;
