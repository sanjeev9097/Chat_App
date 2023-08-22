import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellanious/SideDrawer";
import MyChats from "../components/Mychats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

const ChatPages = () => { 
    const { user } = ChatState();
    const [ fetchAgain, setFetchAgain ] = useState(false);

  return (
    <div style={{width: "100%" }}>
      { user && <SideDrawer/> }
      <Box display="flex" justifyContent= "space-between" w= "100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />} 
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>} 
      </Box>

    </div>
  )
}

export default ChatPages