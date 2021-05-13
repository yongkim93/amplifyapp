import React from "react";
import "./DragAndDrop.scss";

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  dragStartHandler(e) {
    e.persist();
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
      e.target.classList.add("hide");
    }, 0);
  }
  dragEnterHandler(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }

  dragOverHandler(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }

  dragLeaveHandler(e) {
    e.target.classList.remove("drag-over");
  }

  dropHandler(e) {
    e.target.classList.remove("drag-over");

    // get the draggable element
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove("hide");
  }

  render() {
    return (
      <div>
        <div class="container">
          <h1>JavaScript - Drag and Drop</h1>
          <div class="drop-targets">
            <div
              class="box"
              onDragEnter={this.dragEnterHandler}
              onDragOver={this.dragOverHandler}
              onDragLeave={this.dragLeaveHandler}
              onDrop={this.dropHandler}
            >
              <div
                class="item"
                id="item"
                draggable="true"
                onDragStart={this.dragStartHandler}
              ></div>
            </div>
            <div
              class="box"
              onDragEnter={this.dragEnterHandler}
              onDragOver={this.dragOverHandler}
              onDragLeave={this.dragLeaveHandler}
              onDrop={this.dropHandler}
            ></div>
            <div
              class="box"
              onDragEnter={this.dragEnterHandler}
              onDragOver={this.dragOverHandler}
              onDragLeave={this.dragLeaveHandler}
              onDrop={this.dropHandler}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragAndDrop;
