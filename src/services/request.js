export const request = {
    get: async (url, access_token = null) => {
        let headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + access_token
        };
        return await fetch(url, {
            method: "GET",
            headers: headers
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        });
    },

    post: async (formData, url, access_token, encode = false) => {
        let formBodyString = "";
        if (encode) {
            let formBody = [];
            for (let key in formData) {
                if (formData.hasOwnProperty(key)) {
                    let encodedKey = encodeURIComponent(key);
                    let encodedValue = encodeURIComponent(formData[key]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
            }
            formBodyString = formBody.join("&");
        }
        let headers;
        if (access_token !== null)
            headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + access_token
            };
        else
            headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
        return await fetch(url, {
            method: "POST",
            headers: headers,
            body: encode ? formBodyString : JSON.stringify(formData)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        });
    }
};
