import Button from "./ui/Button"
import { ArrowLongLeftIcon as ArrowLongLeft, ArrowLongRightIcon as ArrowLongRightIcon } from '@heroicons/react/24/solid';

interface IProps {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
  isLoading?: boolean;
}

function Paginator({ pageCount, page, setPage, isLoading }: IProps) {
  return (
    <div className="flex items-center justify-center gap-1 m-8">
      <span>Page {page} of {pageCount}</span>
      <Button className="btn-sm flex items-center gap-1 font-medium bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-sm"
        disabled={page === 1 || isLoading}
        onClick={() => setPage(page - 1)}
      >
        <ArrowLongLeft className="w-5 h-5" />
        Prev
      </Button>
      <Button className="btn-sm flex items-center gap-1 font-medium bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-sm"
        disabled={page === pageCount || isLoading}
        onClick={() => setPage(page + 1)}
      >
        Next
        <ArrowLongRightIcon className="w-5 h-5" />
      </Button>
    </div>
  )
}

export default Paginator