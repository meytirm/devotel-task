import Button from "../ui/Button.tsx";
import { RotateCcwIcon } from "lucide-react";

const NetworkError = ({ onReload }: Props) => {
  return (
    <div className="rounded-md p-4 flex flex-col gap-2 items-center">
      <div className="text-red-600">Something went wrong!</div>
      <Button
        onClick={onReload}
        className="bg-brand hover:bg-brand/80 text-white flex items-center gap-2"
      >
        <span>Reload</span>
        <RotateCcwIcon size={20} />
      </Button>
    </div>
  );
};

interface Props {
  onReload: () => void;
}

export default NetworkError;
