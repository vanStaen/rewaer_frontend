import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Col, Row, Spin, notification } from "antd";

import ItemCard from "./ItemCard/ItemCard";
import ItemForm from "./ItemForm/ItemForm";
import AuthContext from "../../context/auth-context";

import "./Items.css";

const ItemsPage = () => {

  const [items, setItems] = useState([]);
  const [isOutOfDate, setIsOutOfDate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const context = useContext(AuthContext);

  useEffect(() => {
    loadItems();
  }, [isOutOfDate])

  const loadItems = () => {
    const requestBody = {
      query: `
            query {
                items {
                  _id
                  user
                  title
                  active
                  favorite
                  dateCreated
                  mediaUrlThumb
                }
              }
              `,
    };

    async function fetchItems(token) {
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
    fetchItems(context.token).then((resData) => {
      const items = resData.data.items;
      setItems(items);
      setIsLoading(false);
      setIsOutOfDate(false);
    }
    ).catch(error => {
      console.log(error.message);
      notification.error({
        message: "Error",
        description: error.message,
        placement: "bottomRight",
      });
      setError(error.message);
    });
  };

  const itemList = items.map(item => {
    return (<Col key={item._id}>
      <ItemCard
        item={item}
        token={context.token}
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
              <ItemForm
                token={context.token}
                setIsOutOfDate={setIsOutOfDate}
              />
            </Col>
            {itemList}
          </Row>)
      }
    </div>
  );

}

export default ItemsPage;
