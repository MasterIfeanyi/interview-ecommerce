import { useSelector } from 'react-redux/es/exports'
import Account from './Account';
import Button from '../../components/Button';
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";
import { useGetProfileQuery } from "./profileApiSlice";
import { selectCurrentUser } from '../auth/authSlice';
import { useParams } from "react-router-dom";

const Profile = () => {

    const username = useSelector(selectCurrentUser);

    const { id } = useParams();

    const {
        data: account,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetProfileQuery(id)

  return (
    <section className="section">
        <div className="container">
            
            <div className="row">
                <div className="col-12 intro text-center">
                    <h3 className="mt-4">Welcome, {username} </h3>
                    <p className="lead max-w-50">With your Bank of America banking account you can enjoy tools, benefits and rewards to help you manage your money.</p>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-12">
                    {isLoading && <div className="mexican-wave text-center my-5"></div>}

                    {isError && (<p className="text-center text-danger">Oh no, there was an error {JSON.stringify(error.error)} </p>)}
                </div>
            </div>

            {isSuccess && (
                <div className="row d-flex justify-content-center">
                    {/* {isSuccess && account.map((each, i) => (
                        <Account key={i} each={each} />
                    ))} */}
                    {isSuccess && 
                        <Account each={account} />
                    }
                </div>
            )}
        </div>
    </section>
  )
}

export default Profile