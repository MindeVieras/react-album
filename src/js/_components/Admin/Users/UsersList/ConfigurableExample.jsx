
import React, { PureComponent, PropTypes } from 'react';
import VirtualList from 'react-virtual-list';

const makeItem = (i) => ({
  id: i,
  title: `Media heading #${i+1}`,
  text: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.',
});

const ConfigurableExample = (MyList) => {

  let MyVirtualList = VirtualList()(MyList)

  return class MyConfigurableList extends PureComponent {
    constructor() {
      super()

      const defaultItemCount = 100000

      const items = []

      for (let i = 0; i < defaultItemCount; i++) {
        items[i] = makeItem(i)
      }

      const state = {
        itemHeight: 100,
        itemCount: defaultItemCount,
        items: items,
        contained: true,
        containerHeight: 450,
        itemBuffer: 0
      }

      this.state = state;

      // const options = {
      //   container: this.refs.container
      // }

      // MyVirtualList = VirtualList(options)(MyList);
    };

    // componentDidMount() {

    //   const options = {
    //     container: this.refs.container
    //   }

    //   MyVirtualList = VirtualList(options)(MyList)
    // }

    render() {
      return (
        <div ref="container" style={{ overflow: 'scroll', height: this.state.containerHeight }}>
          <MyVirtualList
            items={this.state.items}
            itemBuffer={this.state.itemBuffer}
            itemHeight={this.state.itemHeight}
          />
        </div>
      );
    };
  };
};

export default ConfigurableExample;