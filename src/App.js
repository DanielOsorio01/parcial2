import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Cafes from "./Components/cafes";
import LoginForm from "./Components/login";
import bannerCafe from "./bannerCafe.png";

function App() {
	return (
		<div className="App">
			
			<h1 className="magico">El aroma mágico</h1>
			<img src={bannerCafe} alt="bannerCafe" />
			<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginForm />} />
				<Route path="/cafes" element={<Cafes />} />
			</Routes>
			</BrowserRouter>
			<p className="footer">Contact us: +57 3102105253 - info@elaromamagico.com - @elaromamagico</p>
		</div>
    );
}

export default App;