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
          className="w-10 h-10 text-white p-1 flex justify-center items-center  bg-cyan-500  rounded-full  cursor-pointer"
        />
      )}
      {/*  */}
    </div>
  );
};
export default LogoutButton;
