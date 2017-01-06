import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

import { updateGraph, enterNode, enterLink, updateNode, updateLink } from '../utils/graph';


class Graph extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    nodes: PropTypes.array,
    links: PropTypes.array
  };

  static defaultProps = {
    nodes: [],
    links: [],
  }

  componentWillMount() {
    this.force = d3.forceSimulation(this.props.nodes)
      .force('charge', d3.forceManyBody());
  }

  componentDidMount() {
    this.d3Graph = d3.select(this.graph);
    this.force.on('tick', () => {
      this.d3Graph.call((sel) => updateGraph(sel, this.props.nodes));
    });
    if (this.props.nodes.length > 0) {
      this.runGraph.bind(this)(this.props);
    }
  }

  shouldComponentUpdate(nextProps) {
    this.runGraph.bind(this)(nextProps);

    return false;
  }

  runGraph(nextProps) {
    this.d3Graph = d3.select(this.graph);

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

    this.force.nodes(nextProps.nodes);

    try {
      this.force.force('link', d3.forceLink(nextProps.links).distance(50).strength(1));
    } catch (e) {
      console.log('hit err', e);
    }

    this.force.restart();
  }

  render() {
    return (
      <div id="graph-wrapper">
        <svg width={this.props.width} height={this.props.height}>
          <g ref={(i) => (this.graph = i)} />
        </svg>
      </div>
    );
  }
}

export default Graph;
