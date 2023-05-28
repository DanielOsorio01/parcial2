import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import "../styles/App.css";
import Cafes from "./Cafes";
import LoginForm from "./LoginForm";
import { FormattedMessage } from 'react-intl';

function App() {
	return (
		<div className="App">
			<Container fluid>
				<Row className="justify-content-md-center">
					<Col md={11}>
						<h1 className="App-title">El aroma mágico</h1>
						<hr/>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md={11}>
						<div className="App-banner">
						<Image src="bannerCafe.png" fluid width={"100%"} />
						<hr/>
						</div>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md={11}>
						<BrowserRouter>
						<Routes>
							<Route path="/" element={<LoginForm />} />
							<Route path="/cafes" element={<Cafes />} />
						</Routes>
						</BrowserRouter>
					</Col>
				</Row>
				<p className="App-footer">
					<FormattedMessage id="ContactUs"></FormattedMessage>: +57 3102105253 - info@elaromamagico.com - @elaromamagico</p>
			</Container>
		</div>
    );
}

export default App;