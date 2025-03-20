export const registerUser = async(userDetails) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/admin/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        });

        if(!response.ok) throw new Error("Failed to register user");

        const data = await response.json();

        if(data.user && data.authToken) {
            localStorage.setItem("authToken", data.authToken);
            localStorage.setItem("admin", JSON.stringify(data.user));
        }

        return data;
    } catch(error) {
        throw new Error(error.message || "An error occured");
    }
}


export const loginUser = async(userLoginDetails) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userLoginDetails),
        });

        if(!response.ok) throw new Error("Invalid credentials");

        const data = await response.json();
        console.log(data);

        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        return data;
    } catch(error) {
        throw new Error(error.message || "Authentication failed");
    }
}


export const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
}