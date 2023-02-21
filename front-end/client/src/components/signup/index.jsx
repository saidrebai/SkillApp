import {userState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './styles.modules.css';

const Signup = () =>{
    const [data,setData]= useState({
        UserName:"",
        email:"",
        password:""
    });
    const [error,setError] = useState("")
    const navigate = useNavigate();

    const handleChange = ({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
    };
    const handleSubmit = async (e) =>{
       e.preventDefault();
       try {
        const url ="http://localhost:8080/api/users";
        const {data:res} = await axios.post(url,data);
        navigate("/login");
        console.log(res.message);

       } catch (error) {
        if(error.response &&
            error.response.status >= 400 &&
            error.response.status<=500
            ){
               setError(error.response.data.message)
            }
        
        }
    }

    return(
        <div className={styles.signup_container}>
            <div className={styles.signup_from_container}>
                <div className={styles.left}>
                    <h1> welcome Back</h1>
                    <link to="/login">
                        <button type='button' className={styles.white_btn}>
                            sign in
                        </button>
                    </link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Crate Account</h1>
                        <input
                         type="text"
                        placeholder='UserName'
                        name='UserName'
                        onChange={handleChange}
                        value={data.UserName}
                        required
                        className={styles.input}/>
                        <input
                         type="email"
                        placeholder='email'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className={styles.input}/>
                        <input
                         type="password"
                        placeholder='password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className={styles.input}/>
                       {error && <div className={styles.error_msg}>{error}</div>}
                       <button type="submit" className={styles.green_btn}>
                        Sign Up
                       </button>
                    </form>
                </div>

            </div>

        </div>
    )
};
export default Signup;