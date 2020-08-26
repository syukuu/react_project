import React, { Component } from "react";

import Analysis from "./Analysis";
import Sales from "./Sales";

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Analysis />
        <Sales />
      </div>
    );
  }
}
