import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import TextArea from "./TextArea";

interface IProps {
  data: {
    todos: {
      id: number;
      title: string;
      description: string
    }[]
  }
  // isEditOpen: boolean;
  // setIsEditOpen: () => void
}
export const ModalInputs = {
  label: "title",
  name: "title",
  id: "title",
  placeholder: "title",
  type: "text",
}


function TodoList({ data, }: IProps) {

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false)
  const [todoToEdit, setTodoToEdit] = useState<{ title: string, description: string }>({
    title: '',
    description: '',
  })

  function openEditModal() {
    setIsEditOpen(true)
  }

  function closeEditModal() {
    setIsEditOpen(false)
  }

  function openRemoveModal() {
    setIsRemoveOpen(true)
  }

  function closeRemoveModal() {
    setIsRemoveOpen(false)
  }

  const editHandler = (todo: { title: string, description: string }) => {
    openEditModal()
    setTodoToEdit({ title: todo.title, description: todo.description })
  }


  return (
    <>
      {
        data?.todos.length > 0 ? data.todos.map((todo, idx) => {
          let bgc: string = '';
          (idx % 2) ? bgc = '#EEE' : bgc = '#CCC'
          return (
            <div className="w-full flex items-center justify-between gap-4 p-4 text-[12px] md:text-sm" style={{ backgroundColor: bgc }} key={todo.id}>
              <span className="block">
                {idx}.
              </span>
              <span className=" block line-clamp-3">
                {todo.title}
              </span>
              <div className="flex gap-2">
                <Button className='btn-sm text-white bg-indigo-700 hover:bg-indigo-600' onClick={() => editHandler(todo)}>Edit</Button>
                <Button className='btn-sm text-white bg-red-700 hover:bg-red-600' onClick={() => openRemoveModal()}>Delete</Button>
              </div>
            </div>
          )
        }) : <h3>No todos yet...</h3>
      }
      <Modal isOpen={isEditOpen} title="Edit Todo">
        <div className="flex flex-col gap-4">
          <Input input={ModalInputs} value={todoToEdit.title}></Input>
          <TextArea value={todoToEdit.description} />
          <div className="flex gap-2">
            <Button className='btn w-full text-white bg-indigo-700 hover:bg-indigo-600'>Edit</Button>
            <Button className='btn btn-cancel w-full' onClick={closeEditModal}>cancel</Button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isRemoveOpen} title="Remove Todo">
        <div className="flex flex-col gap-4">
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel tempora consequuntur numquam doloribus cumque adipisci, reiciendis earum itaque recusandae officia dolorum quis, porro sit commodi aliquam veniam voluptates ex animi!</p>
          <div className="flex gap-2">
            <Button className='btn-sm text-white bg-red-700 hover:bg-red-600' >Delete</Button>
            <Button className='btn btn-cancel' onClick={closeRemoveModal}>cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TodoList