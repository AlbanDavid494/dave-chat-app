import { FaSpinner } from "react-icons/fa"


const FormButton = ({loading, text, loadingText}) => (
  <button type='submit' disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-pink-400 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex justify-center"> 
{
    loading ? (
    <>
    <FaSpinner className="animate-spin mr-2 mt-1" />
    {loadingText}
    </>
    ) : 
    (
        text
    )
}
  </button>
)

export default FormButton