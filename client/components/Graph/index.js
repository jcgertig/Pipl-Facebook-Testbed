/* global d3 */

require('./styles.css');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { updateGraph, enterNode, enterLink, updateNode, updateLink } from 'utils/graph';


class Graph extends Component {

  componentWillMount() {
    this.force = d3.layout.force()
      .charge(-300)
      .linkDistance(50)
      .size([this.props.width, this.props.height]);
  }

  componentDidMount() {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.graph));
    this.force.on('tick', () => {
      // after force calculation starts, call updateGraph
      // which uses d3 to manipulate the attributes,
      // and React doesn't have to go through lifecycle on each tick
      this.d3Graph.call((sel) => updateGraph(sel, this.props.nodes));
    });
    if (this.props.nodes.length > 0) {
      this.runGraph(this.props);
    }
  }

  shouldComponentUpdate(nextProps) {
    this.runGraph(nextProps);

    return false;
  }

  runGraph = (nextProps) => {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.graph));

    const d3Nodes = this.d3Graph.selectAll('.node')
      .data(nextProps.nodes, (node) => node.key);
    d3Nodes.enter().append('g').call((selection) => enterNode(selection, this.force));
    d3Nodes.exit().remove();
    d3Nodes.call(updateNode);

    const d3Links = this.d3Graph.selectAll('.link')
      .data(nextProps.links, (link) => link.key);
    d3Links.enter().insert('line', '.node').call(enterLink);
    d3Links.exit().remove();
    d3Links.call((sel) => updateLink(sel, nextProps.nodes));

    this.force.nodes(nextProps.nodes).links(nextProps.links);
    this.force.start();
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <g ref={(i) => (this.graph = i)} />
      </svg>
    );
  }
}

export default Graph;
