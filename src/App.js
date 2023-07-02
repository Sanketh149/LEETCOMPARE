import "./App.css";
import React, { useState } from "react";
import Header from "./Components/Header";
import ErrorMessage from "./Components/ErrorMessage";
import NoCharacter from "./Components/NoCharacter";
import ProblemList from "./Components/ProblemList";

const API_ENDPOINT = "https://leet-compare-api.onrender.com/";

const App = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const url = `${API_ENDPOINT}${userName}`;

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      const data = result.matchedUser.submitStats.acSubmissionNum;
      const submissions = data.map((item) => item.count);
      const userWise = [userName, submissions];

      // Check if the username already exists in the userData array
      const isUsernameExists = userData.some((item) => item[0] === userName);

      if (!isUsernameExists) {
        const updatedUserData = [...userData, userWise];

        // Sort the updatedUserData array based on item[1][0]
        updatedUserData.sort((a, b) => b[1][0] - a[1][0]);

        setUserData(updatedUserData);
      }

      if (userName.length > 0 && !userIds.includes(userName.toLowerCase())) {
        setUserIds((prevState) => [...prevState, userName.toLowerCase()]);
      }

      setIsLoading(false);
      setUserName("");
    } catch (error) {
      setIsLoading(false);
      setCartIsShown(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit(event);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
    setUserName("");
  };
  const deleteHandler = async (event, item) => {
    event.preventDefault();
    const newIds = userIds.filter((value) => value !== item);
    setUserIds(newIds);

    // Remove item from userData where userData[0] === item
    const newUserData = userData.filter((data) => data[0] !== item);
    setUserData(newUserData);
    if (newIds.length === 0) {
      setUserData([]);
    }
  };

  const isSubmitDisabled = userName.trim().length === 0;

  return (
    <div className="app">
      {cartIsShown && (
        <ErrorMessage onClose={hideCartHandler} shownName={userName} />
      )}
      <Header numberOfProblems={userData.length} />
      <div className="app__content">
        <div className="app__sidebar">
          <form onSubmit={handleSubmit} className="app__form">
            <input
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="Enter Leetcode ID"
              className="app__input"
            />
            {isSubmitDisabled && <NoCharacter />}
            <button
              type="submit"
              className={`${
                isSubmitDisabled ? "app__button_disabled" : "app__button"
              }`}
              disabled={isSubmitDisabled}
            >
              Add Friend
            </button>
          </form>
          {isLoading && <p>Loading data ...</p>}

          {userIds.map((item) => (
            <div>
              <a
                key={item}
                href={`https://leetcode.com/${item}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="displayNameButton">{item}</button>
              </a>
              <button
                className="displayNameButtonNext"
                onClick={(event) => deleteHandler(event, item)}
              >
                {" "}
                X{" "}
              </button>
            </div>
          ))}
        </div>
        <div className="app__problem-list">
          <ProblemList userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default App;
