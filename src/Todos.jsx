import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Route } from "react-router";
import Todo from "./Todo";
export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchterm] = useState("");
  const [order, setorder] = useState("asc");
  const sorting = (col) => {
    if (order === "asc") {
      const sorted = [...todos].sort((a, b) => {
        return (
          a[col].toString().toLowerCase() - b[col].toString().toLowerCase()
        );
      });

      setTodos(sorted);
      setorder("dsc");
    }
    if (order === "dsc") {
      const sorted = [...todos].sort((a, b) => {
        return (
          b[col].toString().toLowerCase() - a[col].toString().toLowerCase()
        );
      });
      setTodos(sorted);
      setorder("asc");
    }
  };

  let history = useHistory();
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos`).then((res) => {
      setTodos(res.data);
    });
  }, []);
  <Todo todoTitle='hello' />;
  return (
    <div className='list-section'>
      <div className='list-header'>
        <h1>&#x2713; TODO LIST </h1>
        <input
          className='list-search-bar'
          type='text'
          placeholder='Search Here...'
          onChange={(e) => {
            setSearchterm(e.target.value);
          }}
        />
      </div>
      <div>
        <table className='table table-bordered'>
          <thead className='thead-dark'>
            <tr>
              <th>
                <div className='sort-container' onClick={() => sorting("id")}>
                  {order === "asc" ? "▼" : "▲"} sort
                </div>
                TODO_ID
              </th>
              <th>TODO_TITLE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {todos && todos.length > 0
              ? todos
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.id
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toString().toLowerCase()) ||
                      val.title
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toString().toLowerCase()) ||
                      (val.completed ? "completed" : "incomplete")
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toString().toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((todo) => {
                    return (
                      <tr className='table-data'>
                        <td>{todo.id}</td>
                        <td>{todo.title}</td>

                        <td>{todo.completed ? "completed" : "incomplete"}</td>
                        <td>
                          <button
                            className='details-btn'
                            key={todo.id}
                            id={todo.id}
                            onClick={() => {
                              history.push(
                                `/Todo/${todo.userId}/${todo.id}/${todo.title}`
                              );
                            }}>
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
              : "LOADING..."}
          </tbody>
        </table>
      </div>
    </div>
  );
};
