import { useEffect, useState } from 'react'
import './App.css'
import { AddUser } from './components/AddUser'
import { UserList } from './components/UserList'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Types from 'prop-types'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.
      get("http://localhost:3004/users")
      .then(res => {
        setUsers(res.data)
      })

  }, [])

  let isHigh = false

  const addItem = obj => {
    setUsers([...users, obj])
    toast.success("New user has been added")
  }

  const deleteItem = id => {
    if (confirm("Are you sure?")) {
      axios
        .delete(`http://localhost:3004/users/${id}`)
        .then(res => {
          toast.success("User has been deleted")
          setUsers([...users.filter(elm => elm.id !== res.data.id)])

        })
    }
  }

  const addSalary = (id) => {
    let user = users.find(x => x.id === id)

    if (user) {
      let add = { ...user, salary: +user.salary + 50000 }
      axios
        .patch(`http://localhost:3004/users/${id}`, add)
        .then(res => {
          setUsers(users.map(user => user.id == id ? res.data : user))
          
          toast.success("Salary has been added")
        })
    }
  }


  return (
    <div className='row'>
      <ToastContainer />
      <AddUser
        onAdd={addItem}
      />
      <UserList
        users={users}
        onDel={deleteItem}
        onAddSalary={addSalary}
        isHigh={isHigh}
      />
    </div>
  )
}

App.propTypes = {
  deleteItem: Types.func
}

export default App
