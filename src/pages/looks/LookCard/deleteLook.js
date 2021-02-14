import axios from 'axios';
import { notification} from "antd";

export default async function deleteLook(id) {

    const requestBody = {
        query: `
            mutation {
                deleteLook(lookId: "${id}") {
                _id
                }
            }
            `,
    };

    const response = await axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        data: requestBody,
    });

    if ((response.status !== 200) & (response.status !== 201)) {
        notification.error({
        message: `Unauthenticated!`,
        placement: "bottomRight",
        });
        throw new Error("Unauthenticated!");
    }

};