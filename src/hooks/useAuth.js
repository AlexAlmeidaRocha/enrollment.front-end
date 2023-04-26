import { createContext, useContext, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import userApi from "../api/user.api";
import { toast } from 'react-toastify';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useLocalStorage("user", null);

    const navigate = useNavigate();    

    const login = async (data) => {

        await userApi.postLogin(data.email, data.password).then(result => {
            if (result.length > 0) {
                var timenow = new Date();
                setUser({ ...result[0], date: timenow });
                navigate("/", { replace: true });
            }
            else{
                toast.error("Usuário ou senha errada");
            }
        });

    };

    const getuser = useCallback(async (date) => {
        userApi.getUser(user.id).then(result => {

            if (result.status === 200) {
                setUser({ ...result.data, date: date });
            }
        });
    }, []);

    useEffect(() => {
        if (user !== null) {
            getuser(user.date);
        }
    }, [getuser]);


    const logout = () => {
        registSecondsLogin();
        setUser(null);
        navigate("/login", { replace: true });
    };

    const registSecondsLogin = () => {
        try {
            var timenow = new Date();
            var timelogin = new Date(user.date);
            var dif = timelogin.getTime() - timenow.getTime();
            var Seconds_from_T1_to_T2 = dif / 1000;
            var Seconds_Between_Dates = Math.abs(Math.round(Seconds_from_T1_to_T2));

            userApi.patchAlterTimeOnline(user, Seconds_Between_Dates);

        } catch {

        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};