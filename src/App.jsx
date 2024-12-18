import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import { useRef, useState, useCallback, createContext } from "react";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래연습 하기",
    date: new Date().getTime(),
  },
];

export const TodoContext = createContext();

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  const onCreate = useCallback(
    (content) => {
      const newTodo = {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      };
      setTodos([newTodo, ...todos]);
    },
    [todos]
  );

  const onUpdate = useCallback(
    (targetId) => {
      // todos State의 값들 중에
      // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경

      // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
      setTodos(
        todos.map((todo) =>
          todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    },
    [todos]
  );

  const onDelete = useCallback(
    (targetId) => {
      // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
      setTodos(todos.filter((todo) => todo.id !== targetId));
    },
    [todos]
  );

  return (
    <div className="App">
      <TodoContext.Provider value={{ todos, onCreate, onUpdate, onDelete }}>
        <Header />
        <Editor />
        <List />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
