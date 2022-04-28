import react, { useState, useEffect } from "react";
import axios from "axios";
import ExpendedUsers from "./components/ExpendedUsers";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [isExpended, setIsExpended] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      const fetchUsers = await axios.get(
        "https://randomuser.me/api/?results=50"
      );
      console.log(fetchUsers.data.results);
      setUsers(fetchUsers.data.results);
    };
    getUsers();
  }, []);

  const expendHandler = () => {
    setIsExpended(true);
  }

  const submitSearchHandler = (e) => {
    e.preventDefault();
    setQuery(e.target[0].value)
  }

  return (
    <div className="search-bar">
      {!isExpended && <input
        className="search"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />}
      {isExpended && <form className="search-bar-expended" onSubmit={submitSearchHandler}>
        <input
        className="search-expended"
        type="text"
        placeholder="Search"
        defaultValue={query}
        // onChange={(e) => {
        //   setQuery(e.target.value);
        // }}
      />
      </form>}
      {query !== "" && isExpended === false &&
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
          {isExpended && query !== "" && <ExpendedUsers usersList={users} query={query}/>}
    </div>
  );
};

export default App;
