import React from 'react';
import '../styles/components/ChatLogin.css'
import "../styles/components/ChatUsers.css";
// import FlatList from "flatlist-react";


import { useDispatch, useSelector } from "react-redux";


export default function Login({onLogin, username, setUsername, users}) {
  const { chatReducerStyle } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const handleChatCollapse = () => {
    if(!!chatReducerStyle.expand) return

    dispatch({
      type: "CHAT_CLOSED",
    });

    // console.log("chatReducerStyle", chatReducerStyle);
  };

  const handleChatExpand = () => {
    dispatch({
      type: "CHAT_OPEN",
    });

    // console.log("chatReducerStyle", chatReducerStyle);
  };


  const renderUser = (item, idx) => {
    return (
      <div className="chat-user-flatlist-empty">
              <svg
                width="186"
                height="186"
                viewBox="0 0 186 186"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
                className="user-flatlist-empty-icon"
              >
                <path
                  d="M93 186C144.362 186 186 144.362 186 93C186 41.6375 144.362 0 93 0C41.6375 0 0 41.6375 0 93C0 144.362 41.6375 186 93 186Z"
                  fill="#F2F7EE"
                />
                <path
                  d="M93 163C131.66 163 163 131.66 163 93C163 54.3401 131.66 23 93 23C54.3401 23 23 54.3401 23 93C23 131.66 54.3401 163 93 163Z"
                  fill="#7AB259"
                  fill-opacity="0.1"
                />
                <path
                  d="M67.6 76.9H117.4V68.6H67.6V76.9ZM67.6 89.35H117.4V81.05H67.6V89.35ZM67.6 101.8H117.4V93.5H67.6V101.8ZM51 60.3C51 58.0987 51.8745 55.9876 53.431 54.431C54.9876 52.8745 57.0987 52 59.3 52H125.7C127.901 52 130.012 52.8745 131.569 54.431C133.126 55.9876 134 58.0987 134 60.3V110.1C134 112.301 133.126 114.412 131.569 115.969C130.012 117.526 127.901 118.4 125.7 118.4H67.6L51 135V60.3Z"
                  fill="#7AB259"
                />
              </svg>

              <div className="user-flatlist-empty-title">No messages yet</div>
              <div className="user-flatlist-empty-sub-title">It looks like you have not <br /> initiated any conversation.</div>
            </div>
    );
  };

  return (
    <div
    className={
      !chatReducerStyle.visible
        ? "user-chat-container-invisible" :
         "user-chat-container"
    }
  >
    <div
      className="chat-users-list-header"
      onClick={
        !chatReducerStyle.visible ? handleChatExpand : handleChatCollapse
      }
    >
      <div className="chat-flex">
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
          className="chat-users-messenger-icon"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.2604 0C5.78974 0 0 5.42888 0 12.7609C0 16.5963 1.58484 19.9103 4.16488 22.1999C4.38099 22.3931 4.51173 22.6605 4.5224 22.949L4.59444 25.2889C4.61845 26.0353 5.39487 26.5197 6.08323 26.2206L8.71396 25.0692C8.93808 24.9713 9.18621 24.9527 9.421 25.0163C10.6296 25.3471 11.9183 25.5218 13.2604 25.5218C20.731 25.5218 26.5208 20.0929 26.5208 12.7609C26.5208 5.42888 20.731 0 13.2604 0Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.10135 13.9013L8.99676 7.77098C9.61575 6.7969 10.9445 6.55338 11.8729 7.24424L14.9706 9.54972C15.2561 9.76148 15.6456 9.75883 15.9284 9.54708L20.112 6.39721C20.6696 5.97635 21.4007 6.64073 21.0245 7.22835L17.1317 13.356C16.5127 14.3301 15.184 14.5736 14.2555 13.8828L11.1579 11.5773C10.8724 11.3655 10.4829 11.3682 10.2001 11.5799L6.01384 14.7324C5.45621 15.1533 4.72515 14.4889 5.10135 13.9013Z"
            fill="#017019"
          />
          <path
            d="M9.93781 20.1954H12.6221V10.7196H9.93781V20.1954Z"
            fill="#017019"
          />
        </svg>
        T-messager
      </div>

      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
        onClick={handleChatCollapse}
      >
        <path
          d="M11.274 0.000156278L12.6953 1.41016L6.64731 7.41016L0.599313 1.41016L2.02059 0.000155469L6.64731 4.58016L11.274 0.000156278ZM11.274 6.00016L12.6953 7.41016L6.64731 13.4102L0.599312 7.41016L2.02059 6.00016L6.64731 10.5802L11.274 6.00016Z"
          fill="white"
        />
      </svg>
    </div>
    <div className={!chatReducerStyle.visible ? "nodisplay" : ""}>
      <div
        className={
          !!chatReducerStyle.expand
            ? "chat-user-list-messages-expand"
            : "chat-user-list-messages"
        }
      >
        <FlatList
          list={users}
          renderItem={renderUser}
          renderWhenEmpty={() => (
            <div className="chat-user-flatlist-empty">
              <svg
                width="186"
                height="186"
                viewBox="0 0 186 186"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
                className="user-flatlist-empty-icon"
              >
                <path
                  d="M93 186C144.362 186 186 144.362 186 93C186 41.6375 144.362 0 93 0C41.6375 0 0 41.6375 0 93C0 144.362 41.6375 186 93 186Z"
                  fill="#F2F7EE"
                />
                <path
                  d="M93 163C131.66 163 163 131.66 163 93C163 54.3401 131.66 23 93 23C54.3401 23 23 54.3401 23 93C23 131.66 54.3401 163 93 163Z"
                  fill="#7AB259"
                  fill-opacity="0.1"
                />
                <path
                  d="M67.6 76.9H117.4V68.6H67.6V76.9ZM67.6 89.35H117.4V81.05H67.6V89.35ZM67.6 101.8H117.4V93.5H67.6V101.8ZM51 60.3C51 58.0987 51.8745 55.9876 53.431 54.431C54.9876 52.8745 57.0987 52 59.3 52H125.7C127.901 52 130.012 52.8745 131.569 54.431C133.126 55.9876 134 58.0987 134 60.3V110.1C134 112.301 133.126 114.412 131.569 115.969C130.012 117.526 127.901 118.4 125.7 118.4H67.6L51 135V60.3Z"
                  fill="#7AB259"
                />
              </svg>

              <div className="user-flatlist-empty-title">No messages yet</div>
              <div className="user-flatlist-empty-sub-title">It looks like you have not <br /> initiated any conversation.</div>
            </div>
          )}
        />
      </div>
    </div>
  </div>
  );
}
