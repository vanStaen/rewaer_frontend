import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row, Spin, notification } from "antd";

import fetchLooks from './fetchLooks';

import LookCard from "./LookCard/LookCard";
import LookForm from "./LookForm/LookForm";

import "./Looks.css";

const LooksPage = () => {

  const [looks, setLooks] = useState([]);
  const [isOutOfDate, setIsOutOfDate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    LoadLooks();
  }, [isOutOfDate])

  const LoadLooks = async () => {  
    try {
      const looks = await fetchLooks();
      setLooks(looks);
      setIsLoading(false);
      setIsOutOfDate(false);
    } catch (error) {
        console.log(error.message);
        notification.error({
          message: "Error",
          description: error.message,
          placement: "bottomRight",
        });
        setError(error.message);
    }
  }
  
  const lookList = looks.map(look => {
    return (<Col key={look._id}>
      <LookCard
        look={look}
        setIsOutOfDate={setIsOutOfDate}
      />
    </Col>);
  })

  return (
    <div>
      { error !== null ?
          <Redirect from="/looks" to="/auth" exact />
        :
        isLoading ?
          <div className="looks__spinner">
            <Spin size="large" />
          </div>
          :
          (<Row justify={"space-around"}>
            <Col>
              <LookForm
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