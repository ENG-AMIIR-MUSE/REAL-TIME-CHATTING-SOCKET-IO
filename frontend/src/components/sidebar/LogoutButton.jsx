import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { logout, loading } = useLogout();
  return (
    <div aria-disabled={loading} className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <BiLogOut
          aria-disabled={loading}
          onClick={() => logout()}
          className="w-6 h-6 text-white cursor-pointer"
        />
      )}
      {/*  */}
    </div>
  );
};
export default LogoutButton;
