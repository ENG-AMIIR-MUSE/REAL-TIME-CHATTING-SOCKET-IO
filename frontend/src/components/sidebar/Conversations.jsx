import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utiliy/emoj";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversation } = useGetConversations();
  // console.log("all converstation", conversation);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversation?.map((con, index) => (
        <Conversation
          key={con._id}
          emoji={getRandomEmoji()}
          index={index === conversation.length - 1}
          con={con}
        />
      ))}
    </div>
  );
};
export default Conversations;
