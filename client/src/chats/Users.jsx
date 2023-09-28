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
import { Urls } from "../routes/urls";
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
console.log('na here we dey');

  const dispatch = useDispatch();
  const pathname = useLocation();
  // const filtered = users?.sort(
  //   (a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt)
  // );

  // console.log('users', users)

  const { chatReducerStyle, auth, currentFriend } = useSelector((state) => ({ ...state }));
  const { userInfo } = auth;




  // const processList = (users) => {
  //   if (!users) {
  //     setFiltered([]);
  //     return;
  //   }
  //   const filtered = users?.filter((res) => res?.lastMessage);
  //   const sorted = filtered.sort(
  //     (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  //   );
  //   setFiltered([...sorted]);
  //   setUnread(filtered?.filter((res) => res.status === 0)?.length)
  // };

  // useEffect(() => {
  //   const database = getDatabase();
  //   const myUserRef = ref(database, `users/${userInfo?.id}/friends`);
  //   // console.log("fetchimg", userInfo?.id);

  //   const unsub = onValue(myUserRef, (snapshot) => {
  //     const data = snapshot.val();
  //     // console.log("fetxhed data", data);
  //     setMyData(data);
  //     processList(data?.filter(Boolean));
  //   });

  //   return () => unsub();
  // }, [userInfo?.id]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${Urls?.baseUrl}${Urls?.getUsers}`
        );

        if (!response.ok) {
          alert("Network response was not ok");
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const ceive = data.filter((item) => item?.id !== auth?.userInfo?.id)
        console.log('data omo iya mi', data);
        console.log('data omo iya mi', auth);
        setFiltered(ceive)
        // setForum(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);

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
    console.log('user', user);
    setChatLoading(true)
    const database = getDatabase();
    // console.log('myData', myData)
    const myFriends = filtered || [];
    // const findFriend = myFriends.find(
    //   (item) => item.chatroomId === user.chatroomId
    // );

    // console.log('user', user)
    // console.log('myData?.friends', myData?.friends)
    // console.log('myFriends', myFriends)
    // console.log('findFriend', findFriend)

    console.log(
      "id", user?.id,
      "firstName", user?.firstname,
      "lastName", user?.lastname,
      // "storeName", findFriend?.storeName,
      // "profilePic", "",
      // "productName", "",
      // "productImage", "",
      // "productDetail", "",
      // "productWeight", "",
      // "productMetrics", "",
      // "productPrice", "",
      // "productSlug", "",
      // "productId", "",
      // "bidMessage", "",
      // "navFrom", "chatUsers"
    )
    dispatch({
      type: "CURRENT_FRIEND",
      payload: {
        id: user?.id,
        firstName: user?.firstname,
        lastName: user?.lastname,
        // storeName: !!findFriend?.storeName ? findFriend?.storeName : "",
        // userName: findFriend?.username,
        // productName: "",
        // productImage: "",
        // profilePic: "",
        // productDetail: "",
        // productWeight: "",
        // productMetrics: "",
        // productPrice: "",
        // productSlug: "",
        // productId: "",
        navFrom: "chatUsers"


      }
     
    });
    setCurrentPage("chat");
    // setSelectedUser(user);

    // console.log(user.chatroomId);
    // update(ref(database, `users/${userInfo?.id}/friends/${myFriends.indexOf(findFriend)}`), { status: 1 });
    setTimeout(() => {setChatLoading(false)}, 1500)
  };

  const renderUser = (item, idx) => {
    return (
      <div
        key={idx}
        onClick={() => onClickUser(item)}
        className={item?.status === 0 ? "chat-user-list-item pointer" : "chat-user-list-item-read pointer"}
      >
        
        {/* <img
          // src={!item?.avatar ? UserAvatar : item?.avatar}
          className="chat-user-avatar"
          alt="logged in user's avatar"
        /> */}
        <div>
          <div className="chat-flex">
            <div className="chat-user-list-username">{item?.firstname}{' '}{item?.lastname}</div>
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
          {/* {item?.status === 0 && userInfo.id === item?.id ? (
            <div className="chat-user-message-time">
              {moment(item.updatedAt).format("ll,        LT")}
            </div>
          ) : (
            <>
              <div className="chat-user-message-time">
                {moment(item.updatedAt).format("ll,        LT")}
              </div>
            </>
          )} */}
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
        className="chat-users-list-header bg-gradient-to-r from-blue-400 to-pink-600"
        onClick={
          !chatReducerStyle.visible ? handleChatExpand : handleChatCollapse
        }
      >
        <div className="chat-flex">
        
        <svg
                    width="38"
                    height="44"
                    viewBox="0 0 38 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_1_3641)">
                      <path
                        d="M34 35.0116V32.5107C34 32.1823 33.9354 31.8571 33.8097 31.5536C33.6841 31.2504 33.5 30.9747 33.2679 30.7423C33.0356 30.5101 32.76 30.3259 32.4568 30.2003C32.1534 30.0746 31.8283 30.0099 31.5 30.0099H21.4993C18.1841 30.0099 15.0047 28.6925 12.6604 26.3475C10.3162 24.0025 8.99918 20.8221 8.99913 17.5058C8.99913 15.8637 9.32246 14.2377 9.95066 12.7207C10.5789 11.2036 11.4996 9.82513 12.6604 8.664C13.8211 7.50288 15.1991 6.58186 16.7157 5.95347C18.2323 5.32509 19.8578 5.00169 21.4993 5.00171H31.4993C31.8276 5.0018 32.1529 4.93719 32.4562 4.81157C32.7596 4.68592 33.0354 4.50173 33.2675 4.2695C33.4998 4.03725 33.6839 3.76152 33.8097 3.45806C33.9354 3.1546 34 2.82934 34 2.50085V0H21.4999C19.2017 -1.31944e-10 16.9261 0.452802 14.8029 1.33255C12.6797 2.2123 10.7505 3.50178 9.12554 5.12733C7.50051 6.75291 6.21148 8.68273 5.33204 10.8066C4.45261 12.9305 3.99998 15.2069 4 17.5058C4 22.1485 5.84372 26.6013 9.12557 29.8842C12.4074 33.1672 16.8586 35.0116 21.4999 35.0116H34Z"
                        fill="url(#paint0_linear_1_3641)"
                      />
                      <path
                        d="M30 28V26.5714C30 26.3838 29.9633 26.198 29.8922 26.0247C29.821 25.8514 29.7166 25.6939 29.5851 25.5612C29.4535 25.4286 29.2973 25.3234 29.1255 25.2516C28.9536 25.1798 28.7694 25.1428 28.5833 25.1428H22.9163C21.0376 25.1428 19.236 24.3903 17.9076 23.0507C16.5792 21.7112 15.8329 19.8944 15.8328 18C15.8328 17.062 16.0161 16.1332 16.372 15.2665C16.728 14.3999 17.2498 13.6125 17.9075 12.9492C18.5653 12.2859 19.3462 11.7598 20.2056 11.4009C21.065 11.0419 21.9861 10.8572 22.9163 10.8572H28.5829C28.7689 10.8572 28.9533 10.8203 29.1252 10.7486C29.2971 10.6768 29.4534 10.5716 29.5849 10.4389C29.7165 10.3062 29.8209 10.1487 29.8922 9.97538C29.9633 9.80203 30 9.61623 30 9.42859V8H22.9166C21.6143 8 20.3248 8.25866 19.1216 8.76121C17.9185 9.26375 16.8253 10.0004 15.9045 10.9289C14.9836 11.8575 14.2532 12.9599 13.7548 14.1732C13.2565 15.3864 13 16.6868 13 18C13 20.6521 14.0448 23.1957 15.9045 25.071C17.7642 26.9464 20.2865 28 22.9166 28H30Z"
                        fill="url(#paint1_linear_1_3641)"
                      />
                      <path
                        d="M28 23V22.2857C28 22.1919 27.9806 22.099 27.9429 22.0123C27.9052 21.9257 27.85 21.847 27.7804 21.7806C27.7107 21.7143 27.628 21.6617 27.537 21.6258C27.446 21.5899 27.3485 21.5714 27.25 21.5714H24.2498C23.2552 21.5714 22.3014 21.1951 21.5981 20.5254C20.8948 19.8556 20.4998 18.9472 20.4997 18C20.4997 17.531 20.5967 17.0666 20.7852 16.6333C20.9737 16.2 21.2499 15.8063 21.5981 15.4746C21.9463 15.143 22.3597 14.8799 22.8147 14.7004C23.2697 14.521 23.7573 14.4286 24.2498 14.4286H27.2498C27.3483 14.4286 27.4458 14.4102 27.5369 14.3743C27.6279 14.3384 27.7106 14.2858 27.7802 14.2195C27.8499 14.1531 27.9052 14.0744 27.9429 13.9877C27.9806 13.901 28 13.8081 28 13.7143V13H24.25C23.5605 13 22.8778 13.1293 22.2409 13.3806C21.6039 13.6319 21.0252 14.0002 20.5377 14.4645C20.0502 14.9288 19.6634 15.48 19.3996 16.0866C19.1358 16.6932 19 17.3434 19 18C19 19.3261 19.5531 20.5978 20.5377 21.5355C21.5222 22.4732 22.8576 23 24.25 23H28Z"
                        fill="url(#paint2_linear_1_3641)"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_1_3641"
                        x="0"
                        y="0"
                        width="38"
                        height="43.0116"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1_3641"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1_3641"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_1_3641"
                        x1="8.53"
                        y1="17.5058"
                        x2="47.0201"
                        y2="17.5058"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="rgb(59 130 246 / 0.8)" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1_3641"
                        x1="15.567"
                        y1="18"
                        x2="37.378"
                        y2="18"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFC0C0" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_1_3641"
                        x1="20.359"
                        y1="18"
                        x2="31.906"
                        y2="18"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFC0C0" />
                      </linearGradient>
                    </defs>
                  </svg>
          <Badge
                      // variant='dot'
                      badgeContent={unread}
                      color='error'
                      invisible={unread < 1}
                    >
          C<small>3</small>-Chat
          </Badge>
        </div>

        {/* <svg
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
        </svg> */}
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
                    fill="#db2777"
                    fill-opacity="0.1"
                  />
                  <path
                    d="M67.6 76.9H117.4V68.6H67.6V76.9ZM67.6 89.35H117.4V81.05H67.6V89.35ZM67.6 101.8H117.4V93.5H67.6V101.8ZM51 60.3C51 58.0987 51.8745 55.9876 53.431 54.431C54.9876 52.8745 57.0987 52 59.3 52H125.7C127.901 52 130.012 52.8745 131.569 54.431C133.126 55.9876 134 58.0987 134 60.3V110.1C134 112.301 133.126 114.412 131.569 115.969C130.012 117.526 127.901 118.4 125.7 118.4H67.6L51 135V60.3Z"
                    fill="#db2777"
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
