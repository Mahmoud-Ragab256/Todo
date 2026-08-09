import TodoList from "../components/ui/TodoList";
import ErrorHandler from "../components/errors/ErrorHandler";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTodoSchema } from "../validation";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import TextArea from "../components/ui/TextArea";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios.config";
import Chance from 'chance'



function Home() {

  const modalInputs = {
    label: "title",
    name: "title",
    id: "title",
    placeholder: "title",
    type: "text",
  }

  const queryClient = useQueryClient()
  const chance = Chance()


  const storageKey = "userData"
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;



  const [isAddOpen, setIsAddOpen] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ title: string, description: string }>({
    resolver: yupResolver(addTodoSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })





  function openAddModal() {
    setIsAddOpen(true)
  }

  function closeAddModal() {
    setIsAddOpen(false)
  }


  const { mutate: addTodo } = useMutation({
    mutationFn: async (newData: { title: string, description: string }) => {
      const { title, description } = newData;
      const res = await api.post(`/todos`, { data: { title, description } }, {
        headers: { Authorization: `Bearer ${userData.jwt}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      closeAddModal();
    },
    onError: (error) => {
      console.error("Update failed:", error);
    }
  });

  const onSubmitHandler: SubmitHandler<{ title: string, description: string }> = (data) => {
    addTodo(data);
    reset()
  }

  const { isPending, data, error } = useAuthenticatedQuery(
    ['todos'],
    "/users/me?populate=todos",
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




  if (isPending || isGenerating) return (
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
        <div className="flex justify-center items-center gap-8 my-8">
          <Button className="btn" onClick={openAddModal}>Post new todo</Button>
          <Button className="btn btn-outline" onClick={() => generateTodos()}>Generate todos (100)</Button>
        </div>
        <TodoList todos={data.todos} jwt={userData.jwt} />
      </div>
      <Modal isOpen={isAddOpen} title="Edit Todo">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <Input input={modalInputs} {...register("title")}></Input>
            {errors['title'] && <InputErrorMsg msg={errors['title']?.message} />}
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="description">description</label>
            <TextArea id="description" {...register("description")} />
            {errors['description'] && <InputErrorMsg msg={errors['description']?.message} />}
          </div>

          <div className="flex gap-2">
            <Button className='btn w-full text-white bg-indigo-700 hover:bg-indigo-600' type="submit">Add</Button>
            <Button className='btn btn-cancel w-full' onClick={closeAddModal} type="reset">Cancel</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default Home