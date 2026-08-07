import ListElement from "./ListElement"

interface IProps {
  data: {
    todos: {
      id: number;
      title: string;
    }[]
  }

}

function TodoList({ data }: IProps) {


  return (
    <>
      {
        data?.todos.length > 0 ? data.todos.map((todo, idx) => {
          let bgc: string = '';
          (idx % 2) ? bgc = '#EEE' : bgc = '#CCC'
          return (
            <ListElement key={todo.id} backgroundColor={bgc} index={idx} >
              {todo.title}
            </ListElement>
          )
        }) : <h3>No todos yet...</h3>
      }
    </>
  )
}

export default TodoList