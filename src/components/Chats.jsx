import { useRef, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const didMountRef = useRef(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        navigate("/");
        return;
      }

      axios
        .get("https://api.chatengine.io/users/me", {
          headers: {
            "project-id": "80bd6d46-c4f7-4b4f-9c37-da6f7030142e",
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          let formdata = new FormData()
          formdata.append('email', user.email)
          formdata.append('username', user.email)
          formdata.append('secret', user.uid)
  
          getFile(user.photoURL)
          .then(avatar => {
            formdata.append('avatar', avatar, avatar.name)
  
            axios.post(
              'https://api.chatengine.io/users/',
              formdata,
              { headers: { "private-key": "232468b5-7121-4588-8e52-c7a113b178be" }}
            )
            .then(() => setLoading(false))
            .catch(e => console.log('e', e.response))
          })
        })
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
      }
  }, [user, navigate]);

  if (!user || loading) return <div />;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID="80bd6d46-c4f7-4b4f-9c37-da6f7030142e"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
