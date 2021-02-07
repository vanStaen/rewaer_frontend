import React from "react";
import { Image, Card, notification, Spin, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";

import "./ItemCard.css";

const { Meta } = Card;

const ItemCard = (props) => {

  const handleDelete = () => {
    const deleteLook = async (token, requestBody) => {
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
        notification.error({ message: `Unauthenticated!`, placement: "bottomRight", });
        throw new Error("Unauthenticated!");
      } else {
        const s3ObjectID = props.item.mediaUrl.split("/").slice(-1)[0];
        const responseDeleteS3 = await axios({
          url: process.env.REACT_APP_API_URL_UPLOAD + '/' + s3ObjectID,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (responseDeleteS3.status !== 204) {
          notification.error({ message: `Error when deleting object ${s3ObjectID} from S3 bucket.`, placement: "bottomRight", });
          throw new Error(`Error when deleting object ${s3ObjectID} from S3 bucket.`);
        }
      }

      return "Success";
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
    deleteLook(props.token, requestBody)
      .then(() => {
        notification.success({ message: `Look deleted successfully.`, placement: "bottomRight", });
        // retrigger parent component rendering
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
