import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';
import { FormattedMessage } from 'react-intl';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const urlAPI = 'http://localhost:3001';

    const validate = () => {
        const errors = {};
        if (!username) errors.user = <FormattedMessage id="LoginUsernameError" />;
        if (!password) errors.password = <FormattedMessage id="LoginPasswordError" />;
        
        return errors;
    };
        
    const sendData = async () => {
        if (!username) {
            setErrors({ user: <FormattedMessage id="LoginUsernameError" /> });
            return;
        }
        if (!password) {
            setErrors({ password: <FormattedMessage id="LoginPasswordError" /> });
            return;
        }
    
        const postBody = {
            login: username,
            password: password
        };
    
        try {
            const response = await fetch(`${urlAPI}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postBody)
            });
    
            const data = await response.json();
            if (data.status === 'success') {
                navigate('/cafes');
            } else if (data.status === 'error') {
                setErrors({ credentials: <FormattedMessage id="LoginCredentialsError" /> });
            }
        }
        catch (error) {
            setErrors({ credentials: <FormattedMessage id="ServerConnectionError" /> });
        }
    };    

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            sendData();
        } 
        else {
            setErrors(errors);
        }
    };

    const handleCancel = (e) => {
        /* Borrar los datos del formulario */
        setUsername('');
        setPassword('');
        setErrors({});
        /* Borra el contenido de los campos del formulario */
        e.currentTarget.form.reset();
    };

    return (
        <Row className="justify-content-md-center">
        <Col md={8}>
        <h3 className='Login-title'>
            <FormattedMessage id="LoginTitle" />
        </h3>
        <div className='Login-box'>
        <Container fluid>
        <form onSubmit={handleSubmit}>
            <Row className="justify-content-md-center">
            <Col md={8}>
                <label className='Login-text'>
                    <FormattedMessage id="LoginUsername" />
                </label>
            </Col>
            </Row>
            <Row className="justify-content-md-center">
            <Col md={8}>
                <input
                    type="text"
                    className="Login-input"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Col>
            </Row>
            <Row className="justify-content-md-center">
            <Col md={8}>
                <label className='Login-text'>
                    <FormattedMessage id="LoginPassword" />
                </label>
            </Col>
            </Row>
            <Row className="justify-content-md-center">
            <Col md={8}>
                <input
                        type="password"
                        className="Login-input"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
            </Col>
            </Row>
            <Row className="justify-content-md-center">
            <Col md={8}>
                <div className='Login-buttons-container'>
                <button type="submit" className="Login-button Login-ingresar">
                    <FormattedMessage id="LoginButton" />
                </button>
                <button className="Login-button Login-cancelar" onClick={handleCancel}>
                    <FormattedMessage id="LoginCancel" />
                </button>
                </div>
            </Col>
            </Row>
            <Row className="justify-content-md-center">
            <Col md={8}>
                {(errors.user && <p className="Login-error">{errors.user}</p>) || 
                (errors.password && <p className="Login-error">{errors.password}</p>) || 
                (errors.credentials && <p className="Login-error">{errors.credentials}</p>)} 
            </Col>
            </Row>
        </form>
        </Container>
        
        </div>
        </Col>
        </Row>
    );

  }

export default LoginForm;