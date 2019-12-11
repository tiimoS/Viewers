import './SelectTree.styl';

import React, { Component } from 'react';

import { Icon } from './../../elements/Icon';
import InputRadio from './InputRadio.js';
import PropTypes from 'prop-types';
import SelectTreeBreadcrumb from './SelectTreeBreadcrumb.js';
import cloneDeep from 'lodash.clonedeep';
import { OHIF } from '@ohif/core';

export class SelectTree extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    searchEnabled: PropTypes.bool,
    selectTreeFirstTitle: PropTypes.string,
    selectTreeSecondTitle: PropTypes.string,
    /** Called when 'componentDidUpdate' is triggered */
    onComponentChange: PropTypes.func,
    /** [{ label, value, items[]}] - An array of items than can be expanded to show child items */
    items: PropTypes.array.isRequired,
    /** fn(evt, item) - Called when a child item is selected; receives event and selected item */
    onSelected: PropTypes.func.isRequired,
  };

  static defaultProps = {
    searchEnabled: true,
    autoFocus: true,
    selectTreeFirstTitle: 'First Level itens',
    items: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: null,
      currentNode: null,
      value: null,
    };
  }

  render() {
    const treeItems = this.getTreeItems();

    return (
      <div className="selectTree selectTreeRoot">
        <div className="treeContent">
          {this.headerItem()}
          <div className="treeOptions">
            {this.state.currentNode && (
              <SelectTreeBreadcrumb
                onSelected={this.onBreadcrumbSelected}
                label={this.state.currentNode.label}
                value={this.state.currentNode.value}
              />
            )}
            <div className="treeInputsWrapper">
              <div className="treeInputs">{treeItems}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate = () => {
    OHIF.log.info('update!');
    if (this.props.onComponentChange) {
      this.props.onComponentChange();
    }
  };

  isLeafSelected = item => item && !Array.isArray(item.items);

  getLabelClass = item => {
    let labelClass = 'treeLeaf';
    if (this.state.searchTerm || Array.isArray(item.items)) {
      labelClass = 'treeNode';
    }
    return labelClass;
  };

  getNeighbours(currentNode) {
    const rootNodes = cloneDeep(this.props.items);
    const siblings = this.searchSiblings(rootNodes, currentNode);
    OHIF.log.info('siblings found', siblings);
    return siblings;
  }

  searchSiblings(nodes, currentNode) {
    // parent has children that are not leafs
    for (let node of nodes) {
      if (this.isParent(node, currentNode)) {
        OHIF.log.info('parent found', node);
        return node.items;
      } else {
        if (node.items) {
          this.searchSiblings(node.items, currentNode);
        }
      }
    }
  }

  isParent(node, currentNode) {
    if (node.items) {
      const children = node.items;
      OHIF.log.info('Checking children', children);
      for (var i = 0; i < children.length; i++) {
        if (children[i].key === currentNode.key) {
          OHIF.log.info('match found');
          return true;
        }
      }
    }
    return false;
  }

  filterItems() {
    const filteredItems = [];
    const rawItems = cloneDeep(this.props.items);
    rawItems.forEach(item => {
      if (Array.isArray(item.items)) {
        item.items.forEach(item => {
          const label = item.label.toLowerCase();
          const searchTerm = this.state.searchTerm.toLowerCase();
          if (label.indexOf(searchTerm) !== -1) {
            filteredItems.push(item);
          }
        });
      } else {
        const label = item.label.toLowerCase();
        const searchTerm = this.state.searchTerm.toLowerCase();
        if (label.indexOf(searchTerm) !== -1) {
          filteredItems.push(item);
        }
      }
    });
    return filteredItems;
  }

  getTreeItems() {
    const storageKey = 'SelectTree';
    let treeItems = null;

    if (this.state.searchTerm) {
      treeItems = this.filterItems();
    } else if (this.state.currentNode) {
      if (this.state.currentNode.items) {
        treeItems = cloneDeep(this.state.currentNode.items);
        OHIF.log.info('Got kids', treeItems);
      } else {
        treeItems = this.getNeighbours(this.state.currentNode);
        OHIF.log.info('Got Siblings:', treeItems);
      }
    } else {
      OHIF.log.info('got nothing, reset selection');
      treeItems = cloneDeep(this.props.items);
    }

    return treeItems.map((item, index) => {
      let itemKey = index;
      if (this.state.currentNode) {
        itemKey += `_${this.state.currentNode.value}`;
      }
      return (
        <InputRadio
          key={itemKey}
          id={`${storageKey}_${item.value}`}
          name={index}
          itemData={item}
          value={item.value}
          label={item.label}
          labelClass={this.getLabelClass(item)}
          onSelected={this.onSelected}
        />
      );
    });
  }

  headerItem = () => {
    let title = this.props.selectTreeFirstTitle;
    if (this.state.currentNode && this.props.selectTreeSecondTitle) {
      title = this.props.selectTreeSecondTitle;
    }

    return (
      <div className="wrapperLabel treeHeader">
        <div className="wrapperText">{title}</div>
        {this.props.searchEnabled && (
          <div className="wrapperSearch">
            <div className="searchIcon">
              <Icon name="search" />
            </div>
            <input
              type="text"
              className="searchInput"
              placeholder="Search labels"
              autoFocus={this.props.autoFocus}
              onChange={this.searchLocations}
              value={this.state.searchTerm ? this.state.searchTerm : ''}
            />
          </div>
        )}
      </div>
    );
  };

  searchLocations = evt => {
    this.setState({
      currentNode: null,
      searchTerm: evt.currentTarget.value,
    });
  };

  onSelected = (event, item) => {
    OHIF.log.info('root onSelected', item);
    OHIF.log.info('state', this.state);
    if (this.isLeafSelected(item)) {
      OHIF.log.info('leaf selected', item);
      this.setState({
        searchTerm: null,
        currentNode: item,
        value: item.value,
      });
      OHIF.log.info('after leaf selected', this.state);
    } else {
      OHIF.log.info('parent selected', this.state);
      this.setState({
        currentNode: item,
      });
    }
    return this.props.onSelected(event, item);
  };

  onBreadcrumbSelected = () => {
    OHIF.log.info('breadcrumb selected');
    this.setState({
      currentNode: null,
    });
  };
}
