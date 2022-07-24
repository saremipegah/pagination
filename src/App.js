import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);

  let pageSize = 10;
  let pagesNumbers;
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
        let endIndex = pageSize * currentPage;
        let startIndex = endIndex - pageSize;
        let allShowTodos = datas.slice(startIndex, endIndex);
        setPaginatedTodos(allShowTodos);
      });
  }, []);

  useEffect(()=>{
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let allShowTodos = todos.slice(startIndex, endIndex);
    setPaginatedTodos(allShowTodos);

  },[currentPage]);

  const changePaginate = (newPage) => {
    setCurrentPage(newPage);
   
  };

  const pagesCount = Math.ceil(todos.length / pageSize);
  pagesNumbers = Array.from(Array(pagesCount).keys());

  return (
    <div>
      <img src="logogreen.png" className="img" alt="logo" />
      {!todos ? (
        "loading"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTodos.map((todo) => (
              <tr>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td>
                  <p
                    className={
                      todo.completed ? "btn btn-success" : "btn btn-danger"
                    }
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination" aria-current="page">
          {pagesNumbers.map((pagesNumber) => (
            <li
              style={{ cursor: "pointer" }}
              className={
                pagesNumber + 1 === currentPage
                  ? "page-item active"
                  : "page-item"
              }
              key={pagesNumber + 1}
              onClick={() => changePaginate(pagesNumber + 1)}
            >
              <span className="page-link">{pagesNumber + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
