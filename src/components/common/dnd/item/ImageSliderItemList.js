import React, { PropTypes } from 'react';
import ImageSliderItem from './ImageSliderItem';
import itemTypes from './itemTypes';
import { DropTarget } from 'react-dnd';
const styles = {
  container : {
    border: '1px solid black',
    padding : '10px',
    marginTop : '10px',
    minHeight : '100px'
  }
};

const cardTarget = {
  drop(props, monitor, component) {
    const dragIndex = monitor.getItem().order;
    const hoverIndex = props.order;
    const dragLocale = monitor.getItem().locale;
    const hoverLocale = props.locale;

    if(hoverLocale !== dragLocale){
      console.log('we do the action !');
      props.handleMoveItem(dragIndex, dragLocale, hoverIndex, hoverLocale);
    }
  },
  hover(props, monitor, component){
  },
};

@DropTarget(itemTypes.CARD, cardTarget, (connectDragSource, monitor) => ({
  connectDropTarget: connectDragSource.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
}))
class ImageSliderItemList extends React.Component{
  constructor(props){
    super(props);
  }

  _renderImageSliderItems = () => {
    const { items, handleRemoveItem, locale } = this.props;
    const itemList = [];

    items.map((item, i) => {
      const { name, order, value, id, image } = item;
      if (item !== undefined) {
        itemList.push(
          <ImageSliderItem
            name={name}
            order={i}
            value={value}
            locale={locale}
            handleRemoveItem={handleRemoveItem}
            handleMoveItem={this._handleMoveItem}
            image={image}
            id={id}/>
        )
      }
    });
    return itemList;
  };

  _handleMoveItem = (dragIndex,dragLocale, hoverIndex, hoverLocale) => {
    const { handleMoveItem } = this.props;
    handleMoveItem(dragIndex, dragLocale, hoverIndex, hoverLocale);
  };

  render(){
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={styles.container}>
        {this._renderImageSliderItems()}
      </div>
    )
  }
}
ImageSliderItemList.propTypes = {
  items : PropTypes.array.isRequired,
  handleRemoveItem : PropTypes.func.isRequired,
  handleMoveItem: PropTypes.func.isRequired,
  connectDropTarget : PropTypes.func.isRequired
};

export default ImageSliderItemList;
