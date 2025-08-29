import { useState, useRef, useEffect } from "react"
import Message from './Message'
import { FaPaperPlane } from "react-icons/fa"


const ChatContainer = ({ activeChat, messages, onSendMessage }) => {

const [newMessage,setNewMessage] = useState('')
const messagesEndRef = useRef(null)

const handleSend = (e) => {
  e.preventDefault();
  if(newMessage.trim() === '') return;
    onSendMessage(newMessage)
    setNewMessage('')
}

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({behavior: 'smooth'} )
}, [messages])

const avatar = activeChat.conversationName?.charAt(0) || 'U';

  return (
    <section className="flex flex-1 flex-col">
     <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-3">
        {avatar}
      </div>
<div>
  <h2 className="font-bold">{activeChat.conversationName}</h2>
</div>
     </div>

     <div className="flex-1 overflow-y-auto p-4 bg-purple-100 dark:bg-purple-950/50">
     {messages.length === 0 ? (<div className="flex items-center justify-center h-full">
      <p className="text-gray-500 dark:text-gray-400">No messages yet. Start the conversation</p>
     </div>) : (messages.map((message) => (<Message key={message.id} message={message}/>))
    )}
    <div ref={messagesEndRef} />
    </div>

    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
<form onSubmit={handleSend} className="flex items-center">
  <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" className="flex-1 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" />
  <button type="submit" className="ml-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors p-3">
    <FaPaperPlane className="w-5 h-5" />
  </button>
</form>
    </div>
    </section>
  )
}

export default ChatContainer