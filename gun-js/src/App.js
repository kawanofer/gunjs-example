import React, { useEffect, useState } from "react";
import { useGun } from "./context/GunContext";
import "./App.css";

const App = () => {
  const gun = useGun();
  const [usersOnline, setUsersOnline] = useState(0);

  useEffect(() => {
    const usersOnlineRef = gun.get("users_online");

    // Ensure 'users_online' is an object
    usersOnlineRef.once((data) => {
      if (!data) {
        usersOnlineRef.put({ count: 0 });
      } else {
        setUsersOnline(data.count || 0);
      }
    });

    usersOnlineRef.on((data) => {
      setUsersOnline(data.count || 0);
    });
  }, [gun]);

  const incrementUsersOnline = () => {
    const usersOnlineRef = gun.get("users_online");
    usersOnlineRef.once((data) => {
      const newCount = (data?.count || 0) + 1;
      usersOnlineRef.put({ count: newCount });
    });
  };

  const decrementUsersOnline = () => {
    const usersOnlineRef = gun.get("users_online");
    usersOnlineRef.once((data) => {
      let newCount = (data?.count || 0) - 1;
      newCount = newCount < 0 ? 0 : newCount;
      usersOnlineRef.put({ count: newCount });
    });
  };

  return (
    <main>
      <h1>Users Online</h1>
      <div className="users-online">
        <button disabled={usersOnline === 0} onClick={decrementUsersOnline}>
          -
        </button>
        <h2>{usersOnline}</h2>
        <button onClick={incrementUsersOnline}>+</button>
      </div>
    </main>
  );
};

export default App;
