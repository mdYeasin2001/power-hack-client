import { useAppDispatch, useAppSelector } from "../app/hooks";
import AppBar from "../components/common/AppBar";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react"
import AppLoader from "../components/utils/loaders/AppLoader";

type Props = {
    children: React.ReactNode
}

const AppLayout = (props: Props) => {
    const { children } = props;
    const { refresh } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        // if (!refresh) {
        //     if (isSuccess) {
        //         const { id, title, firstName, lastName, gender, email, phone, state, country, currentJob, studentType, status, highestStudy, avatar, roles = [], expertise = "", houseOrFlat = "", landMark = "", streetAddress = "", townOrCity = "", stateOrCountry = "", postalOrZip = "", userName = "" } = data.data.user;

        //         setTimeout(() => {
        //             dispatch(signin(({ id, title, firstName, lastName, gender, email, phone, state, country, currentJob, studentType, status, highestStudy, avatar, roles, expertise, houseOrFlat, landMark, streetAddress, townOrCity, stateOrCountry, postalOrZip, userName })));
        //         }, 2000)
        //     } else if (isError) {
        //         // SET REFRESH TRUE AFTER 2 SEC
        //         setTimeout(() => {
        //             dispatch(refresher());
        //         }, 2000)
        //     }
        // }
    })
    return (
        <main>
            <AppBar />
            <div>
                <ToastContainer />
            </div>
            {!refresh && <AppLoader />}
            <div className="container my-5">
                {children}
            </div>
        </main>
    );
};

export default AppLayout;