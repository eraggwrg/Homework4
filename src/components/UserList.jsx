import Types from 'prop-types'
import axios from 'axios'
export const UserList = ({ users, onDel, onAddSalary, ishigh }) => {

    return <div>
        <h1>UserList</h1>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>salary</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(elm => <tr key={elm.id} style={{ background: elm.salary < 800000 ? "white" : "yellowgreen" }}>
                        <td>{elm.id}</td>
                        <td>{elm.name}</td>
                        <td>{elm.surname}</td>
                        <td>{elm.salary} AMD</td>
                        <td>
                            <div style={{ display: 'flex', gap: '3px' }}>
                                <button onClick={() => onDel(elm.id)}>Delete</button>
                                <button onClick={() => onAddSalary(elm.id)}>Salary up</button>
                            </div>
                        </td>
                    </tr>)

                }

            </tbody>
        </table>
    </div >
}

UserList.propTypes = {
    users: Types.arrayOf(
        Types.exact({
            id: Types.string,
            name: Types.string,
            surname: Types.string,
            salary: Types.number
        }))
}
