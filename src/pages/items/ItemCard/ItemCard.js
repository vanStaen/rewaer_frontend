import React from "react";
import { Image, Card, notification, Spin, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";

import "./ItemCard.css";

const { Meta } = Card;

const ItemCard = (props) => {

  const handleDelete = () => {
    const deleteItem = async (requestBody) => {
      const response = await axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        data: requestBody,
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        notification.error({ message: `Unauthenticated!`, placement: "bottomRight", });
        throw new Error("Unauthenticated!");
      } 
    }
    const requestBody = {
      query: `
          mutation {
              deleteItem(itemId: "${props.item._id}") {
                _id
              }
            }
            `
    };
    console.log("requestBody", requestBody);
    // delete Look
    deleteItem(requestBody)
      .then(() => {
        notification.success({ message: `Item deleted successfully.`, placement: "bottomRight", });
        props.setIsOutOfDate(true);
        console.log('Success!');
      }
      ).catch(error => {
        notification.error({ message: `Error!`, placement: "bottomRight", });
        console.log(error.message);
      });
  }

  const spinnerFormated = (
    <div className="card__spinner">
      <Spin size="middle" />
    </div>
  )

  return (
    <Card
      hoverable
      bordered
      style={{ width: 240, marginBottom: 30, height: 385 }}
      cover={
        <Image
          alt={props.item.title}
          src={props.item.mediaUrlThumb}
          placeholder={spinnerFormated}
          width={240}
          height={320}
        />}
    >
      <Meta title={
        <div>
          {props.item.title}
          &nbsp;&nbsp;&nbsp;
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={handleDelete}
            okText="Delete"
            cancelText="Cancel"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      } />
    </Card>
  );
};

export default ItemCard;
