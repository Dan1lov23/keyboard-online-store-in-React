import "./userMain.css"

import {useEffect, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencil} from "@fortawesome/free-solid-svg-icons";

import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function UserMain() {

    interface DefaultUserProfile {
        username: string;
        email: string;
        role: string;
    }

    const [allUsers, setAllUsers] = useState([]);

    const [isAdmin, setIsAdmin] = useState(false);

    const [isUser, setIsUser] = useState(false);

    const [userIcon, setUserIcon] = useState("");

    const [defaultUserProfile, setDefaultUserProfile] = useState<any>([]);

    useEffect(() => {
        const userName:any = localStorage.getItem("username");
        console.log("userName", - userName);
        const role = localStorage.getItem("role");
        console.log(role);
        if (role === "admin") {
            fetch(`http://localhost:3000/api/allUsersInDatabase`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({role: role}),
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllUsers(data);
                console.log(allUsers.length);
                setIsAdmin(true);
            })
        } else if (role === "user") {
            fetch(`http://localhost:3000/api/getUserInfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: userName}),
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDefaultUserProfile(data);
                setIsUser(true);
            })
        }
        const tokenFromStorage:any = localStorage.getItem("icon");
        setUserIcon(tokenFromStorage);
    }, [])

    const deleteUserFromDatabase = (username: any, userRole:any) => {
        fetch(`http://localhost:3000/api/deleteUserFromBase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, role: userRole}),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAllUsers(data);
        })
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const setIconFunction = async () => {
        const iconUrl:any = prompt("Ведите url изображения")
        console.log(iconUrl);
        if (iconUrl.length > 0) {
            fetch(`http://localhost:3000/api/changeIcon`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: defaultUserProfile.username, icon: iconUrl}),
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    localStorage.setItem("icon", data);
                    setUserIcon(data);
                })
        }
    }

    return (
        <>
            <div className="userMainMain">
                {isAdmin === true ? (
                    <div className="adminPanel">
                        <div className="title">
                            <h1>Панель администратора</h1>
                        </div>
                        <div className="allUsers">
                            <div className="allUsersList">
                                <h2>Пользователй на сайте: {allUsers.length}</h2>
                                {allUsers.map((user:DefaultUserProfile, index) => (
                                    <div key={index} className="user">
                                        <div className="subUser">
                                            <p>{user.username}</p>
                                        </div>
                                        <div className="subUser">
                                            <p>{user.email}</p>
                                        </div>
                                        <div className="subUser">
                                            <p>{user.role}</p>
                                        </div>
                                        <div className="subUser">
                                            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                            <Popover
                                                id={id}
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <Typography sx={{p: 2}}>
                                                    <button
                                                        onClick={() => deleteUserFromDatabase(user.username, user.role)}
                                                        style={{background: "#e74c3c", height: "100%"}}
                                                    >
                                                        <h1>Ок</h1>
                                                    </button>
                                                </Typography>
                                            </Popover>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : isUser === true ? (
                    <div className="userPanel">
                        <div className="youProfile">
                            <div className="profile">
                                <h1>Ваш профиль</h1>
                                <h3>{defaultUserProfile.username}</h3>
                                {userIcon.length > 0 ? (
                                    <div className="userIcon">
                                        <img src={userIcon}/>
                                        <button onClick={() => setIconFunction()}>
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="userIcon" onClick={() => setIconFunction()}>
                                        <h1>+</h1>
                                    </div>
                                )}
                            </div>
                            <div className="userProfile">
                                <div className="subUserProfile">
                                    <h3>Ваш логин - {defaultUserProfile.username}</h3>
                                </div>
                                <div className="subUserProfile">
                                    <h3>Привязання почта - {defaultUserProfile.email}</h3>
                                </div>
                                <div className="subUserProfile">
                                    <h3>Ваш статус - {defaultUserProfile.role}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="guestPanel">
                        <div className="title">
                            <h1>Вы не вошли в аккаунт</h1>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
