import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Urls } from "../../src/routes/urls"
import { useParams } from 'react-router-dom';

function ForumID() {
    const [forum, setForum] = useState([]);

    const {id} = useParams();

    // console.error(id);
    
    useEffect(() => {
        const fetchForum = async () => {
          try {
            const response = await fetch(`${Urls?.baseUrl}${Urls?.getOtherForum}/${id}`);
    
            if (!response.ok) {
              alert("Network response was not ok");
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            setForum(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchForum();
      }, []);
  return (
    <div>
        <Header />
            <div className="mx-12 my-4">
                <h1>

                </h1>
            </div>
        <Footer />
    </div>
  )
}

export default ForumID