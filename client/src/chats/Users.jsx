import React, {useEffect, useState} from "react";
import FlatList from "flatlist-react";
import "../styles/components/ChatUsers.css";
// import Avatar from "../../img/menu-avatar.png";
// import UserAvatar from "../../img/userImg.png";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from 'moment';
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';
// import { LoadingLargeIcon } from '../../icons'



export default function Users({
  setCurrentPage,
    setSelectedUser,
    setChatLoading
  
  
}) {
  // const renderUser = ({item}) => {
  //   return (
  //     <button onPress={() => onClickUser(item)} className="row">
  //       {/* <img className="avatar" source={{uri: item.avatar}} /> */}
  //       <div>{item.username}</div>
  //     </button>
  //   );
  // };
  
  const [users, setUsers] = useState([]);
  const [myData, setMyData] = useState(null);
  const [unread, setUnread] = useState([]);
  const [filtered, setFiltered] = useState(null);


  const dispatch = useDispatch();
  const pathname = useLocation();
  // const filtered = users?.sort(
  //   (a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt)
  // );

  // console.log('users', users)

  const { chatReducerStyle, auth, currentFriend } = useSelector((state) => ({ ...state }));
  const { userInfo } = auth;




  const processList = (users) => {
    if (!users) {
      setFiltered([]);
      return;
    }
    const filtered = users?.filter((res) => res?.lastMessage);
    const sorted = filtered.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    setFiltered([...sorted]);
    setUnread(filtered?.filter((res) => res.status === 0)?.length)
  };

  useEffect(() => {
    const database = getDatabase();
    const myUserRef = ref(database, `users/${userInfo?.id}/friends`);
    // console.log("fetchimg", userInfo?.id);

    const unsub = onValue(myUserRef, (snapshot) => {
      const data = snapshot.val();
      // console.log("fetxhed data", data);
      setMyData(data);
      processList(data?.filter(Boolean));
    });

    return () => unsub();
  }, [userInfo?.id]);

  const handleChatCollapse = () => {
    if (!!chatReducerStyle.expand) return;

    dispatch({
      type: "CLEAR_CURRENT_FRIEND",
    });

    // console.log("cleared", currentFriend)



    dispatch({
      type: "CHAT_CLOSED",
    });
    // saleem()

    

    // console.log("chatReducerStyle", chatReducerStyle);
  };

  const handleChatExpand = () => {
    dispatch({
      type: "CHAT_OPEN",
    });
    // saleem()

    // console.log("chatReducerStyle", chatReducerStyle);
  };


  const onClickUser = (user) => {
    setChatLoading(true)
    const database = getDatabase();
    // console.log('myData', myData)
    const myFriends = myData || [];
    const findFriend = myFriends.find(
      (item) => item.chatroomId === user.chatroomId
    );

    // console.log('user', user)
    // console.log('myData?.friends', myData?.friends)
    // console.log('myFriends', myFriends)
    // console.log('findFriend', findFriend)

    // console.log(
    //   "id", findFriend?.id,
    //   "firstName", findFriend?.firstName,
    //   "lastName", findFriend?.lastName,
    //   "storeName", findFriend?.storeName,
    //   "profilePic", "",
    //   "productName", "",
    //   "productImage", "",
    //   "productDetail", "",
    //   "productWeight", "",
    //   "productMetrics", "",
    //   "productPrice", "",
    //   "productSlug", "",
    //   "productId", "",
    //   "bidMessage", "",
    //   "navFrom", "chatUsers"
    // )
    dispatch({
      type: "CURRENT_FRIEND",
      payload: {
        id: findFriend?.id,
        firstName: findFriend?.firstName,
        lastName: findFriend?.lastName,
        storeName: !!findFriend?.storeName ? findFriend?.storeName : "",
        userName: findFriend?.username,
        productName: "",
        productImage: "",
        profilePic: "",
        productDetail: "",
        productWeight: "",
        productMetrics: "",
        productPrice: "",
        productSlug: "",
        productId: "",
        navFrom: "chatUsers"


      }
     
    });
    setCurrentPage("chat");
    // setSelectedUser(user);

    // console.log(user.chatroomId);
    update(ref(database, `users/${userInfo?.id}/friends/${myFriends.indexOf(findFriend)}`), { status: 1 });
    setTimeout(() => {setChatLoading(false)}, 1500)
  };

  const renderUser = (item, idx) => {
    return (
      <div
        key={idx}
        onClick={() => onClickUser(item)}
        className={item?.status === 0 ? "chat-user-list-item pointer" : "chat-user-list-item-read pointer"}
      >
        
        <img
          // src={!item?.avatar ? UserAvatar : item?.avatar}
          className="chat-user-avatar"
          alt="logged in user's avatar"
        />
        <div>
          <div className="chat-flex">
            <div className="chat-user-list-username">{item?.storeName ? item?.storeName : item.username}</div>
            {/* <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
              className="chat-user-list-icon"
            >
              <path
                d="M10 4.99761L8.89091 3.66937L9.04545 1.91113L7.40455 1.51935L6.54545 0L5 0.697563L3.45455 0L2.59545 1.51935L0.954545 1.90635L1.10909 3.6646L0 4.99761L1.10909 6.32585L0.954545 8.08887L2.59545 8.48065L3.45455 10L5 9.29766L6.54545 9.99522L7.40455 8.47587L9.04545 8.08409L8.89091 6.32585L10 4.99761ZM4.09091 7.38653L2.27273 5.47539L2.91364 4.80172L4.09091 6.0344L7.08636 2.88581L7.72727 3.56426L4.09091 7.38653Z"
                fill="#017019"
              />
    </svg> */}
          </div>
          <div className="chat-user-last-message">
           {item?.lastMessage}
    </div>
          {item?.status === 0 && userInfo.id === item?.id ? (
            <div className="chat-user-message-time">
              {moment(item.updatedAt).format("ll,        LT")}
            </div>
          ) : (
            <>
              <div className="chat-user-message-time">
                {moment(item.updatedAt).format("ll,        LT")}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        !chatReducerStyle.visible
          ? "user-chat-container-invisible"
          : !!chatReducerStyle.expand
          ? "user-chat-container-expand"
          : "user-chat-container"
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
          <Badge
                      // variant='dot'
                      badgeContent={unread}
                      color='error'
                      invisible={unread < 1}
                    >
          T-messenger
          </Badge>
        </div>

        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
          onClick={handleChatCollapse}
          className="chat-users-messenger-collapse"
        >
          <path
            d="M11.274 0.000156278L12.6953 1.41016L6.64731 7.41016L0.599313 1.41016L2.02059 0.000155469L6.64731 4.58016L11.274 0.000156278ZM11.274 6.00016L12.6953 7.41016L6.64731 13.4102L0.599312 7.41016L2.02059 6.00016L6.64731 10.5802L11.274 6.00016Z"
            fill="white"
          />
        </svg>
      </div>
      <div className={!chatReducerStyle.visible ? "nodisplay" : ""}>
        <div className="chat-users-search">
          <div className="chat-users-search-input">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 0C8.22391 0 9.87721 0.684819 11.0962 1.90381C12.3152 3.12279 13 4.77609 13 6.5C13 8.11 12.41 9.59 11.44 10.73L11.71 11H12.5L17.5 16L16 17.5L11 12.5V11.71L10.73 11.44C9.59 12.41 8.11 13 6.5 13C4.77609 13 3.12279 12.3152 1.90381 11.0962C0.684819 9.87721 0 8.22391 0 6.5C0 4.77609 0.684819 3.12279 1.90381 1.90381C3.12279 0.684819 4.77609 0 6.5 0ZM6.5 2C4 2 2 4 2 6.5C2 9 4 11 6.5 11C9 11 11 9 11 6.5C11 4 9 2 6.5 2Z"
                fill="#979797"
              />
            </svg>

            <input
              type="text"
              className="chat-users-search-input-inner"
              placeholder="Search messages"
            />
          </div>
        </div>
        {/* <div className="addUser">
          <input
            className="chat-users-input"
            type="text"
            onChange={(e) => setUserToAdd(e.target.value)}
            value={userToAdd}
          />
          <button onClick={() => onAddFriend(userToAdd)}>Add User</button>
      </div> */}
        <div
          className={
            !!chatReducerStyle.expand
              ? "chat-user-list-messages-expand"
              : "chat-user-list-messages"
          }
        >
          <FlatList
            list={filtered}
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
                <div className="user-flatlist-empty-sub-title">
                  It looks like you have not <br /> initiated any conversation.
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
