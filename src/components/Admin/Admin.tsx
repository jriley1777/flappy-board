import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants/index';
import firebase, { DB } from '../../utils/firebase';

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

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const AdminForm = styled.form`
  width: 100%;
  min-height: 200px;
  padding: 20px;

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
    const [ message, setMessage ] = useState("");
    const messagesDb = firebase.database().ref(DB.MESSAGES);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(message){
            messagesDb.push().set({
                text: message
            })
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