import "./registerMain.css";

import {Link, useNavigate} from "react-router-dom";

export default function RegisterMain() {

    const navigate = useNavigate();

    const registrationFunction = async () => {
        const username = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const icon = document.getElementById("icon") as HTMLInputElement;

        fetch("http://localhost:3000/api/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username.value, password: password.value, email: email.value, icon: icon.value}),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            navigate("/login");
        })
    };

    return (
        <div className="registerMain">
            <div className="mainContainer">
                <div className="registerInput">
                    <input id="username" placeholder="Логин"/>
                </div>
                <div className="registerInput">
                    <input id="password" type="password" placeholder="Пароль"/>
                </div>
                <div className="registerInput">
                    <input id="email" type="email" placeholder="почта"/>
                </div>
                <div className="registerInput">
                    <input id="icon" type="text" placeholder="url аватарки"/>
                </div>
                <div className="registerButton">
                    <button onClick={registrationFunction}>Регистрация</button>
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
