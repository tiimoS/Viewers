import { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: '#d5d5d5',
      cursor: 'pointer',
    },
    '&:focus': {
      backgroundColor: '#337ab7',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
        cursor: 'pointer',
      },
    },
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    cursor: 'pointer',
  },
}))(MenuItem);

export default class InputRadio extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    itemData: PropTypes.object.isRequired,
    onSelected: PropTypes.func.isRequired,
  };

  render() {
    return (
      <StyledMenuItem onClick={this.onSelected}>
        <ListItemText primary={this.props.label} value={this.props.value} />
      </StyledMenuItem>
    );
  }

  onSelected = evt => {
    this.props.onSelected(evt, this.props.itemData);
  };
}
