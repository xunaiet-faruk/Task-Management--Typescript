type UserProps = {    
    user: {
        name: string;
        age: number;
        isLogged: boolean;
        lang: string[];
    }
}
const Users = ({ user }: UserProps) => {
    return (
        <div>
            <h2>Users</h2>
            <p>The user name is {user.name}</p>
            <p>The user age is {user.age}</p>
            <p>The user is {user.isLogged ? 'logged in' : 'not logged in'}</p>
            <div>
               This user speaks {user.lang.map((language,index)=>{
                    return <p key={index}>{language}</p>
                })}
            </div>
        </div>
    );
};

export default Users;