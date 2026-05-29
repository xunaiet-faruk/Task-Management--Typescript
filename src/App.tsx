
import './App.css'
import Users from './Componet/Users'
import './index.css'

function App() {

  const user1 ={
  name: "Junaiet faruk",
  age: 25,
  isLogged: true,
  lang: ["Bangla","English","Hindi"]
  }

  return (
  <>
  
  <h1>Hello Typescript + Vite</h1>
  <Users user={user1}/>
  </>
  )
}

export default App
