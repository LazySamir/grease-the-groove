import React, {Component} from 'react';

/* Import Components */
import Input from '../components/Input';
import Button from '../components/Button'

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      exercise: {
        name: '',
        reps: ''
      }
    }
    this.handleReps = this.handleReps.bind(this);
    this.handleExercise = this.handleExercise.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
      window.removeEventListener(
        "beforeunload",
        this.saveStateToLocalStorage.bind(this)
      );

      // saves if component has a chance to unmount
      this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleExercise(e) {
   let value = e.target.value;
   this.setState( prevState => ({ exercise :
        {...prevState.exercise, name: value
        }
      }), () => console.log(this.state.exercise))
  }

  handleReps(e) {
       let value = e.target.value;
   this.setState( prevState => ({ exercise :
        {...prevState.exercise, reps: value
        }
      }), () => console.log(this.state.exercise))
  }

  // handleInput(e) {
  //      let value = e.target.value;
  //      let name = e.target.name;
  //  this.setState( prevState => ({ exercise :
  //       {...prevState.exercise, [name]: value
  //       }
  //     }), () => console.log(this.state.exercise))
  // }

  handleFormSubmit(e) {
    e.preventDefault();
    // let userData = this.state.exercise;
    //
    // fetch('http://example.com',{
    //     method: "POST",
    //     body: JSON.stringify(userData),
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //   }).then(response => {
    //     response.json().then(data =>{
    //       console.log("Successful" + data);
    //     })
    // })
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.exercise.name + " " + this.state.exercise.reps
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);
    console.log(newItem)

    // update state with new list, reset the new item input
    console.log("updating state")
    this.setState({
      list,
      exercise: {
        name: '',
        reps: ''
      }
    });

    // update localStorage
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("newItem", "");
  }
  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });

    // update localStorage
    localStorage.setItem("list", JSON.stringify(updatedList));
  }

  render() {
    return (
      <div>
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
          <h3>Add a new excercise and max reps</h3>
          <Input
            type={'text'}
            title= {'Exercise Name'}
            autofocus="true"
            name= {'exercise'}
            value={this.state.exercise.name}
            placeholder = {'Enter an exercise'}
            handleChange = {this.handleExercise}
          />

          <Input
            type={'number'}
            name={'reps'}
            title= {'Max Reps'}
            value={this.state.exercise.reps}
            placeholder = {'Enter your age'}
            handleChange={this.handleReps}
          />

          <Button
            action = {this.handleFormSubmit}
            type = {'primary'}
            name = {'add'}
            title = {'+Add'}
          />
        </form>
        <div>
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button onClick={() => this.deleteItem(item.id)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default FormContainer;
