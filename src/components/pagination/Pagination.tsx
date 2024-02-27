import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Props {
  itemsPerPage: number;
  totalItems: number;
  paginate: (number: number, value?: string) => void;
  next: number;
  previous: number
}
const Pagination = ({ itemsPerPage, totalItems, paginate, next, previous }: Props) => {
  const pageNumbers = [];
  const page = useSelector((state: RootState) => state.products.numberPage)
  const message = useSelector((state: RootState) => state.products.message)
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastValue = pageNumbers[pageNumbers.length - 1]
  return (
    <nav role="navigation" aria-label="pagination" className="mx-auto flex w-full justify-center">
      <ul className="flex flex-row items-center gap-1">
        <div>
          <li >
            <button

              className="inline-flex items-center whitespace-nowrap shrink-0 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 h-8 px-3 py-2 gap-1 pl-2.5"
              aria-label="Go to previous page"
              rel="ugc"
              onClick={() => paginate(previous, 'previous')}
              disabled={message ? true : page === 1 ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              <span>Previous</span>
            </button>
          </li>
        </div>
        {!message &&
          <>
            {pageNumbers.map(number => (
              <li key={number} className="page-item">
                <button onClick={() => paginate(number)} className={`${number === page ? 'bg-gray-100 text-gray-900 h-9 w-9' : ''} inline-flex items-center whitespace-nowrap shrink-0 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 h-9 w-9`}>
                  {number}
                </button>
              </li>
            ))}
          </>
        }

        <div >
          <li >
            <button
              className="inline-flex items-center whitespace-nowrap shrink-0 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 h-8 px-3 py-2 gap-1 pr-2.5"
              aria-label="Go to next page"
              onClick={() => paginate(next, 'next')}
              disabled={message ? true : page === lastValue ? true : false}
            >
              <span>Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </li>
        </div>

      </ul>
    </nav>
  )
}

export default Pagination