import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import axios from 'axios';
import apiConfig from '../../api/apiConfig';

export default function UserIndex() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({});

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get("http://localhost:8000/api/user").then((response) => {
                setUser(response.data);
            });
        }
    }, [token]);

    const navigate = useNavigate();

    const fetchDataUsers = async () => {
        await api.get('/api/users')
            .then(response => {
                setUsers(response.data.data.data);
            })
    }

    useEffect(() => {
        fetchDataUsers();
    }, []);

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            padding: '20px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
        },
        card: {
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#1f1f1f',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
        },
        cardHover: {
            transform: 'scale(1.05)',
        },
        actions: {
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
        },
        btn: {
            padding: '8px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
            border: 'none',
        },
        btnPrimary: {
            backgroundColor: '#007bff',
            color: 'white',
        },
        btnDanger: {
            backgroundColor: '#dc3545',
            color: 'white',
        },
        btnSuccess: {
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 15px',
        },
        noData: {
            textAlign: 'center',
            fontStyle: 'italic',
            color: '#888',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>User List</h2>
                {user.role === "admin" && (
                    <Link to="/users/create" className="btn btn-success" style={{
                        backgroundColor: "#1f1f1f",
                        borderRadius: "10px",
                    }}>ADD NEW GENRE</Link>
                )}
            </div>
            <div style={styles.grid}>
                {users.length > 0 ? users.map((c, index) => (
                    <div
                        key={index}
                        style={styles.card}
                        onClick={() => navigate(`/users/show/${c.id}`)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div >
                            <img
                                src={`${apiConfig.baseUrl}/storage/${c.profile_photo}`}
                                alt="Profile"
                                style={{
                                    width: "140px",
                                    height: "140px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "5px solid #1f1f1f",
                                    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                        <h3>{c.name}</h3>
                        <i>Role : {c.role}</i>
                    </div>
                )) : (
                    <div style={styles.noData}>
                        <p>Data Belum Tersedia!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
