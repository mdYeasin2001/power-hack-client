import AppBar from "../components/common/AppBar";

type Props = {
    children: React.ReactNode
}

const AppLayout = (props: Props) => {
    const { children } = props;
    return (
        <main>
            <AppBar />
            <div className="container my-5">
                {children}
            </div>
        </main>
    );
};

export default AppLayout;