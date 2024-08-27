import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style/email.css';
import axios from 'axios';
import success from '../assets/Images/Covers/sucess.webp';

const Email = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id, token } = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const url = `https://pizzahub.me/users/${id}/verify/${token}`;
                const { status } = await axios.get(url);
                
                if (status === 200) {
                    setValidUrl(true);
                } else {
                    setValidUrl(false);
                    setError(true);
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setValidUrl(false);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        verifyEmail();
    }, [id, token]);

    if (loading) {
        return <h2>Loading...</h2>; // Display loading state
    }

    return (
        <>
            {validUrl ? (
                <div className="containerEmail">
                    <h3>Email Verified Successfully, Please Exit The Page And Login!</h3>
                    <img src={success} alt="Success" />
                </div>
            ) : (
                <h2>{error ? 'There was an error verifying your email. Please check the link and try again.' : 'Error 404 Not Found'}</h2>
            )}
        </>
    );
};

export default Email;
