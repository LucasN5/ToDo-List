import { useState } from 'react';
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm"
import Search from './components/Search';
import Filter from './components/Filter';


function App() {
 const [ todos, setTodos ] = useState ([
  
  {
    id: 1,
    text: "Estudar React",
    category: "Estudo",
    isCompleted: false,
  },

  {
    id: 2,
    text: "Ir para academia",
    category: "Pessoal",
    isCompleted: false,
  },

  {
    id: 3,
    text: "Procurar vagas",
    category: "Trabalho",
    isCompleted: false,
  },


 ]);

// Criação de useState para pesquisa 

const [search, setSearch] = useState("");

// Criação de useState para filtragem 

const [filter, setFilter] = useState("All");

// Criação de useState para filtragem por ascendencia

const [sort, setSort] = useState("Asc");
 

//Lógica para adicionar atividades

 const addTodo = (text, category) => {
  const newTodos = [...todos,
    {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    },
  ];

  setTodos(newTodos)
 };

 //Lógica para remover atividades

const removeTodo = (id) => {
  const newTodos = [...todos];
  const filteredTodos = newTodos.filter((todo) => 
  todo.id !== id ? todo : null
  );
  setTodos(filteredTodos);  
};

//Lógica para completar atividades

const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) => 
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  };


//Retorno da estrutura HTML geral do projeto

  return <div className='app'>
    <h1>Lista de tarefas</h1>

    <Search search={search} setSearch={setSearch}/>

    <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>

    <div className='todo-list'>
      {todos
        .filter((todo) => 
          filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)

        .filter((todo) => 
          todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )

        .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
        .map((todo) => (
        <Todo todo={todo} key={todo.id} removeTodo={removeTodo} completeTodo={completeTodo} />
       
      ))}
    </div>
    <TodoForm addTodo={addTodo}/>
  </div>
}




export default App
