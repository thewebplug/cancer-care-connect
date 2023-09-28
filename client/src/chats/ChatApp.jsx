import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import Login from "./Login";
import Users from "./Users";
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from "firebase/database";
import "../styles/components/ChatApp.css";
// import HeroBar from "../shared/HeroBar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
// import Headerv3 from "../Headerv3";
// import axios from "axios";
// import { LoadingLargeIcon } from '../../icons'


export default function ChatApp() {
  const dispatch = useDispatch();
  const pathname = useLocation();
  const { auth, chatReducerStyle, currentFriend, desktopChat } = useSelector((state) => ({ ...state }));
  const { userInfo } = auth;
  const [indexes, setIndexes] = useState({
    myIndex: -1,
    friendIndex: -1,
    myData: {},
  });
  
  const [currentPage, setCurrentPage] = useState("login");

  // const avatarPic = useState('');
  const [users, setUsers] = useState([]);
  const [userToAdd, setUserToAdd] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myData, setMyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userFriend, setUserFriend] = useState(null);
  const [myFriend, setMyFriend] = useState(null);
  // const {decoded, userInfo} = useContext(AuthContext);
  const [userId2, setUserId2] = useState("");
  const [username2, setUsername2] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [id, setId] = useState(userInfo?.id);
  // const [MessageId, setMessageId] = useState(currentFriend?.messageId);
  // const [MessageUsername, setMessageUsername] = useState(currentFriend?.messageLastName);
  // const [MessageFirstName, setMessageFirstName] = useState(currentFriend?.messageFirstName);
  // const [MessageLastName, setMessageLastName] = useState(currentFriend?.messageLastName);
  // const [MessageStoreName, setMessageStoreName] = useState(currentFriend?.messageStoreName);
  // const [MessageProfilePic, setMessageProfilePic] = useState(currentFriend?.messageProfilePic);
  // const [productName, setProductName] = useState(currentFriend?.productName);
  // const [productImage, setProductImage] = useState(currentFriend?.productImage);
  // const [productDetail, setProductDetail] = useState(currentFriend?.productDetail);
  // const [productWeight, setProductWeight] = useState(currentFriend?.productWeight);
  // const [productMetrics, setProductMetrics] = useState(currentFriend?.productMetrics);
  // const [productPrice, setProductPrice] = useState(currentFriend?.productPrice);
  // const [productSlug, setProductSlug] = useState(currentFriend?.productSlug);
  // const [productId, setProductId] = useState(currentFriend?.productId);
  // const [navFrom, setNavFrom] = useState(currentFriend?.navFrom);
  const [chatLoading, setChatLoading] = useState(false);
  // const route = useRoute();
  const database = getDatabase();


  const MessageId = currentFriend?.messageId;
  // const MessageUsername = currentFriend?.messageUserName;
  const avatar = null;
  const MessageFirstName = currentFriend?.messageFirstName;
  const MessageLastName = currentFriend?.messageLastName;
  // const MessageStoreName = currentFriend?.messageStoreName;
  // const MessageProfilePic = currentFriend?.messageProfilePic;
  // const productName = currentFriend?.productName;
  // const productId = currentFriend?.productId;
  // const productImage = currentFriend?.productImage;
  // const productDetail = currentFriend?.productDetail;
  // const productWeight = currentFriend?.productWeight;
  // const productMetrics = currentFriend?.productMetrics;
  // const productPrice = currentFriend?.productPrice;
  // const productSlug = currentFriend?.productSlug;
  // const quantity = currentFriend?.quantity;
  // const amount = currentFriend?.amount;
  // const totalPrice = currentFriend?.totalPrice;
  // const lastPrice = currentFriend?.lastPrice;
  // const negotiable = currentFriend?.negotiable;

  console.log('currentFriend9090', currentFriend);
  
  const navFrom = currentFriend?.navFrom;

  const [userer, setUser] = useState("");

  useEffect( () => {
    // setMessageFirstName(  currentFriend?.messageFirstName)
    // setMessageId( currentFriend?.messageId)
    // setMessageLastName( currentFriend?.messageLastName)
    // setMessageUsername( currentFriend?.messageLastName)
    // setMessageStoreName(currentFriend?.messageStoreName)
    // setProductName(currentFriend?.productName)
    // setProductImage(currentFriend?.productImage)
    // setProductDetail(currentFriend?.productDetail)
    // setProductWeight(currentFriend?.productWeight)
    // setProductMetrics(currentFriend?.productMetrics)
    // setProductPrice(currentFriend?.productPrice)
    // setProductSlug(currentFriend?.productSlug)
    // setProductId(currentFriend?.productId)
    // setMessageProfilePic(currentFriend?.messageProfilePic)
    // setNavFrom(currentFriend?.navFrom)
    // console.log('desktopChat', desktopChat)
    // console.log('currentFriend?.messageFirstName', currentFriend?.messageFirstName)
    // console.log('currentFriend?.messageId', currentFriend?.messageId)
    // console.log('currentFriend?.messageLastName', currentFriend?.messageLastName)
    // if(currentFriend?.runChat) {
      onLogin()
    // }
    
  }, [currentFriend])


  useEffect(() => {
    onMyData()
  }, [myData, userData])

 

  useEffect(() => {
    // onLogin();
    if (pathname?.pathname === "/messages") {
      dispatch({
        type: "CHAT_EXPAND_TRUE",
      });
    } else {
      dispatch({
        type: "SET_MENU_VISIBLE",
        payload: false,
      });
      dispatch({
        type: "CHAT_CLOSED",
      });
    }
  }, [pathname]);
  // const getUser = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API}/users/me`, {
  //       headers: {
  //         Authorization: `Bearer ${auth.token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setUser(res.data.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getUsersLL();
  // }, []);

  const getUsersLL = async () => {
    const database = await getDatabase();

    // console.log('myData', myData)

    const myUserRef = ref(database, `users/${userInfo?.id}`);
      onValue(myUserRef, snapshot => {
        const data = snapshot.val();
        // console.log("DATA FRIENDSSSSS", data)
        setUsers(data?.friends);
        setMyData(prevData => ({
          ...prevData,
          friends: data?.friends,
        }));
      });
  }

  const findUser = async (name) => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${name}`));

    const user = mySnapshot.val();
    return user ? user : null;
  };

  const onLogin = async () => {
    console.log('here!!!!!!!!!!!!11');
    // setChatLoading(true)
    try {
      const database = getDatabase();
      
      //first check if the user registered before
      // console.log("user", user)
      const firstName = userInfo?.firstname;
      const lastName = userInfo?.lastname;
      const storeName = userInfo?.storeName || null;
      const profilePic = userInfo?.profilePicUrl?.url || null;
      setCreatedAt(Date.now());
      setUpdatedAt(Date.now());
      // console.log("WE GOT THE ID", MessageId)
      const user = await findUser(userInfo.id);
      const user2 = await findUser(MessageId);
      console.log("WE GOT THE USER2", user2)
      console.log("WE GOT THE USER", user)


        //create a new user if not registered
        if (!!user) {
          setMyData(user);
        } else {
          console.log('i get aljazeera');
          const newUserObj = {
            id: userInfo?.id,
            firstName,
            lastName,
            // storeName,
            // username: userInfo?.username,
            avatar: profilePic,
            createdAt,
            updatedAt,
          };
console.log('vino', userInfo?.id);
console.log('newUserObj', newUserObj);
          set(ref(database, `users/${userInfo?.id}`), newUserObj);
          setMyData(newUserObj);
          
        }
     

        // Check if user 2 exist or Create User 2
        //  if(MessageId) {
            if (user2) {
            setUserData(user2);
          } else {
            const newUserObj = {
              id: MessageId,
              firstName: MessageFirstName,
              lastName: MessageLastName,
              // MessageStoreName,
              // username: MessageUsername,
              // avatar: MessageProfilePic,
              createdAt,
              updatedAt,
            };


            set(ref(database, `users/${MessageId.toString()}`), newUserObj);
            setUserData(newUserObj);
          }
        
        // console.log("MessageId", MessageId)
        if (MessageId === userInfo?.id) {
          // don't let user add himself
          // console.log("The same user Abort");
          return;
        }

        // set friends list change listener
     
// }
       
        // End Add User

      

      // setSelectedUser(user2);
     
    } catch (error) {
      console.error(error);
    }
    // setChatLoading(false)

    
  };


  const onMyData = async () => {
    // setChatLoading(true)
    // console.log("rannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnNNNNNNNNNNNNNNNNNNNNNNNNNNN")
    console.log('mydataopop', myData);
    console.log('userData', userData);
    if(await myData?.firstName){
      let newChatroomId;
      // console.log("MY DATAAAAAA PANDAAAAAAAAAAAAAAAAAAAA", myData)
      // console.log("USER DATAAAAAA PANDAAAAAAAAAAAAAAAAAAAA", userData)
      const index = myData?.friends?.findIndex((f) => f?.id === MessageId);
      const myIndex = userData?.friends?.findIndex((f) => f?.id === userInfo?.id);
      console.log('index', index);
      console.log('myIndex', myIndex);

      console.log("index", index)
      console.log("myIndex", myIndex)
      // console.log("userData?.friends[myIndex]", userData?.friends[myIndex])
      if (myData?.friends && index > -1) {
        // console.log('FIRST');
        setIndexes((p) => {
          p.friendIndex = index;
          p.myIndex = myIndex;
          p.myData = userData?.friends[myIndex];
          return p;
        });

        // const findFriend = myData?.friends?.find((f) => f?.id === MessageId);
        setSelectedUser(myData?.friends[index]);
        newChatroomId = myData?.friends[index]?.chatroomId;
        // if (navFrom === "productPage") {
        //   // console.log("from productPage");
        //   const database = getDatabase();
        //   // console.log('wetin i dey find', quantity)
        //   update(ref(database, `chatRooms/${newChatroomId}`), {
        //     productDetails: {
        //       MessageId,
        //       productId,
        //       productSlug,
        //       productImage,
        //       productName,
        //       productDetail,
        //       quantity,
        //       amount,
        //       totalPrice,
        //       lastPrice,
        //       negotiable
        //     },
        //   });
        // }
        return;
    }

   else { // create a chatroom and store the chatroom id
    // console.log('SECOND');

    const newChatroomRef = push(ref(database, "chatRooms"), {
      firstUser: userInfo?.id,
      secondUser: MessageId,
      messages: [],
      createdAt,
      updatedAt,
      // productDetails: {
      //   MessageId,
      //   productId,
      //   productSlug,
      //   productImage,
      //   productName,
      //   productDetail,
      //   quantity: quantity || "",
      //   amount: amount || "",
      //   totalPrice: totalPrice || "",
      //   lastPrice: lastPrice || "",
      //   negotiable: negotiable || ""
      // },
    });

     newChatroomId = newChatroomRef?.key;

    const userFriends = userData?.friends || [];

    const userDataId = userInfo?.id;
    // const userDataUsername = userInfo?.username;
    const userDataFirstName = userInfo?.firstname;
    const userDataLastName = userInfo?.lastname;
    // const userDataStoreName = userInfo?.storeName || null;
    const userProfilePic = userInfo?.profilePicUrl?.url || null;

    //join myself to this user friend list
    update(ref(database, `users/${MessageId}`), {
      friends: [
        ...userFriends,
        {
          id: userDataId,
          // username: userDataUsername,
          firstName: userDataFirstName,
          lastName: userDataLastName,
        //   storeName: userDataStoreName,
        //   avatar: userProfilePic,
          MessageId: MessageId,
        //   productId: productId,
        //   productName: productName,
        //   productImage: productImage,
        //   productDetail: productDetail,
        //   productWeight: productWeight,
        //   productMetrics: productMetrics,
        //   productPrice: productPrice,
        //   productSlug: productSlug,
        //   quantity: quantity || "",
        // amount: amount || "",
        // totalPrice: totalPrice || "",
        // lastPrice: lastPrice || "",
        // negotiable: negotiable || "",
          chatroomId: newChatroomId,
          updatedAt,
          status: 0,
          lastMessage: false,
        },
      ],
    });

    // Add User2 as friend
    const myFriends = myData?.friends || [];
    //add this user to my friend list
    setIndexes((p) => {
      p.friendIndex = myFriends?.length;
      p.myIndex = userFriends?.length;
      p.myData = {
        id: userDataId,
        // username: userDataUsername,
        firstName: userDataFirstName,
        lastName: userDataLastName,
        // storeName: userDataStoreName,
        avatar: null,
        // product details
        MessageId: MessageId,
        // productId: productId,
        // productName: productName,
        // productImage: productImage,
        // productDetail: productDetail,
        // productWeight: productWeight,
        // productMetrics: productMetrics,
        // productPrice: productPrice,
        // productSlug: productSlug,
        // quantity: quantity || "",
        // amount: amount || "",
        // totalPrice: totalPrice || "",
        // lastPrice: lastPrice || "",
        // negotiable: negotiable || "",
        // end
        chatroomId: newChatroomId,
        updatedAt,
        status: 1,
        lastMessage: false,
      };
      return p;
    });

    // Add User2 as friend
    update(ref(database, `users/${userInfo?.id}`), {
      friends: [
        ...myFriends,
        {
          id: MessageId,
          // username: MessageUsername,
          firstName: MessageFirstName,
          lastName: MessageLastName,
          // storeName: MessageStoreName,
          // avatar: null,
          // product details
          MessageId: MessageId,
        //   productId: productId,
        //   productName: productName,
        //   productImage: productImage,
        //   productDetail: productDetail,
        //   productWeight: productWeight,
        //   productMetrics: productMetrics,
        //   productPrice: productPrice,
        //   productSlug: productSlug,
        //   quantity: quantity || "",
        // amount: amount || "",
        // totalPrice: totalPrice || "",
        // lastPrice: lastPrice || "",
        // negotiable: negotiable || "",
          // end
          chatroomId: newChatroomId,
          updatedAt,
          status: 1,
          lastMessage: false,
        },
      ],
    });

    setSelectedUser({
      id: MessageId,
      // username: MessageUsername,
      firstName: MessageFirstName,
      lastName: MessageLastName,
      // storeName: MessageStoreName,
      avatar: null,
      // product details
      MessageId: MessageId,
      // productId: productId,
      // productName: productName,
      // productImage: productImage,
      // productDetail: productDetail,
      // productWeight: productWeight,
      // productMetrics: productMetrics,
      // productPrice: productPrice,
      // productSlug: productSlug,
      // quantity: quantity || "",
      // amount: amount || "",
      // totalPrice: totalPrice || "",
      // lastPrice: lastPrice || "",
      // negotiable: negotiable || "",
      // end
      chatroomId: newChatroomId,
      updatedAt,
      status: 1,
      lastMessage: false,
    });
  }
  }
  // console.log("MessageFirstName", MessageFirstName)

   if (!!MessageFirstName) {
        setCurrentPage("chat");
      } else {
        // setCurrentPage('chat');
        setCurrentPage("users");
      }
      // setChatLoading(false)
  }



 


  // console.log("chatReducerStyle", chatReducerStyle);

 



  const onAddFriend = async (name) => {
    try {
      //find user and add it to my friends and also add me to his friends
      const database = await getDatabase();

      const user = await findUser(name);

      // console.log(user);

      //create a new user if not registered

      if (user) {
        if (user?.username === myData?.id) {
          // don't let user add himself
          // console.log("The same user Abort");
          return;
        }

        // console.log('Do we have myData????', myData)


        if (
          myData?.friends &&
          !!myData?.friends.find((f) => f?.id === MessageId)
        ) {
          // don't let user add a user twice
          return;
        }

        // create a chatroom and store the chatroom id

        const newChatroomRef = push(ref(database, "chatRooms"), {
          firstUser: myData?.id,
          secondUser: user?.username,
          messages: [],
          createdAt,
          updatedAt,
        });

        const newChatroomId = newChatroomRef?.key;

        const userFriends = user?.friends || [];
        //join myself to this user friend list
        update(ref(database, `users/${user?.username}`), {
          friends: [
            ...userFriends,
            {
              // id: myData?.id,
              username: myData?.username,
              avatar: myData?.avatar,
              chatroomId: newChatroomId,
              updatedAt,
              status: 0,
            },
          ],
        });

        const myFriends = myData?.friends || [];
        //add this user to my friend list
        // console.log(myData?.username);
        update(ref(database, `users/${myData?.id}`), {
          friends: [
            ...myFriends,
            {
              // id: user.id,
              username: users?.username,
              avatar: users?.avatar,
              chatroomId: newChatroomId,
              updatedAt,
              status: 0,
            },
          ],
        });
      }
    } catch (error) {
      // console.log("User does not exist");
      console.error(error);
    }
  };

  const onBack = () => {
    setCurrentPage("users");
    dispatch({
      type: "CHAT_EXPAND_FALSE",
    });
    // dispatch({
    //   type: "CLEAR_CURRENT_FRIEND",
    // });
  };

  const onBackMobile = () => {
    setCurrentPage("users");
    // dispatch({
    //   type: "CLEAR_CURRENT_FRIEND",
    // });
  };

  // console.log('currentpage', currentPage)
  // console.log('currentFriend', currentFriend)

  switch (currentPage) {
    case "login":
      return (
        <div className={!chatReducerStyle.visible ? "" : "chat-modal"}>
                {/* <button onClick={() => onLogin()}>Click Me!!!!</button> */}

          <Users
            onLogin={onLogin}
            users={users}
            getUsersLL={getUsersLL}
            userToAdd={userToAdd}
            setUserToAdd={setUserToAdd}
            onAddFriend={onAddFriend}
            setCurrentPage={setCurrentPage}
            setSelectedUser={setSelectedUser}
            myData={myData}
                            setMyData={setMyData}
                            setChatLoading={setChatLoading}
          />
        </div>
      );
    case "users":
      
      return (
        <div
          className={
            !!chatReducerStyle.expand
              ? "chat-modal-expanded"
              : !chatReducerStyle.visible
              ? ""
              : "chat-modal"
          }
        >
          {/* <button onClick={() => onLogin()}>Click Me!!!!</button> */}
          {/* {chatLoading && <div className="loading-chat"><LoadingLargeIcon /></div>} */}
          {!!chatReducerStyle.expand && (
            <div className="chat-app-header-container">
              {/* <Headerv3 /> */}
            </div>
          )}
          {!!chatReducerStyle.expand && (
            <div className="chat-app-main-inner-user">
              <div className="chat-hero-bar_container-user">
                {/* <HeroBar /> */}
              </div>

              <Users
                users={users}
                userToAdd={userToAdd}
                setUserToAdd={setUserToAdd}
                onAddFriend={onAddFriend}
                getUsersLL={getUsersLL}
                 setCurrentPage={setCurrentPage}
            setSelectedUser={setSelectedUser}
            onLogin={onLogin}
            myData={myData}
                            setMyData={setMyData}
                            setChatLoading={setChatLoading}

              />
            </div>
          )}
          {!chatReducerStyle.expand && (
            <Users
              users={users}
              userToAdd={userToAdd}
              setUserToAdd={setUserToAdd}
              onAddFriend={onAddFriend}
              getUsersLL={getUsersLL}
               setCurrentPage={setCurrentPage}
            setSelectedUser={setSelectedUser}
            myData={myData}
            onLogin={onLogin}
                            setMyData={setMyData}
                            setChatLoading={setChatLoading}
            />
          )}
        </div>
      );
    case "chat":
      return (
        
        <div
        className={
          !chatReducerStyle.visible
          ? ""
              : !!chatReducerStyle.expand
              ? "chat-modal-expanded"
              : "chat-modal"
          }
          >
          {/* {chatLoading && <div className="loading-chat"><LoadingLargeIcon /></div> } */}
          {!!chatReducerStyle.expand && (
            <div className="header_absolute">
              <Header />
              <div className="header-divider"></div>
            </div>
          )}

          {!chatReducerStyle.expand && (
            <>
              <Chat
                myData={myData}
                selectedUser={selectedUser}
                onBack={onBack}
                onBackMobile={onBackMobile}
                setChatLoading={setChatLoading}
                indexes={indexes}
              />
              <Users
                users={users}
                userToAdd={userToAdd}
                setUserToAdd={setUserToAdd}
                onAddFriend={onAddFriend}
                getUsersLL={getUsersLL}
                 setCurrentPage={setCurrentPage}
            setSelectedUser={setSelectedUser}
                            myData={myData}
                            onLogin={onLogin}
                            setMyData={setMyData}
                            setChatLoading={setChatLoading}

              />
            </>
          )}

          {!!chatReducerStyle.expand && (
            <div className="chat-app-main-inner">
              <div className="chat-hero-bar_container">
                {/* <HeroBar /> */}
              </div>
              <div className="chat-app-users-container">
                <Users
                  users={users}
                  userToAdd={userToAdd}
                  setUserToAdd={setUserToAdd}
                  onAddFriend={onAddFriend}
                   setCurrentPage={setCurrentPage}
            setSelectedUser={setSelectedUser}
            myData={myData}
            onLogin={onLogin}
                            setMyData={setMyData}
                            setChatLoading={setChatLoading}
                />
              </div>
              <Chat
                myData={myData}
                selectedUser={selectedUser}
                onBack={onBack}
                onBackMobile={onBackMobile}
                setChatLoading={setChatLoading}
                indexes={indexes}
              />
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}
