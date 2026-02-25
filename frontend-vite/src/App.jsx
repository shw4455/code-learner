import UiPlayground from "./pages/UiPlayground.jsx";

export default function App() {
    return (
        <div style={pageStyle}>
            <UiPlayground />
        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
};
