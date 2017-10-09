import React, { PropTypes } from 'react';
import ImageSliderItem from './ImageSliderItem';

class ImageSliderItemList extends React.Component{
  constructor(props){
    super(props);
  }

  _renderImageSliderItems = () => {
    const { items } = this.props;
    return items.map(item => {
      const { name, order, value } = item;
      return (
        <ImageSliderItem
          name={name}
          order={order}
          value={value} />
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
  items : PropTypes.array.isRequired
};

export default ImageSliderItemList;
