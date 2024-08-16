import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { conversation } = useGetConversations();
  const { selectedConversation, setSelectedConversation } = useConversation();

  const handleSearch = (e) => {
    e.preventDefault();
    const filterd = conversation.filter((con) =>
      con.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("filtered", filterd);
    if (filterd.length > 0) {
      setSelectedConversation(filterd[0]);
    } else {
      toast.success("Search Not Found");
    }
    console.log("filtered array", filterd);

    try {
    } catch (error) {
      console.log("error from search query", error);
    }
  };
  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search…"
        className="input input-bordered bg-white shadow text-black "
      />
      <button
        type="submit"
        className="px-2 py-2 rounded-full bg-sky-500 text-white"
      >
        <IoSearchSharp className="w-6 h-6  border-none " />
      </button>
    </form>
  );
};
export default SearchInput;
