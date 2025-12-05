import {LoaderCircleIcon} from "lucide-react";

const NetworkLoading = () => {
  return (
    <div className="flex justify-center items-center gap-2 bg-brand text-white rounded-md p-4">
      <LoaderCircleIcon className="animate-spin" />
      <div>Loading...</div>
    </div>
  )
}

export default NetworkLoading