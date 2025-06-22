import "./registerMain.css";

import {Link} from "react-router-dom";

export default function RegisterMain() {

    const register = async () => {
        const login = document.getElementById("login") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        try {
            const response = await fetch("http://localhost:1405/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: login.value, password: password.value }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Ошибка: ${errorData.message || response.statusText}`);
            } else {
                const data = await response.json();
                alert(data.message || "Регистрация прошла успешно");
            }
        } catch (error) {
            alert("Произошла ошибка при отправке запроса");
            console.error(error);
        }
    };

    return (
        <div className="registerMain">
            <div className="mainContainer">
                <div className="registerInput">
                    <input id="login" placeholder="Логин"/>
                </div>
                <div className="registerInput">
                    <input id="password" type="password" placeholder="Пароль"/>
                </div>
                <div className="registerButton">
                    <button onClick={register}>Регистрация</button>
                </div>
                <div className="registerButton">
                    <p>Есть аккаунт? Войдите.</p>
                    <Link to="/login">
                        <button>
                            Войти
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
