import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Col, Row, Spin } from "antd";

import LookCard from "./LookCard/LookCard";
import LookForm from "./LookForm/LookForm";
import AuthContext from "../../context/auth-context";

import "./Looks.css";


const LooksPage = () => {

  const [looks, setLooks] = useState([]);
  const [isOutOfDate, setIsOutOfDate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const context = useContext(AuthContext);

  useEffect(() => {
    loadLooks();
  }, [isOutOfDate])

  const loadLooks = () => {
    const requestBody = {
      query: `
            query {
                looks {
                  _id
                  title
                  active
                  favorite
                  mediaUrlThumb
                }
              }
              `,
    };

    async function fetchLooks(token) {
      const response = await axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Unauthenticated!");
      }
      const looks = await response.data;
      return looks;
    }
    // fetch Looks
    fetchLooks(context.token).then((resData) => {
      const looks = resData.data.looks;
      setLooks(looks);
      setIsLoading(false);
      setIsOutOfDate(false);
    }
    ).catch(error => {
      console.log(error.message);
      setError(error.message);
    });
  };

  const lookList = looks.map(look => {
    return (<Col key={look._id}>
      <LookCard
        look={look}
        token={context.token}
        setIsOutOfDate={setIsOutOfDate}
      />
    </Col>);
  })

  return (
    <div>
      { error !== null ?
          <div className="looks__spinner">
            error message: {error}
          </div>
        :
        isLoading ?
          <div className="looks__spinner">
            <Spin size="large" />
          </div>
          :
          (<Row justify={"space-around"}>
            <Col>
              <LookForm
                token={context.token}
                setIsOutOfDate={setIsOutOfDate}
              />
            </Col>
            {lookList}
          </Row>)
      }
    </div>
  );
}


export default LooksPage;