import DashboardCandidate from './components/DashboardCandidate';
import DashboardAdmin from './components/DashboardAdmin';
import { useAuth } from "../../hooks/useAuth";
import Menu from '../Menu';


const Home = () => {

    const { user } = useAuth();

    return (
        <>            
            <Menu />
            {
                user.profile === 1 ? (
                    <DashboardAdmin />
                ) : (
                    <DashboardCandidate />
                )
            }
        </>
    );
}

export default Home;