import './SelectTree.styl';

import React, { Component } from 'react';
import InputRadio from './InputRadio.js';
import PropTypes from 'prop-types';
import SelectTreeBreadcrumb from './SelectTreeBreadcrumb.js';

export class SelectTree extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    /** Called when 'componentDidUpdate' is triggered */
    onComponentChange: PropTypes.func,
    /** [{ label, value, items[]}] - An array of items than can be expanded to show child items */
    items: PropTypes.array.isRequired,
    /** fn(evt, item) - Called when a child item is selected; receives event and selected item */
    onSelected: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      treeItems: this.getMenuItems(props.items),
      parentNode: null,
      prevTreeItemsPath: [],
      clickPath: [],
    };
  }

  render() {
    return (
      <div className="selectTree selectTreeRoot">
        <div className="treeContent">
          <div className="treeOptions">
            {this.getBreadCrumbs()}
            <div className="treeInputsWrapper">
              <div className="treeInputs">{this.state.treeItems}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate = () => {
    if (this.props.onComponentChange) {
      this.props.onComponentChange();
    }
  };

  isLeafSelected = item => item && !Array.isArray(item.items);

  onSelected = (event, item) => {
    this.setState({
      value: item.value,
    });
    // Item has children nodes, load new state and next leve menu items
    if (item.items) {
      let clickPath = this.state.clickPath;
      clickPath.push(this.state.parentNode);

      let path = this.state.prevTreeItemsPath;
      path.push(this.state.treeItems);

      const treeItems = this.getMenuItems(item.items);

      this.setState({
        parentNode: item,
        clickPath: clickPath,
        prevTreeItemsPath: path,
        treeItems: treeItems,
      });
    }
    return this.props.onSelected(event, item);
  };

  onBreadcrumbSelected = () => {
    let path = this.state.prevTreeItemsPath;
    let prevItems = path.pop();

    let prevValue = this.state.parentNode.value;

    let clickPath = this.state.clickPath;
    let prevParent = clickPath.pop();

    this.setState({
      prevTreeItemsPath: path,
      clickPath: clickPath,
      parentNode: prevParent,
      treeItems: prevItems,
      value: prevValue,
    });
  };

  getMenuItems(newTreeItems) {
    const storageKey = 'SelectTree';
    return newTreeItems.map((item, index) => {
      return (
        <InputRadio
          key={item.key}
          id={`${storageKey}_${item.value}`}
          itemData={item}
          value={item.value}
          label={item.label}
          labelClass={'treeLeaf'}
          onSelected={this.onSelected}
        />
      );
    });
  }

  getBreadCrumbs() {
    if (this.state.parentNode) {
      return (
        <SelectTreeBreadcrumb
          onSelected={this.onBreadcrumbSelected}
          label={this.state.parentNode.label}
          value={this.state.parentNode.value}
        />
      );
    }
  }
}
