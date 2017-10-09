import React, { PropTypes } from 'react';
import { ImageSliderItemList } from '../item/index';

class ImageSliderLocale extends React.Component{
  constructor(props){
    super(props);
  }

  _handleAddItemAddClick = () => {
    const { handleAddItem } = this.props;
    handleAddItem();
  };

  render(){
    const { items, locale, order, handleRemoveItem, handleMoveItem } = this.props;
    return (
      <div>
        <div>
          <strong>locale : </strong>{locale}
          <span style={{'marginLeft' : '10px'}}>
            <button onClick={this._handleAddItemAddClick}>+ add item</button>
          </span>
        </div>
        <ImageSliderItemList items={items}
                             locale={locale}
                             handleRemoveItem={handleRemoveItem}
                             handleMoveItem={handleMoveItem} />
      </div>
    );
  }
}
ImageSliderLocale.propTypes = {
  items : PropTypes.array.isRequired,
  locale : PropTypes.string.isRequired,
  order : PropTypes.number.isRequired,
  handleAddItem : PropTypes.func.isRequired,
  handleRemoveItem : PropTypes.func.isRequired,
  handleMoveItem : PropTypes.func.isRequired
};

export default ImageSliderLocale;
