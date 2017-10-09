import React, { PropTypes } from 'react';
import ImageSliderItem from './ImageSliderItem';

class ImageSliderItemList extends React.Component{
  constructor(props){
    super(props);
  }

  _renderImageSliderItems = () => {
    const { items, handleRemoveItem } = this.props;
    return items.map(item => {
      const { name, order, value, id } = item;
      return (
        <ImageSliderItem
          name={name}
          order={order}
          value={value}
          handleRemoveItem={handleRemoveItem}
          id={id} />
      )
    });
  };

  render(){
    return (
      <div style={{border: '1px solid black', padding : '10px', 'marginTop' : '10px'}}>
        {this._renderImageSliderItems()}
      </div>
    )
  }
}
ImageSliderItemList.propTypes = {
  items : PropTypes.array.isRequired,
  handleRemoveItem : PropTypes.func.isRequired
};

export default ImageSliderItemList;
