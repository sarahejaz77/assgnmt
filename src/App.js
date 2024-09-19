import Dashboard from "./screens/dashboard";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                {/* hashrouter helps in hosting at github pages that's why i used it instead of broweserroute */}
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
