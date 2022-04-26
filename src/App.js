import react, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const fetchUsers = await axios.get(
        "https://randomuser.me/api/?results=100"
      );
      console.log(fetchUsers.data.results);
      setUsers(fetchUsers.data.results);
    };
    getUsers();
  }, []);

  const expendHandler = () => {
    
  }

  return (
    <div className="search-bar">
      <input
        className="search"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {query !== "" &&
      <div className="results">
        {users
          .filter((user) => {
            if (user.name.first.toLowerCase().includes(query)) {
              return user;
            }
          })
          .slice(0, 3)
          .map((res) => {
            return (
              
                <div className="users">
                <img className="pic" src={res.picture.thumbnail} />
                <div className="name">
                  <h3>{res.name.first}</h3>
                  <h4>{res.name.last}</h4>
                </div>
              </div> 
            );
          })}
          <p className="expend" onClick={expendHandler}>Show More</p>
          </div>
          }
          
    </div>
  );
};

export default App;
