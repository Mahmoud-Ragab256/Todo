import { useState, type ChangeEvent } from "react";
import ErrorHandler from "../components/errors/ErrorHandler";
import Paginator from "../components/Paginator";
import TodoList from "../components/ui/TodoList";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Chance from 'chance'
import api from "../config/axios.config";
import Button from "../components/ui/Button";
import { ChevronDownIcon } from "@heroicons/react/24/solid";




function AllTodos() {

  const queryClient = useQueryClient()
  const chance = Chance()

  const storageKey = "userData"
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;



  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [sortBy, setsortBy] = useState<string>('ASC')



  const { isLoading, isFetching, data, error } = useAuthenticatedQuery(
    [`todos-page-${page}`, `${pageSize}`, `${sortBy}`],
    `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
    {
      headers: {
        Authorization: `Bearer ${userData.jwt}`
      }
    })



  const { mutate: generateTodos, isPending: isGenerating } = useMutation({
    mutationFn: async () => {
      const promises = [];

      for (let i = 0; i < 100; i++) {
        const request = api.post(
          `/todos`,
          {
            data: {
              title: chance.sentence({ words: 5 }),
              description: chance.paragraph({ sentences: 2 }),
            },
          },
          {
            headers: { Authorization: `Bearer ${userData.jwt}` },
          }
        );
        promises.push(request);
      }

      return await Promise.all(promises);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setsortBy(e.target.value)
  }

  const onPSChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value)
  }



  // console.log(data)


  if (isLoading || isGenerating) return (
    <div role="status" className="max-w-sm animate-pulse mx-auto">
      <div className="h-2.5 bg-gray-100 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-100  rounded-full max-w-\[360px\] mb-2.5"></div>
      <div className="h-2 bg-gray-100  rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-100  rounded-full max-w-\[330px\] mb-2.5"></div>
      <div className="h-2 bg-gray-100  rounded-full max-w-\[300px\] mb-2.5"></div>
      <div className="h-2 bg-gray-100  rounded-full max-w-\[360px\]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )

  if (error || !data) return <ErrorHandler />




  return (
    <>
      <div className="w-100 md:w-150 lg:w-200 mx-auto">
        <div className="flex items-center justify-between my-8">
          <Button className="btn btn-sm" onClick={() => generateTodos()}>Generate todos (100)</Button>
          <div>
            <div className="flex gap-3">
              <div className="relative inline-block w-25">
                <select className="w-full appearance-none rounded-lg border border-indigo-600 bg-white py-2 px-3 text-sm text-gray-800 outline-none focus:border-indigo-700"
                  value={sortBy}
                  onChange={onSortChange}
                >
                  <option disabled>Sort By</option>
                  <option value='ASC'>Oldest</option>
                  <option value='Desc'>Latest</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-gray-800" />
              </div>

              <div className="relative inline-block w-18">
                <select className="w-full appearance-none rounded-lg border border-indigo-600 bg-white py-2 px-3 text-sm text-gray-800 outline-none focus:border-indigo-700"
                  value={pageSize}
                  onChange={onPSChange}
                >
                  <option disabled>Page Size</option>
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-gray-800" />
              </div>
            </div>
          </div>
        </div>
        <TodoList todos={data.data} jwt={userData.jwt} />
        <Paginator page={page} setPage={setPage} pageCount={data.meta.pagination.pageCount} isLoading={isLoading || isFetching} />
      </div>
    </>
  )
}

export default AllTodos