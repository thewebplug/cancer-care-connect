import React, { useCallback, useEffect, useState, useRef } from "react";
// import {GiftedChat} from 'react-native-gifted-chat';
import { getDatabase, get, ref, onValue, off, update } from "firebase/database";
import "../styles/components/Chat.css";
// import Avatar from "../../img/menu-avatar.png";
// import UserAvatar from "../../img/userImg.png";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Resizer from "react-image-file-resizer";
// import { LoadingLargeIcon } from "../../icons";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

export default function Chat({
  onBack,
  onBackMobile,
  myData,
  selectedUser,
  setChatLoading,
  indexes,
}) {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [lastMessage, setLastText] = useState("");
  const [selectedUserFriends, setSelectedUserFriends] = useState([]);
  const database = getDatabase();
  const [temp, setTempImage] = useState([]);
  const mediaRef = useRef(null);
  const mediaRef2 = useRef(null);
  const [productDetails, setProductDetails] = useState(null);
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const findTokenByID = async (id) => {
    const database = getDatabase();
    const notiRef = ref(database, `usersToken/${id}`);
    const data = get(notiRef);
    const usertokens = (await data).val();
    const tokens = usertokens?.tokens ? usertokens?.tokens : [];
    return tokens;
  };

  const getToToken = async (key, id) => {
    switch (key) {
      default: {
        return await findTokenByID(id);
      }
    }
  };

  const sendNotification = async ({
    myData,
    otherData,
    otherUserData,
    key,
  }) => {
    const data = [];
    const to = await getToToken(key, otherUserData.id);

    // console.log("sending noti", data, to);
    if (myData.id === otherUserData.id) {
      // console.log("Not sending to me");
      return;
    }
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        sound: "default",
        ...data,
      }),
    });
  };

  const navigate = useNavigate();
  // console.log("THE MAIN SELECTED USER", selectedUser);

  const dispatch = useDispatch();
  const pathname = useLocation();

  const { chatReducerStyle, auth, currentFriend } = useSelector((state) => ({
    ...state,
  }));
  const { userInfo } = auth;

  useEffect(() => {
    const chatroomRef = ref(database, `users/${selectedUser?.id}`);

    const fetchData = async () => {
      onValue(chatroomRef, (snapshot) => {
        const data = snapshot.val();
        setSelectedUserFriends(data?.friends);
      });
    };

    if (selectedUser?.id) {
      fetchData();
    }
    return () => off(chatroomRef);
  }, [selectedUser]);

  const handleModalCloseTwo = () => setModalOpenTwo(false);
  const handleModalOpenTwo = () => {
    setModalOpenTwo(true);
  };

  // THIS MAY SOLVE THE PROBLEM ABOVE!!!! TRY IT!!
  // useEffect(() => {
  //   const chatroomRef = ref(database, `users/${selectedUser?.id}`);

  //   const fetchData = async () => {
  //     onValue(chatroomRef, (snapshot) => {
  //       const data = snapshot.val();
  //       setSelectedUserFriends(data?.friends);
  //     });
  //   };

  //   if (selectedUser?.id) {
  //     fetchData();
  //   }
  //   return () => off(chatroomRef);
  // }, [selectedUser]);

  useEffect(() => {
    setChatLoading(true);
    const database = getDatabase();
    const chatroomRef = ref(database, `chatRooms/${selectedUser?.chatroomId}`);
    if (selectedUser?.chatroomId) {
      onValue(chatroomRef, (snapshot) => {
        const data = snapshot.val();
        setMessages(renderMessages(data?.messages));

        setProductDetails(data?.productDetails);

        // console.log('data?.productDetails', data?.productDetails);
        // if(!!currentFriend?.bidMessage) {
        //   onSend(currentFriend?.bidMessage);
        //   dispatch({
        //     type: "CLEAR_BID_MESSAGE",
        //   });
        // }
      });
    }
    setChatLoading(false);
    return () => off(chatroomRef);
  }, [selectedUser?.chatroomId]);

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();
    // console.log('selectedUser', selectedUser)

    const snapshot = await get(
      ref(database, `chatRooms/${selectedUser?.chatroomId}`)
    );

    return snapshot.val();
  }, [selectedUser?.chatroomId]);

  const renderMessages = useCallback(
    (msgs) => {
      //structure for chat library:
      // msg = {
      //   _id: '',
      //   user: {
      //     avatar:'',
      //     name: '',
      //     _id: ''
      //   }
      // }

      return msgs
        ? msgs.reverse().map((msg, index) => ({
            ...msg,
            _id: index,
            user: {
              _id: msg.sender === myData?.id ? myData?.id : selectedUser?.id,
              avatar:
                msg.sender === myData?.username
                  ? myData?.avatar
                  : selectedUser?.avatar,
              name:
                msg.sender === myData?.username
                  ? myData?.username
                  : selectedUser?.username,
            },
          }))
        : [];
    },
    [
      myData?.avatar,
      myData?.id,
      myData?.username,
      selectedUser?.avatar,
      selectedUser?.id,
      selectedUser?.username,
    ]
  );

  // useEffect(() => {
  //   //load old messages
  //   const loadData = async () => {
  //     const myChatroom = await fetchMessages();

  //     setMessages(renderMessages(myChatroom?.messages).reverse());
  //   };

  //   loadData();

  //   // set chatroom change listener
  //   const database = getDatabase();
  //   const chatroomRef = ref(database, `chatRooms/${selectedUser?.chatroomId}`);
  //   onValue(chatroomRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setMessages(renderMessages(data?.messages).reverse());
  //   });

  //   return () => {
  //     //remove chatroom listener
  //     off(chatroomRef);
  //   };
  // }, [fetchMessages, renderMessages, selectedUser?.chatroomId]);

  // Image Upload
  const pickImage = (e) => {
    setUploadLoading(true);
    let file = e.target.files[0];

    // if (file) {
    //   Resizer.imageFileResizer(
    //     file,
    //     720,
    //     720,
    //     "JPEG",
    //     100,
    //     0,
    //     (uri) => {
    //       axios
    //         .post(
    //           `https://985f1i3kbb.execute-api.us-east-1.amazonaws.com/dev/v2/upload-images`,
    //           {
    //             type: "image",
    //             item: uri,
    //           },
    //           {
    //             headers: {
    //               Authorization: `Bearer ${auth ? auth.token : ""}`,
    //             },
    //           }
    //         )
    //         .then((res) => {
    //           // console.log("res", res);
    //           const data = {
    //             _id: myData?.id,

    //             image: res?.data?.url?.url,
    //             sender: myData?.id,
    //             createdAt: new Date(),
    //           };
    //           onImageSend(data);
    //           setUploadLoading(false);
    //         })
    //         .catch((err) => {
    //           setUploadLoading(false);
    //           console.log("CLOUDINARY UPLOAD ERR", err);
    //         });
    //     },
    //     "base64"
    //   );
    // }
  };

  const onImageSend = async (data) => {
    const database = getDatabase();
    // console.log("Image here!!!!!!", data);

    update(ref(database, `chatRooms/${selectedUser?.chatroomId}/messages`), {
      [messages.length]: data,
    });

    await update(ref(database, `users/${selectedUser?.id}/friends`), {
      [indexes.myIndex]: {
        ...indexes.myData,
        updatedAt: Date.now(),
        status: 0,
        lastMessage: "Photo",
      },
    });

    await update(ref(database, `users/${myData.id}/friends`), {
      [indexes.friendIndex]: {
        ...selectedUser,
        updatedAt: Date.now(),
        status: 1,
        lastMessage: "Photo",
      },
    });
  };

  const onSend = async (msg) => {
    // await sendNotification({
    //   key: "newMessage",
    //   otherUserData: selectedUser,
    //   myData,
    //   otherData: { msg },
    // });

    const database = getDatabase();

    await update(
      ref(database, `chatRooms/${selectedUser?.chatroomId}/messages`),
      {
        [messages.length]: {
          text: msg,
          status: 0,
          sender: myData.id,
          createdAt: Date.now(),
        },
      }
    );

    await update(ref(database, `users/${selectedUser?.id}/friends`), {
      [indexes.myIndex]: {
        ...indexes.myData,
        updatedAt: Date.now(),
        status: 0,
        lastMessage: msg,
      },
    });

    await update(ref(database, `users/${myData?.id}/friends`), {
      [indexes.friendIndex]: {
        ...selectedUser,
        updatedAt: Date.now(),
        status: 1,
        lastMessage: msg,
      },
    });

    setChat("");
  };

  // useEffect(() => {
  //   const chatCont = document.querySelector(".chat-main");

  //   chatCont.scrollTo(0, document.scrollHeight);
  // }, []);

  const handleExpand = () => {
    dispatch({
      type: "CHAT_EXPAND_TRUE",
    });

    navigate("/messages");

    // console.log("chatReducerStyle", chatReducerStyle);
  };

  const handleShrink = () => {
    dispatch({
      type: "CHAT_EXPAND_FALSE",
    });

    // console.log("chatReducerStyle", chatReducerStyle);
  };

  // console.log('messages', messages)
  // useEffect(() => {
  //   const chatroomRef = ref(database, `users/${selectedUser?.id}`);

  //   const fetchData = async () => {
  //     onValue(chatroomRef, (snapshot) => {
  //       const data = snapshot.val();
  //       setSelectedUserFriends(data?.friends);
  //     });
  //   };

  //   if (selectedUser?.id) {
  //     fetchData();
  //   }
  //   return () => off(chatroomRef);
  // }, [selectedUser]);

  const chatRef = useRef(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }

    // return () => off(chatRef);
  });

  return (
    <div className="chat-container-expand-container">
      {chatReducerStyle.visible && (
        <div
          className={
            !!chatReducerStyle.expand
              ? "chat-container-expand"
              : "chat-container"
          }
        >
          {/* <svg
        onClick={onBack}
        className="actionBar"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
     </svg> */}

          <div className="actionBar">
            <div className="chat-flex">
              {/* <img
                src={selectedUser?.avatar ? selectedUser?.avatar : UserAvatar}
                className="chat-avatar"
                alt="logged in user's avatar"
              /> */}
              <div>
                <div className="chat-flex">
                  <div className="chat-user-name">
                    {selectedUser?.storeName
                      ? selectedUser?.storeName
                      : `${selectedUser?.firstName} ${selectedUser?.lastName}`}
                  </div>
                </div>
                <div className="chat-user-username">
                  Username: {selectedUser?.username}
                </div>
              </div>
            </div>
            <div className="chat-flex">
              {/* <div>
              <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="https://www.w3.org/2000/svg">
<rect x="0.5" width="43" height="34" rx="7" fill="#FDE8E5"/>
<path d="M18.0352 29.391L31.079 10.6331L8.5 14.124L12.2081 20.0612L25.9901 13.8115L14.3271 23.4538L18.0352 29.391Z" fill="black"/>
</svg>
<div className="chat_pay-vendor">Pay Vendor</div>

              </div> */}
              <a
                className="pointer"
                href={`/wallet/${selectedUser?.username}`}
                // onClick={() => {
                //   history.push(`/profile/${selectedUser?.id}`);
                //   dispatch({
                //     type: "SET_MENU_VISIBLE",
                //     payload: false,
                //   });
                //   dispatch({
                //     type: "CHAT_CLOSED",
                //   });
                // }}
              >
                <svg
                  width="44"
                  height="34"
                  viewBox="0 0 44 34"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <rect x="0.5" width="43" height="34" rx="7" fill="#FDE8E5" />
                  <path
                    d="M18.0352 29.391L31.079 10.6331L8.5 14.124L12.2081 20.0612L25.9901 13.8115L14.3271 23.4538L18.0352 29.391Z"
                    fill="black"
                  />
                </svg>
                <div className="chat_pay-vendor">Pay Vendor</div>
              </a>
              {pathname?.pathname !== "/messages" && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                  className="chat-expand"
                  onClick={() => {
                    dispatch({
                      type: "SET_MENU_VISIBLE",
                      payload: false,
                    });
                    dispatch({
                      type: "CHAT_CLOSED",
                    });
                    navigate("/messages");
                  }}
                >
                  <path
                    d="M13 1H19V7"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 19H1V13"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 1L12 8"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1 19L8 12"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
              <a href={`/profile/${selectedUser?.id}`}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
                className="chat-info pointer"
                
              >
                <path
                  d="M10.5 20C15.7467 20 20 15.7467 20 10.5C20 5.25329 15.7467 1 10.5 1C5.25329 1 1 5.25329 1 10.5C1 15.7467 5.25329 20 10.5 20Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.5 14.3V10.5"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.5 6.7002H10.5095"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              </a>

              {pathname?.pathname !== "/messages" && (
                <svg
                  onClick={onBack}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                  className="chat-close"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}

              <svg
                onClick={onBackMobile}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
                className="chat-close-expand"
              >
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="chat-main" ref={chatRef}>
            {/* <GiftedChat
        messages={messages}
        onSend={newMessage => onSend(newMessage)}
        user={{
          _id: myData.username,
        }}
      /> */}

            <div
              className="preview_container"
              onClick={() => {
                navigate(`/product/${productDetails?.productId}`);
                dispatch({
                  type: "SET_MENU_VISIBLE",
                  payload: false,
                });
                dispatch({
                  type: "CHAT_CLOSED",
                });
              }}
            >
              <div className="preview">
                <img
                  src={productDetails?.productImage}
                  className="preview_image"
                />
                <div className="preview_group">
                  <div className="preview_title">
                    {productDetails?.productName}
                  </div>
                  <div>
                    {productDetails?.productDetail?.length > 100
                      ? `${productDetails?.productDetail?.slice(0, 99)}...`
                      : productDetails?.productDetail}
                  </div>
                  {productDetails?.quantity && <div>Quantity Requested: <span className="product-green-bold">{productDetails?.quantity}</span></div>}
                  {productDetails?.amount && <div>Amount Priced: <span className="product-green-bold">{productDetails?.amount}</span></div>}
                 {productDetails?.totalPrice && <div>Total: <span className="product-green-bold">{productDetails?.totalPrice}</span></div>}
                </div>
              </div>
            </div>
            <Modal
              open={modalOpenTwo}
              onClose={() => handleModalCloseTwo()}
              className="image-modal-chat"
            >
              <>
                <div className="modalCloseIcon-chat">
                  <CloseIcon
                    className="modalCloseIcon-inner-chat"
                    fontSize="large"
                    onClick={() => handleModalCloseTwo()}
                  />
                </div>

                <img
                  src={selectedImage}
                  // src={CommentAvatar}
                  className="image-modal_inner-chat"
                  alt="Post"
                />
              </>
            </Modal>
            <div className="messages_map">
              {messages?.map((message) => (
                <div
                  className={
                    message?.user?._id === myData.id ? "sent" : "received"
                  }
                >
                  <div
                    className={
                      message?.user?._id === myData.id
                        ? "sent-inner"
                        : "received-inner"
                    }
                  >
                    {message?.image ? (
                      <img
                        className="chat-image"
                        src={message?.image}
                        onClick={(e) => {
                          handleModalOpenTwo();
                          setSelectedImage(e.target.currentSrc);
                        }}
                        style={{ pointerEvents: "all" }}
                      />
                    ) : (
                      message?.text
                    )}
                  </div>
                </div>
              ))}

              {uploadLoading && (
                <div className="sent">
                  <div className="sent-inner">
                    <div className="loading_container">
                      <LoadingLargeIcon />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="chat-input-container">
            <label className="mr10">
              <svg
                width="26"
                height="20"
                viewBox="0 0 32 26"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5929 14.3356C20.5929 15.7157 20.079 17.0393 19.1641 18.0152C18.2492 18.991 17.0083 19.5393 15.7144 19.5393C14.4206 19.5393 13.1797 18.991 12.2648 18.0152C11.3499 17.0393 10.8359 15.7157 10.8359 14.3356C10.8359 12.9555 11.3499 11.6319 12.2648 10.656C13.1797 9.68008 14.4206 9.13184 15.7144 9.13184C17.0083 9.13184 18.2492 9.68008 19.1641 10.656C20.079 11.6319 20.5929 12.9555 20.5929 14.3356Z"
                  fill="#017019"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.00631 4.96767C2.97123 4.96767 1.97854 5.40627 1.24662 6.18698C0.514702 6.96769 0.103516 8.02657 0.103516 9.13066L0.103516 21.6196C0.103516 22.7237 0.514702 23.7826 1.24662 24.5633C1.97854 25.344 2.97123 25.7826 4.00631 25.7826H27.4231C28.4582 25.7826 29.4509 25.344 30.1828 24.5633C30.9147 23.7826 31.3259 22.7237 31.3259 21.6196V9.13066C31.3259 8.02657 30.9147 6.96769 30.1828 6.18698C29.4509 5.40627 28.4582 4.96767 27.4231 4.96767H25.1361C24.1011 4.96744 23.1085 4.52868 22.3768 3.74792L20.761 2.02444C20.0293 1.24368 19.0368 0.804923 18.0017 0.804688H13.4277C12.3927 0.804923 11.4001 1.24368 10.6684 2.02444L9.05263 3.74792C8.32089 4.52868 7.32836 4.96744 6.29335 4.96767H4.00631ZM4.98201 9.13066C5.24079 9.13066 5.48896 9.02101 5.67194 8.82583C5.85492 8.63065 5.95771 8.36593 5.95771 8.08991C5.95771 7.81389 5.85492 7.54917 5.67194 7.35399C5.48896 7.15882 5.24079 7.04917 4.98201 7.04917C4.72324 7.04917 4.47507 7.15882 4.29209 7.35399C4.10911 7.54917 4.00631 7.81389 4.00631 8.08991C4.00631 8.36593 4.10911 8.63065 4.29209 8.82583C4.47507 9.02101 4.72324 9.13066 4.98201 9.13066ZM22.5446 14.3344C22.5446 16.2666 21.825 18.1196 20.5442 19.4858C19.2633 20.8521 17.5261 21.6196 15.7147 21.6196C13.9033 21.6196 12.1661 20.8521 10.8852 19.4858C9.60439 18.1196 8.88481 16.2666 8.88481 14.3344C8.88481 12.4022 9.60439 10.5492 10.8852 9.18296C12.1661 7.81671 13.9033 7.04917 15.7147 7.04917C17.5261 7.04917 19.2633 7.81671 20.5442 9.18296C21.825 10.5492 22.5446 12.4022 22.5446 14.3344Z"
                  fill="#017019"
                />
              </svg>
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={pickImage}
                ref={mediaRef}
                capture
              />
            </label>
            <label>
              <svg
                width="17"
                height="19"
                viewBox="0 0 23 25"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
              >
                <path
                  d="M20.7026 10.2976L11.3262 20.7692C10.4613 21.7352 9.24798 22.318 7.95329 22.3895C6.65861 22.4609 5.38857 22.0151 4.42257 21.1501C3.45658 20.2852 2.87376 19.0719 2.80232 17.7772C2.73088 16.4825 3.17668 15.2125 4.04165 14.2465L14.2334 2.86432C14.774 2.26058 15.5323 1.89631 16.3415 1.85166C17.1507 1.80701 17.9444 2.08564 18.5482 2.62624C19.1519 3.16685 19.5162 3.92515 19.5608 4.73433C19.6055 5.54351 19.3269 6.33728 18.7863 6.94103L10.2252 16.502C10.0089 16.7435 9.70563 16.8892 9.38196 16.9071C9.05828 16.925 8.74077 16.8135 8.49928 16.5973C8.25778 16.381 8.11207 16.0777 8.09421 15.754C8.07635 15.4304 8.1878 15.1129 8.40404 14.8714L16.1498 6.22092L14.7839 4.99791L7.03819 13.6483C6.49758 14.2521 6.21896 15.0459 6.2636 15.855C6.30825 16.6642 6.67252 17.4225 7.27627 17.9631C7.88001 18.5037 8.67379 18.7824 9.48296 18.7377C10.2921 18.6931 11.0504 18.3288 11.591 17.725L20.1521 8.16404C21.0171 7.19804 21.4629 5.928 21.3915 4.63332C21.32 3.33863 20.7372 2.12535 19.7712 1.26039C18.8052 0.395418 17.5352 -0.0503817 16.2405 0.021056C14.9458 0.0924938 13.7325 0.675318 12.8675 1.64131L2.67579 13.0235C1.48646 14.3517 0.873482 16.098 0.97171 17.8782C1.06994 19.6584 1.87132 21.3267 3.19956 22.516C4.52781 23.7053 6.27411 24.3183 8.0543 24.2201C9.83449 24.1218 11.5028 23.3205 12.6921 21.9922L22.0685 11.5206L20.7026 10.2976Z"
                  fill="#017019"
                />
              </svg>
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={pickImage}
                ref={mediaRef}
              />
            </label>
            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                if (chat.trim() !== "") {
                  onSend(chat);
                }
              }}
            >
              <input
                type="text"
                className="chat-input-inner"
                name="chat"
                onChange={(e) => setChat(e.target.value)}
                placeholder="send a message"
                value={chat}
              />
            </form>

            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
              onClick={() => {
                if (chat.trim() !== "") {
                  onSend(chat);
                }
              }}
              className="chat-send-button pointer"
            >
              <g filter="url(#filter0_d_1019_10340)">
                <circle cx="30" cy="30" r="20" fill="#017019" />
              </g>
              <path
                d="M29.7986 42.9987L41.2005 23.1998L19 28.5977L23.1995 34.1981L36.4002 26.7994L25.5991 37.3983L29.7986 42.9987Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_d_1019_10340"
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="5" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1019_10340"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1019_10340"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
