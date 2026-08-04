import ListElement from "./ListElement"

interface IProps {

}

function TodoList({ }: IProps) {
  return (
    <>
      <div className="w-100 md:w-150 lg:w-200 mx-auto">
        <ListElement backgroundColor="#DDD" index={1} >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum consequatur
        </ListElement>
        <ListElement backgroundColor="#AAA" index={2} >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum consequatur
        </ListElement>
        <ListElement backgroundColor="#DDD" index={3} >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum consequatur
        </ListElement>
        <ListElement backgroundColor="#AAA" index={4} >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum consequatur
        </ListElement>
      </div>
    </>
  )
}

export default TodoList