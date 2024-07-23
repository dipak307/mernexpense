import React, { useEffect,useState } from "react";
import styled from "styled-components";
import avatar from "../../img/usericon.png";
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/Icons";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const Navigation = ({active,setActive}) => {
        const Navigate=useNavigate();
        const [setData,setUserData]=useState("");
      // console.log(active);
      const logout = () => {
        localStorage.removeItem('token');
        console.log("logout button..")
        Navigate("/login");
        // setAuth(false);
    };
    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await axios.get("https://mernexpense.vercel.app/api/v1/profile", {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
              });
              // console.log(response.data.user.email)
              setUserData(response.data.user);
          } catch (error) {
              console.error("Error fetching user data:", error);
          }
      };

      fetchUserData();
  }, []);

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="img" />
        <div className="text">
          <h2>{setData.email}</h2>
          <p>{setData.id}</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li key={item.id}
                 onClick={()=>setActive(item.id)}
                 className={active === item.id ? 'active':''}
            >
                {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>

      <div className="bottom-nav">
        <li onClick={logout}>{signout} Sign Out</li>
      </div>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items{
    flex:1;
    display:flex;
    flex-direction:column;
     li{
      display:grid;
      grid-template-columns:40px auto;
      align-items:center;
      margin:.6rem 0;
      font-weight:500;
      cursor:pointer;
      transition:all .4s ease-in-out;
      color:rgba(34,34,96,.6);
      padding-left:1rem;
      position:relative;
       i{
        font-size:1.4rem;
        transition:all .4s ease-in-out;
        color:rgba(34,34,96,.6);
       }
     }
     
  }
   .active{
    color:rgba(34,34,96,1) !important;
     i{
      color:rgba(34,34,96,1) !important;
     }
     &::before{
        content:"";
        position:absolute;
        left:0;
        top:0;
        width:3px;
        height:25px;
           background: #222260;
           border-radius:0 10px 10px 0;
     }
   }
   .bottom-nav{
    cursor:pointer;
   }

`;

export default Navigation;
