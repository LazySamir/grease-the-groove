import React from "react";
import "./addExercise.css";

class AddExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEx: "",
      newRep:"",
      list: []
    };
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


  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newEx + " " + this.state.newRep
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newEx: "",
      newRep:""
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
      <div className="App">
        <div className="App-entry">
          <h2> Add a new excercise and max reps </h2>
          <br />


          <input
            name="excerciseInputBox"
            className="exercise"
            autoFocus
            type="text"
            placeholder="Excercise Name"
            value={this.state.newEx}
            onChange={e => this.updateInput("newEx", e.target.value)}
          />
          <input
            name="maxRepsInputBox"
            className="maxReps"
            type="number"
            placeholder="Max Reps"
            value={this.state.newRep}
            onChange={e => this.updateInput("newRep", e.target.value)}
          />
          <button
            name="addButton"
            className="add"
            onClick={() => this.addItem()}
            disabled={!this.state.newEx.length || !this.state.newRep.length}
          >&#43; Add
          </button>

          <br /> <br />
          <ul>
            {this.state.list.map(item => {
              return (
                <ul key={item.id} className="exerciseList">
                  <button
                    className="delete"
                    onClick={() => this.deleteItem(item.id)}>
                    x
                  </button>
                  {item.value}
                </ul>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default AddExercise;
