import "./loginMain.css";

import {Link} from "react-router-dom";

export default function LoginMain() {

    const login = () => {

        const loginInput = document.getElementById("login") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;

        fetch(`http://localhost:1405/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: loginInput.value, password: passwordInput.value }),
        })
    }

    return (
        <>
            <div className="loginMain">
                <div className="mainContainer">
                    <div className="loginInput">
                        <input id="login" placeholder="Логин"/>
                    </div>
                    <div className="loginInput">
                        <input id="password" type="password" placeholder="Пароль"/>
                    </div>
                    <div className="loginButton">
                        <button onClick={login}>Войти</button>
                    </div>
                    <div className="loginButton">
                        <p>Нет аккаунта? Зарегестрируйтесь.</p>
                        <Link to="/login">
                            <Link to={"/register"}>
                                <button>
                                    Зарегестрируйтесь
                                </button>
                            </Link>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}