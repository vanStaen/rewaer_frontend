import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Col, Row, Spin, notification } from "antd";

import fetchItems from './fetchItems';

import ItemCard from "./ItemCard/ItemCard";
import ItemForm from "./ItemForm/ItemForm";

import "./Items.css";

const ItemsPage = () => {

  const [items, setItems] = useState([]);
  const [isOutOfDate, setIsOutOfDate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadItems();
  }, [isOutOfDate])

  const loadItems = async () => {
    try {
      const items = await fetchItems();
      setItems(items);
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
  };

  const itemList = items.map(item => {
    return (<Col key={item._id}>
      <ItemCard
        item={item}
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