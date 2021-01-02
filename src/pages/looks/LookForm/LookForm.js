import React, { Fragment, useState } from "react";
import { notification, Spin } from 'antd';

import axios from "axios";
import moment from 'moment';

import { CameraOutlined } from '@ant-design/icons';


import "./LookForm.css";

const LookForm = (props) => {
  const [isUploading, setIsUploading] = useState(false);

  const fileSelectHandler = async (event) => {
    setIsUploading(true);
    submitHandler(event.target.files[0]);
  }

  const submitHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    async function postNewLook(token, requestBody) {

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
      }
      const newLook = await response.data;
      return newLook;
    }

    try {
      const res = await axios.post(process.env.REACT_APP_API_URL_UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + props.token,
        }
      })
      // Create Look entry
      const mediaUrl = res.data.imageUrl
      const mediaUrlThumb = res.data.thumbUrl
      const title = moment().format('DD.MM.YYYY');
      const requestBody = {
        query: `
            mutation {
                createLook(
                  lookInput: { mediaUrl: "${mediaUrl}", 
                               mediaUrlThumb: "${mediaUrlThumb}",
                               title: "${title}" }
                ) {
                  _id
                }
              }
              `
      };
      console.log("requestBody", requestBody);
      // post new Look
      postNewLook(props.token, requestBody)
        .then(() => {
          notification.success({ message: `File uploaded successfully.`, placement: "bottomRight", });
          // retrigger parent component rendering
          props.setIsOutOfDate(true);
          console.log('Success!');
        }
        ).catch(error => {
          notification.error({ message: `File upload failed.`, placement: "bottomRight", });
          console.log(error.message);
        });
      setIsUploading(false);
    } catch (err) {
      notification.error({ message: `File upload failed.`, placement: "bottomRight", });
      setIsUploading(false);
      console.log(err)
    }
  }

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <input
          type="file"
          class="inputfile"
          name="inputfile"
          id="file"
          onChange={fileSelectHandler}
        />
        {isUploading ?
          (<label for="file">
            <Spin size="large" />
          </label>) :
          (<label for="file">
            <p className="form-upload-drag-icon">
              <CameraOutlined />
            </p>
            <p className="form-upload-text">Create Look</p>
            <p className="form-upload-hint">
              Start with a photo <br />
          Click, or drag here a file
        </p>
          </label>)}
      </form>
    </Fragment >
  );
};

export default LookForm;

