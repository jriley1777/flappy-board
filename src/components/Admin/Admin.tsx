import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMessageToQueue } from "../../features/messagesSlice";
import * as Constants from '../../constants/index';

const StyledAdmin = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AdminHeader = styled.h1`
  font-size: 3rem;
  font: Inconsolata;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const AdminForm = styled.form`
  min-width: 100px;
  min-height: 200px;
  margin-top: 20px;

  @media (min-width: 768px) {
    min-width: 540px;
    min-height: 300px;
  }
`;

const FormInput = styled.input`
  border-radius: 5px;
  border: 1px solid black;
  outline: none;
  margin: 5px 0 5px 0;
  width: 100%;
  height: 2rem;
  padding-left: 10px;
  font-size: 1rem;

  @media (min-width: 768px) {
    height: 2rem;
    font-size: 1.25rem;
    padding: 20px;
  }
`;

const Admin = () => {
    const dispatch = useDispatch();
    const [ message, setMessage ] = useState("")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(message)
        if(message){
            dispatch(addMessageToQueue(message));
            setMessage("")
        }
    }
    return (
      <StyledAdmin>
        <AdminHeader> Admin </AdminHeader>
        <AdminForm onSubmit={handleSubmit}>
          <div>
            <label htmlFor="message">Add Message to Board</label>
            <FormInput
              type="text"
              placeholder="New Message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </AdminForm>
        <Link to={Constants.URLS.INDEX}>Home</Link>
      </StyledAdmin>
    );
};

export default Admin;