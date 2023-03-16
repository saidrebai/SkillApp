import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './index.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:8080/api/candidatRouters/getAll');
            setUsers(response.data?.users);
            setUserCount(response.data.users.length);
        }
        fetchData();
    }, []);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentUsers = users.slice(startIndex, endIndex);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    }
    return (
        <><div className='users_gird'>
            <div className='number_of_users'>
                <p>Number of users : {userCount}</p>
            </div>
            <div className='users'>
                {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                        <div className='users_container' key={user.id}>
                            <div className='users_avatar'><Avatar src="/broken-image.jpg" /></div>
                            <div className='users_infromation'>
                                <div className='users_email'>{user.email}</div>
                            </div>
                            <div className='button_display'>
                                <button type="submit">Display</button>
                            </div>

                        </div>
                    ))

                ) : (
                    <div>No users to display</div>
                )}
            </div>
            <div className="pagination_container">
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack></div>
        </div></>
    )
}

export default Users;