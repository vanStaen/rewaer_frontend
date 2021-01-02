import React, { Fragment } from "react";
import { message } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import axios from "axios";
import moment from 'moment';

import "./LookForm.css";

const LookForm = (props) => {

  const fileSelectHandler = async (event) => {
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
        message.error(`Unauthenticated!`);
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
          message.success(`File uploaded successfully.`);
          // retrigger parent component rendering
          props.setIsOutOfDate(true);
          console.log('Success!');
        }
        ).catch(error => {
          message.error(`File upload failed.`);
          console.log(error.message);
        });

    } catch (err) {
      message.error(`File upload failed.`);
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
        <label for="file">
          <p className="form-upload-drag-icon">
            <CameraOutlined />
          </p>
          <p className="form-upload-text">Create Look</p>
          <p className="form-upload-hint">
            Start with a photo <br />
          Click, or drag here a file
        </p>
        </label>
      </form>
    </Fragment >
  );
};

export default LookForm;

