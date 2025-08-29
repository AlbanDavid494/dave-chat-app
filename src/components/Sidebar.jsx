import { useState, useEffect } from "react"
import { useTheme } from '../contexts/ThemeContext'
import { auth } from "../../firebase_config"
import { logout } from "../auth"
import { fetchConversations, sendTextMessage, addFriendZIM } from "../services/zimServices"
import { FaCommentDots } from "react-icons/fa"
import ThemeToggle from "./ThemeToggle"
import { FiLogOut } from "react-icons/fi"


const Sidebar = ({onSelectChat}) => {
    const {theme} = useTheme()
    const [chats, setChats] = useState([])
    const [isShowAddFriendsDialog, setIsSetShowAddFriendsDialog] = useState(false)
    const [friendID, setFriendID] = useState('')
    const [userUID, setUserUID] = useState('')

    useEffect(() => {
        const fetchChat = async () => {
            try{
                const result = await fetchConversations();
                console.log(result)
                setChats(result)
            } catch (err){
                console.error('Failed to load conversation:', err)
            }
        };
        fetchChat()
    },[])

    useEffect(() => {
        if(auth.currentUser.uid){
            setUserUID(auth.currentUser.uid)
        }
    },[])

    const handleLogout = () => {
        logout();
        window.location.href = '/login'
        };

        const handleAddFriend = async () => {
            try {
                const config = {
                    wording: 'Hello 🖐',
                    friendAlias: '',
                    friendAttributes: {}
                }
                const res = await addFriendZIM(friendID, config)
                console.log('Friend added:', res.friendInfo);
                await sendTextMessage(friendID, 0, 'Hello 🖐')

                setIsSetShowAddFriendsDialog(false);
                setFriendID('')

                const updated = await fetchConversations()
                setChats(updated)

                const newconv = updated.find(conv => conv.conversationID === friendID)
                    if(newconv){
                        onSelectChat(newconv)
                    } else{
                        console.warn('Conversation not found yet! It may appear after first message')
                    }
            } catch (err) {
                console.error('Error adding friend:', err)
                alert('Failed to add friend. Please check the ID.')
            }
        }

  return (
    <section className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
            <FaCommentDots className="w-7 h-7 text-purple-500 mr-2" />
            <h1 className="text-xl font-bold" >Message</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="p-3">
        <button onClick={() => setIsSetShowAddFriendsDialog(true)} className="w-full flex items-center justify-center gap-2 p-2 text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-lg transition-colors" >
            <span className="font-medium">+ Add New Friend</span>
        </button>
      </div>

      {isShowAddFriendsDialog && (
        <div className="fixed inset-0 bg-opacity-50 bg-black flex items-center justify-center z-[9999]">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-center">Add New Friend</h2>
            <input type="text" placeholder="Enter User ID" value={friendID} onChange={(e) => setFriendID(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4 dark:bg-gray-700 dark:text-white" />
            <div className="flex justify-end gap-2">
                <button onClick={() => setIsSetShowAddFriendsDialog(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded hover:bg-gray-400">cancel</button>
                <button onClick={handleAddFriend} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Add</button>
            </div>
          </div>
        </div>
      )}

<div className="flex-1 overflow-y-auto">
    {
        chats?.map((conversation) => {
          const lastMessage = conversation.lastMessage?.message || 'No messages yet'
          const timestamp = new Date(conversation.lastMessage?.timestamp || Date.now())
          const timeString = timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
          const avatar = conversation.conversationName?.charAt(0) || 'U'
          const unreadCount = conversation.unreadMessageCount || 0

          return (
            <div key={conversation.conversationID} onClick={() => onSelectChat(conversation)} className={`p-3 border-b border-gray-200 dark:border-gray-800 flex items-center hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-colors ${unreadCount > 0 ? 'bg-purple-100 dark:bg-purple-900/20' : ''}`} >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">{avatar}</div>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">{unreadCount}</span>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                    <h3 className="font-medium">{conversation.conversationName || 'unknown'}</h3>
                    <span className="text-xs text-gray-500">{timeString}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{lastMessage}</p>
              </div>
            </div>
          )

        })
    }
</div>

<div>
    <div className="p-4 border-gray-200 dark:border-gray-700 mt-auto">
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-2 text-gray-900 bg-red-200 hover:bg-red-500 dark:bg-purple-300 dark:hover:bg-red-400 rounded-lg"><FiLogOut className="w-5 h-5 text-center" />Logout</button>
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
            Your UID: {userUID}
        </div>
    </div>
</div>

    </section>
  )
}

export default Sidebar