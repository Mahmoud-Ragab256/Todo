import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import TextArea from "./TextArea";
import api from "../../config/axios.config";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type ITodo } from '../../interfaces/index'
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "../../validation";
import InputErrorMsg from "./InputErrorMsg";


interface IProps {
  todos: ITodo[];
  jwt: string;
}


function TodoList({ todos, jwt }: IProps) {

  const modalInputs = {
    label: "title",
    name: "title",
    id: "title",
    placeholder: "title",
    type: "text",
  }

  const queryClient = useQueryClient();




  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false)
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    title: '',
    description: '',
    documentId: ''
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ITodo>({
    resolver: yupResolver(todoSchema),
    defaultValues: {
      documentId: todoToEdit.documentId,
      title: todoToEdit.title,
      description: todoToEdit.description
    }
  })






  function openEditModal() {
    setIsEditOpen(true)
  }

  function closeEditModal() {
    setIsEditOpen(false)
  }

  function openRemoveModal(todo: ITodo) {
    setTodoToEdit(todo)
    setIsRemoveOpen(true)
  }

  function closeRemoveModal() {
    setIsRemoveOpen(false)
  }


  const { mutate: updateTodo } = useMutation({
    mutationFn: async (updatedData: ITodo) => {
      const { title, description } = updatedData;
      const res = await api.put(`/todos/${updatedData.documentId}`, { data: { title, description } }, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      closeEditModal();
    },
    onError: (error) => {
      console.error("Update failed:", error);
    }
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async (documentId: string) => {
      const res = await api.delete(`/todos/${documentId}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      closeRemoveModal();
    },
    onError: (error) => {
      console.error("Update failed:", error);
    }
  });

  const onSubmitHandler: SubmitHandler<ITodo> = (data) => {
    updateTodo(data);
  }


  const editHandler = (todo: ITodo) => {
    openEditModal()
    reset(todo)
  }





  return (
    <>
      {
        todos.length > 0 ? todos.map((todo, idx) => {
          let bgc: string = '';
          (idx % 2) ? bgc = '#EEE' : bgc = '#CCC'
          return (
            <div className="w-full flex items-center justify-between gap-4 p-4 text-[12px] md:text-sm" style={{ backgroundColor: bgc }} key={todo.documentId}>
              <span className="block">
                {idx}.
              </span>
              <span className=" block line-clamp-3">
                {todo.title}
              </span>
              <div className="flex gap-2">
                <Button className='btn-sm text-white bg-indigo-700 hover:bg-indigo-600' onClick={() => editHandler(todo)}>Edit</Button>
                <Button className='btn-sm text-white bg-red-700 hover:bg-red-600' onClick={() => openRemoveModal(todo)}>Delete</Button>
              </div>
            </div>
          )
        }) : <h3>No todos yet...</h3>
      }
      <Modal isOpen={isEditOpen} title="Edit Todo">
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
            <Button className='btn w-full text-white bg-indigo-700 hover:bg-indigo-600' >Edit</Button>
            <Button className='btn btn-cancel w-full' onClick={closeEditModal} type="reset">Cancel</Button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isRemoveOpen} title="Remove Todo">
        <div className="flex flex-col gap-4">
          <p>Are you sure you want to delete this task? This action cannot be undone and the data will be permanently removed.</p>
          <div className="flex gap-2">
            <Button className='btn-sm text-white bg-red-700 hover:bg-red-600' onClick={() => deleteTodo(todoToEdit.documentId)}>Delete</Button>
            <Button className='btn btn-cancel' onClick={closeRemoveModal}>cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}



export default TodoList