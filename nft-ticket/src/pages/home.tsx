import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';  

function Home() {
    const navigate = useNavigate();

    return (
        <div className="main-container">
            <div className="content">
                <div className="festival-name">뮤직 페스티벌</div>
                <div className="festival-info">
                    <p>2024년 5월 20일</p>
                    <p>오후 2시 - 10시</p>
                    <p>서울 올림픽공원</p>
                </div>
                <button onClick={() => navigate('/tickets')}>티켓 구매</button>
            </div>
        </div>
    );
}

export default Home;