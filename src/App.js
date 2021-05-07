import React, { Component } from "react";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  //hello
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  componentDidMount = async () => {
    try {
      const userResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await userResponse.json();
      this.setState({ monsters: users });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monster"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
