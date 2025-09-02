import { FiPhoneCall, FiVideo } from "react-icons/fi";
import { HiDocumentText } from "react-icons/hi";


const UserProfile = ({user}) => {
    const avatar = user.conversation?.charAt(0) || 'U';
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 lg:w-80 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
     <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-3xl font-bold mb-3">
           {avatar}
        </div>
        <h2 className="text-xl font-bold">{user.conversationName}</h2>
        <div className="flex mt-3 space-x-2">
           <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-purple-300 dark:hover:bg-purple-600"><FiPhoneCall className="w-5 h-5 text-current" /></button>
           <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-purple-300 dark:hover:bg-purple-600"><FiVideo className="w-5 h-5 text-current" /></button>
        </div>
     </div>

     <div className="mb-0">
        <h3 className="font-medium mb-2">Details</h3>
        <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Email</span>
                <span>{user.email}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Status</span>
                <span>{user.status}</span>
            </div>
        </div>
     </div>

       <div >
        <h3 className="font-medium mb-2">Shared Files</h3>
        <div className="space-y-2">
            <div className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-500 mr-3"><HiDocumentText className="w-5 h-5" /></div>
                <div className="flex-1">
                    <p className="text-sm font-medium">Project_document.pdf</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2.4MB . 2 days aago</p>
                </div>
            </div>
        </div>
       </div>

    </section>
  )
}

export default UserProfile;