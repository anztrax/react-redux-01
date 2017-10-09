import React, {PropTypes} from 'react'
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import itemTypes from './itemTypes';

const styles = {
  removeBtn: {
    marginLeft: '10px'
  },
  item :{
    width: '200px',
    border : '1px solid red',
    margin : '5px',
    padding : '5px',
    fontSize : '13px',
    display : 'inline-block',
    marginBottom : '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
  }
};

const cardSource = {
  beginDrag(props){
    return {
      id: props.id,
      value: props.value,
      name : props.name,
      order : props.order
    }
  }
};

const cardTarget = {
  hover(props, monitor, component){
    const dragIndex = monitor.getItem().order;
    const hoverIndex = props.order;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    const upwards = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
    const downwards = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
    const leftwards = dragIndex > hoverIndex && hoverClientX > hoverMiddleX;
    const rightwards = dragIndex < hoverIndex && hoverClientX < hoverMiddleX;

    if (upwards && (leftwards || rightwards)){
      return;
    }

    if (downwards && (leftwards || rightwards)){
      return;
    }

    // Time to actually perform the action
    props.handleMoveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().order = hoverIndex;
  },
};

@DropTarget(itemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(itemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class ImageSliderItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleRemoveItemClick = (event) => {
    const { handleRemoveItem, id } = this.props;
    handleRemoveItem(id);
  };

  render() {
    const { name, order, value, isDragging, connectDragSource, connectDropTarget, image } = this.props;
    const opacity = isDragging ? 0 : 1;

    return  connectDragSource(
      connectDropTarget(
        <div style={{...styles.item, opacity}}>
          <span>Image Slider Item
            <button
              style={styles.removeBtn}
              onClick={this._handleRemoveItemClick}> x </button>
          </span>
          <div>
            <img src={image} width="100" height="100" /><br/>
            <span>name : <input type="text" disabled={true} value={name}/></span>
            <span>order : <input type="text" disabled={true} value={order}/></span>
            <span>value : <input type="text" disabled={true} value={value}/></span>
          </div>
        </div>
      )
    );
  }
}

ImageSliderItem.propTypes = {
  name: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  id : PropTypes.string.isRequired,
  removeItem : PropTypes.func.isRequired,
  handleMoveItem : PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default ImageSliderItem;
