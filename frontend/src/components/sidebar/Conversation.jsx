import useConversation from "../../zustand/useConversation";

const Conversation = ({ con, index }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  console.log("selction converstion", selectedConversation);
  const isSelected = selectedConversation?._id === con._id;
  console.log(isSelected);
  return (
    <>
      <div
        onClick={() => setSelectedConversation(con)}
        className={`flex gap-2 items-center  hover:bg-sky-500 ${
          isSelected ? "bg-sky-500" : ""
        } rounded p-2 py-1 cursor-pointer`}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{con.fullName}</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>

      {!index && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
