import React from 'react';
import axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      id: 0,
      name: '',
      email: '',
      address: '',
      illness: ''
    }

  }
  componentDidMount() {
    axios.get("http://localhost:8080/patients/")
      .then((res) => {
        this.setState({
          patients: res.data,
          id: 0,
          name: '',
          email: '',
          address: '',
          illness: ''
        })
      })
  }
  submit(event, id) {
    event.preventDefault();
    if (id === 0) {
      axios.post("http://localhost:8080/patients/", {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        illness: this.state.illness
      })
        .then((res) => {
          this.componentDidMount();
        })
    } else {
      axios.put("http://localhost:8080/patients/", {
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        illness: this.state.illness
      }).then(() => {
        this.componentDidMount();
      })

    }

  }
  delete(id) {
    axios.delete(`http://localhost:8080/patients/${id}`)
      .then(() => {
        this.componentDidMount();
      })
  }
  edit(id) {
    axios.get(`http://localhost:8080/patients/${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          address: res.data.address,
          illness: res.data.illness
        })
      })
  }
  render() {
    return (
      <div className="container" >

        <div className="row">
          <div className="col s6">
            <form onSubmit={(e) => this.submit(e, this.state.id)}>
              <div class="input-field col s12">
                <i class="material-icons prefix">person</i>
                <input onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name} type="text" id="autocomplete-input" class="autocomplete" />
                <label for="autocomplete-input">Enter Your Name</label>
              </div>
              <div class="input-field col s12">
                <i class="material-icons prefix">email</i>
                <input onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} type="email" id="autocomplete-input" class="autocomplete" />
                <label for="autocomplete-input">Enter Your Email</label>
              </div>
              <div class="input-field col s12">
                <i class="material-icons prefix">location_on</i>
                <input onChange={(e) => this.setState({ address: e.target.value })} value={this.state.address} type="password" id="autocomplete-input" class="autocomplete" />
                <label for="autocomplete-input">Enter You Address</label>
              </div>

              <div class="input-field col s12">
                <i class="material-icons prefix">mood_bad</i>
                <input onChange={(e) => this.setState({ illness: e.target.value })} value={this.state.illness} type="password" id="autocomplete-input" class="autocomplete" />
                <label for="autocomplete-input">Enter Your Illness</label>
              </div>
              <button class="btn waves-effect waves-light right" type="submit" name="action">Submit Your Appoinment
          <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
          <div className="col s6">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>address</th>
                  <th>illness</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.patients.map(user =>
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.illness}</td>
                      <td>
                        <button onClick={(e) => this.edit(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                          <i class="material-icons">edit</i>
                        </button>
                      </td>
                      <td>
                        <button onClick={(e) => this.delete(user.id)} class="btn waves-effect waves-light" type="submit" name="action">
                          <i class="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  )
                }

              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
