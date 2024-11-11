import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BACKEND_DOMAIN = "http://127.0.0.1:8000";

export async function SendApiRequest({ endpoint, method = "GET", data = {}, authenticated = false, withCredentials = false }) {
    let payload = {};
    let headers = { "Content-Type": "application/json" };

    if (authenticated) {
        headers = { ...headers, "token": localStorage.getItem("token") };
    }

    if (withCredentials) {
        payload = { ...payload, credentials: 'include' };
    }

    payload = {
        ...payload,
        method: method,
        headers: headers,
    };

    if (method === "POST") {
        payload = { ...payload, body: JSON.stringify(data) };
    }

    try {
        let response = await fetch(`${BACKEND_DOMAIN}/${endpoint}`, payload);

        if (response.status == 401 && authenticated) {
            try {
                response = await fetch(`${BACKEND_DOMAIN}/auth/refresh`, {
                    headers: {
                        "token": localStorage.getItem("token"),
                    },
                    method: "POST",
                    credentials: "include",

                });

                if (response.status == 401) {
                    localStorage.clear();
                    window.location.reload();
                    return;
                }
                let data = await response.json();

                localStorage.setItem("token", data.token);

                headers = { ...headers, "token": data.token };
                payload = { ...payload, headers: headers };

                response = await fetch(`${BACKEND_DOMAIN}/${endpoint}`, payload);
            } catch (err) {
                throw err;
            }
        } else if (response.status == 401) {
            console.log(response)
            let result = await response.json()
            toast(result.detail)
            throw {}
        }
        let result = await response.json();
        if (!result.ok) {
            console.log("error here", result.error)
            if (endpoint !== "classroom/get_employees_attendance_list" && endpoint!== "classroom/get_absentees_list") {
                toast(result.error)
            }
        }
        return result;
    } catch (err) {
        toast(err)
        throw err
    }
}