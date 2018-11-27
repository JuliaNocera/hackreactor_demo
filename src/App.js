import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import fetch from 'isomorphic-fetch'

class App extends Component {
  
  constructor() {
    super()
  
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      todos: {},
      inputValue: '',
      name: 'Julia',
      email: 'user@email.com'
    }
  }
  
  listenToTodos() {
    const database = firebase.database()
    const todosRef = database.ref('todos')
    todosRef.on('value', todos => {
      if(todos.val()) {
        this.setState({todos: todos.val()})
      }
    }, (err) => {
      console.log('error from listenToTodos: ', err)
    })
  }
  
  addTodo(newTodo) {
    const database = firebase.database()
    const todosRef = database.ref('todos')
    const todoKey = todosRef.push().key
    const todoRef = database.ref(`todos/${todoKey}`)
    let todo = {
      value: newTodo,
      completed: false
    }
    todoRef.update(todo)
    .then(() => {
      this.setState({input: ''})
    })
  }
  
  checked(todoKey) {
    const { todos } = this.state
    const database = firebase.database()
    const todoRef = database.ref(`todos/${todoKey}`)
    let todo = todos[todoKey]
    todo.completed = !todo.completed
    todoRef.set(todo)
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value})
  }
  
  handleSubmit(e) {
    this.addTodo(this.state.inputValue)
    this.setState({inputValue: ''})
    e.preventDefault()
  }

  componentDidMount() {
    this.listenToTodos() 
  }

  getData() {
    fetch("http://localhost:5002/hrdemo-b09ab/us-central1/getData")
    .then((response) => {
      if(response.status === 200) {
        return response.text()
      }
    })
    .then((text) => {
      console.log('text get data',text)
    })
  }

  helloWorld() {
      console.log('something')
    fetch("http://localhost:5002/hrdemo-b09ab/us-central1/helloWorld")
    .then((response) => {
      if(response.status === 200) {
        return response.text()
      }
    })
    .then((text) => {
      console.log('text',text)
    })
  }
  
  render() {
  const { todos, inputValue, name, email } = this.state

    return (
      <div className="App">
        <h1>{`Hello ${name} `}</h1>
        <h3>{email}</h3>
        <hr/>
        <h1 style={{marginBottom: '2%', marginTop: '3%'}}>
          TODOS
        </h1>
        {
          Object.keys(todos || {}).map((todo) => (
            <div style={{marginBottom: '1%'}} key={todo}>
              <label>{`${todos[todo].value} `}</label>
              <input type="checkbox" checked={todos[todo].completed} value={todos[todo].value} onChange={(e) => this.checked(todo)}/>
            </div>
          ))
        }
        <form onSubmit={this.handleSubmit}>
        <input type='text' value={inputValue} onChange={this.handleChange} />
        <button onSubmit={this.handleSubmit}>Submit</button>
      </form>
      <button style={{margin: '15px'}} onClick={() => this.helloWorld()}>Hello World</button>
      <button style={{margin: '15px'}} onClick={() => this.getData()}>Get Data</button>
      </div> 
    );
  }
}

export default App;

/*
*/
