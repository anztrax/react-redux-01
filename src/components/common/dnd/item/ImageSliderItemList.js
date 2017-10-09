import React, { PropTypes } from 'react';
import ImageSliderItem from './ImageSliderItem';
import itemTypes from './itemTypes';

class ImageSliderItemList extends React.Component{
  constructor(props){
    super(props);
  }

  _renderImageSliderItems = () => {
    const { items, handleRemoveItem } = this.props;
    return items.map((item, index) => {
      const { name, order, value, id, image } = item;
      return (
        <ImageSliderItem
          name={name}
          order={index}
          value={value}
          handleRemoveItem={handleRemoveItem}
          handleMoveItem={this._handleMoveItem}
          image={image}
          id={id} />
      )
    });
  };

  _handleMoveItem = (dragIndex,hoverIndex) => {
    const { handleMoveItem } = this.props;
    handleMoveItem(dragIndex, hoverIndex);
  };

  render(){
    return (
      <div style={{border: '1px solid black', padding : '10px', 'marginTop' : '10px', minHeight : '100px'}}>
        {this._renderImageSliderItems()}
      </div>
    )
  }
}
ImageSliderItemList.propTypes = {
  items : PropTypes.array.isRequired,
  handleRemoveItem : PropTypes.func.isRequired,
  handleMoveItem: PropTypes.func.isRequired
};

export default ImageSliderItemList;