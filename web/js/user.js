class User {
    constructor() {
        this.baseUrl = `http://a9319b08eb2e146eaa84b386872f12d0-602895787.us-east-1.elb.amazonaws.com:8080`;
            

    }

    async getUserById(id) {
        return await fetch(`${this.baseUrl}/User/${id}`)
            .then((response) => response.json())
            .then((datos) => {
                return datos;
            })
            .catch((error) => console.log(error));
    }

    async addNewUser(name, email, password) {
        fetch(`${this.baseUrl}/Auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password,
                }),
            },
        )
            .then((response) => response.json())
            .then((datos) => console.log(datos));
    }

    async loginUser(email, password) {
        try {
            const response = await fetch(`${this.baseUrl}/Auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Error en la autenticación"); // Manejo de error
            }

            console.log(response);
            return response.json(); // Ahora sí devuelve los datos correctamente
        } catch (error) {
            console.error("Error en loginUser:", error);
            return null; // Retorna `null` en caso de error
        }
    }

    modifyUser(id, name, email, password, createDate, softDelete) {
        console.log(id);
        fetch(`${this.baseUrl}/User/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": id,
                "name": name,
                "email": email,
                "password": password,
                "createDate": createDate,
                "softDelete": softDelete,
            }),
        }).then((response) => console.log(response))
            .catch((error) => console.log(error));
    }

    deleteUser(id) {
        fetch(`${this.baseUrl}/User/${id}`, {
            method: "DELETE",
        }).catch((error) => console.log(error));
    }
}

export default User;
