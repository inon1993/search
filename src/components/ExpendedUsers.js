import React, { useEffect, useState } from "react";
import "./ExpendedUsers.css"

const ExpendedUsers = ({usersList, query}) => {

    const [numButtons, setNumButtons] = useState([])
    const [sliceVal, setSliceVal] = useState({start: 0, end: 10})

    useEffect(() => {
        console.log(query);
        let a = usersList.filter((user) => {if (user.name.first.toLowerCase().includes(query)) {
            return user;
          }})
        let length = a.length;
        console.log(length);
        let numOfButtons = Math.ceil(length / 10);
        console.log(numOfButtons);
        let arr = [];
        for(let i = 1 ; i <= numOfButtons ; i++) {
            arr.push(i);
        }
        console.log(arr);
        setNumButtons(arr);
    }, [usersList,query])

    const sliceHandler = (e) => {
        if(e.target.innerText === 1) {
            setSliceVal({start: 0, end: 10})
            return
        }
        setSliceVal({start: (+e.target.innerText-1)*10, end: (+e.target.innerText-1)*10 + 10});
    }

    return (<React.Fragment>
        <div className="resultsExpended">
        {usersList
          .filter((user) => {
            if (user.name.first.toLowerCase().includes(query)) {
              return user;
            }
          })
          .slice(sliceVal.start, sliceVal.end)
          .map((res) => {
            return (
              
                <div className="usersExpended">
                <img className="picExpended" src={res.picture.thumbnail} />
                <div className="nameExpended">
                  <h3>{res.name.first}</h3>
                  <h4>{res.name.last}</h4>
                </div>
              </div> 
            );
          })}
          </div>
          <div className="pageButtons">
              {numButtons.map((buttonNum) => {
                  return(
                      <button className="pageNum" onClick={sliceHandler}>{buttonNum}</button>
                  )
              })}
          </div>
          </React.Fragment>
    )
}

export default ExpendedUsers;