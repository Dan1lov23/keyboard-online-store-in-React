import "./loginMain.css";

import {useDispatch} from "react-redux";

import {Link, useNavigate} from "react-router-dom";

export default function LoginMain() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const login = () => {

        const loginInput = document.getElementById("login") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;

        const username = loginInput.value;
        const password = passwordInput.value;

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(res => res.json())
            .then(data => {
               localStorage.setItem("token", data.token);
               localStorage.setItem("role", data.role);
               localStorage.setItem("username", username);
               const tokenFromStorage:any = localStorage.getItem("token");
               if (tokenFromStorage.length > 10) {
                   dispatch({type: "IS_LOGIN", payload: true});
                   const token = localStorage.getItem("token");
                   console.log(`JWT token - ${token}`);
                   const userRole = localStorage.getItem("role");
                   console.log(`User role - ${userRole}`);
                   const userName = localStorage.getItem("username");
                   console.log(`userName - ${userName}`);
                   const icon = localStorage.getItem("icon");
                   console.log(`icon - ${icon}`);
                   navigate('/user');
               } else {
                   console.log(`JWT токен не получен`)
               }
               setTimeout(() => {
                   dispatch({type: "IS_LOGIN", payload: false});
                   localStorage.setItem("token", "");
                   localStorage.setItem("role", "");
                   localStorage.setItem("username", "");
                   localStorage.setItem("icon", "");
               }, 3600000)
            });
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
                        <Link to={"/registration"}>
                            <button>
                                Зарегестрируйтесь
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
