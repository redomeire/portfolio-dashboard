import React from "react";
import { signInWithoutPassword } from "../sections/auth/firebase/request";

export default function CheckEmail(){
    const [email, setEmail] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithoutPassword(email);
    }

    return(
        <div>
        <div>Youre gonna login without any password!!</div>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}