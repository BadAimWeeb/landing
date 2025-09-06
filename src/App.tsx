import cls from "./App.module.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageDN42 from "./pages/dn42";
import PageHome from "./pages/Home";

function App({ type }: { type: "main" | "dn42" }) {
    return (
        <div className={cls.Layout}>
            <Header type={type} />
            <div className={cls.Container}>
                {(() => {
                    switch (type) {
                        case "main": return <PageHome />;
                        case "dn42": return <PageDN42 />;
                        default: return <></>;
                    }
                })()}
            </div>
            <Footer />
        </div>
    )
}

export default App
