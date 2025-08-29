

const Message = ({message}) => {
  return (
<section className={`flex mb-4 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
<div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'me' ? 'bg-purple-500 text-white rounded-tr-none' : 'bg-gray-200 dark:bg-gray-700 rounded-tl-none'}`}>
    <p>{message.text}</p>
    <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'} text-right`}></p>
    {message.time}
</div>
</section>
  )
}

export default Message