import { values, findIndex, has, each, random, find, isUndefined } from 'lodash';

function maintainNodePositions(oldNodes, nodes, width, height) {
  const kv = {};
  each(oldNodes, (d) => {
    kv[d.key] = d;
  });
  each(nodes, (d) => {
    if (kv[d.key]) {
      // if the node already exists, maintain current position
      d.x = kv[d.key].x;
      d.y = kv[d.key].y;
    } else {
      // else assign it a random position near the center
      d.x = (width / 2) + random(-150, 150);
      d.y = (height / 2) + random(-25, 25);
    }
  });
}

export const genNodes = (mapping, users, connections, oldNodes, width, height) => {
  const nodes = users.map(({ friend }) => ({
    key: friend.id,
    text: friend.name,
    size: 8,
  }));
  const links = [];
  const consVals = values(connections);
  for (const cons of consVals) {
    const { data, userA, userB } = cons;
    for (const key of Object.keys(mapping)) {
      if (mapping[key].node !== false && has(data, key)) {
        const keyCons = data[key];
        for (const { valA, valB } of keyCons) {
          if (findIndex(nodes, { key: valA }) < 0) {
            let target = `${valA}-${valB}`;
            if (!isUndefined(find(nodes, { key: `${valB}-${valA}` }))) {
              target = `${valB}-${valA}`;
            } else if (isUndefined(find(nodes, { key: target }))) {
              nodes.push({
                key: target,
                text: valA,
                size: 4,
              });
            }

            if (isUndefined(find(links, { key: `${userA.id}-${target}` }))) {
              links.push({
                source: userA.id,
                target,
                key: `${userA.id}-${target}`,
                size: 1,
              });
              links.push({
                source: userB.id,
                target,
                key: `${userB.id}-${target}`,
                size: 1,
              });
            }
          }
        }
      }
    }
  }
  console.log(width, height);
  maintainNodePositions(oldNodes, nodes, width, height);
  console.log('GEN NODES', { nodes, links });
  return { nodes, links };
};

export const enterNode = (selection, force) => {
  selection.classed('node', true);

  selection.append('circle')
    .attr('r', (d) => d.size)
    .on('drag', force.drag);

  selection.append('text')
    .attr('x', (d) => d.size + 5)
    .attr('dy', '.35em')
    .text((d) => d.text);
};

export const updateNode = (selection) => {
  selection.attr('transform', (d) => `translate(${d.x},${d.y})`);
};

export const enterLink = (selection) => {
  selection.classed('link', true)
    .attr('stroke-width', (d) => d.size);
};

const getNode = (nodes, key, backupKey) => {
  const found = find(nodes, { key });
  const backupFound = find(nodes, { key: backupKey });
  if (isUndefined(found)) {
    if (isUndefined(backupFound)) {
      return { x: 0, y: 0 };
    }
    return backupFound;
  }
  return found;
};

export const updateLink = (selection, nodes) => {
  selection
    .attr('x1', (d) => getNode(nodes, d.source, d.target).x)
    .attr('y1', (d) => getNode(nodes, d.source, d.target).y)
    .attr('x2', (d) => getNode(nodes, d.target, d.source).x)
    .attr('y2', (d) => getNode(nodes, d.target, d.source).y);
};

export const updateGraph = (selection, nodes) => {
  selection.selectAll('.node')
    .call(updateNode);
  selection.selectAll('.link')
    .call((sel) => updateLink(sel, nodes));
};
