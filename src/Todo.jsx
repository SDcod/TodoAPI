import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Route } from "react-router-dom";
const Todo = () => {
  const { id, Todoid, Todotitle } = useParams();

  const [todoDetails, setTodoDetails] = useState([]);

  {
    useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/users/`).then((res) => {
        const responseTodos = res.data;
        setTodoDetails(responseTodos);
      });
    }, []);
  }

  return (
    <div className='todo-user'>
      {todoDetails.length > 0
        ? todoDetails
            .filter((detail) => detail.id == id)
            .map((detail) => (
              <li
                className='user-detail-container'
                key={detail.id}
                style={{ listStyle: "none" }}>
                <p>
                  <span>Todo Id :</span> {Todoid}
                </p>
                <br />
                <p>
                  <span>Todo Title :</span> {Todotitle}
                </p>
                <br />
                <p>
                  <span>User Id :</span> {detail.id}
                </p>
                <br />
                <p>
                  <span>User Name :</span> {detail.name}
                </p>
                <br />
                <p>
                  <span>Email :</span> {detail.email}
                </p>
              </li>
            ))
        : "LOADING..."}
      <Route
        render={({ history }) => (
          <button
            className='clear-btn'
            onClick={() => {
              history.push("/TodoRollixer/");
            }}>
            Clear
          </button>
        )}
      />
    </div>
  );
};

export default Todo;
