import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const urlAPI = 'http://localhost:3001';

    const validate = () => {
        const errors = {};
        if (!username) errors.user = "El usuario es requerido";
        if (!password) errors.password = "La contraseña es requerida";
        
        return errors;
    };
        
    const sendData = async () => {
        if (!username ) {
            setErrors({ user: "El usuario es requerido" });
            return;
        }
        if (!password) {
            setErrors({ password: "La contraseña es requerida" });
            return;
        }

        const postBody = {
            login: username,
            password: password
        };
        fetch(`${urlAPI}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        }).then((response) => response.json())
        .then((data) => {
            if (data.status === 'success') {
                navigate('/cafes');
            }
            if (data.status === 'error') {
                setErrors({ credentials: data.message });
                alert(data.message);
            }
        });
        
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            console.log("Enviar datos de registro", { username, password });
            sendData();
        } 
        else {
            setErrors(errors);
        }
    };

    return (
        <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6} lg={4}>
                <Card>
                <Card.Body>
                    <h3 className="text-center">Iniciar sesión</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Ingrese su usuario"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Ingrese su contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Iniciar sesión
                    </button>
                    <button className="btn btn-primary btn-block">
                        Cancelar
                    </button>
                    </form>
                    {(errors.user && <p className="text-danger">{errors.user}</p>) || (errors.password && <p className="text-danger">{errors.password}</p>) || (errors.credentials && <p className="text-danger">{errors.password}</p>)}
                </Card.Body>
                </Card>
            </Col>
        </Row>
    );

  }

export default LoginForm;