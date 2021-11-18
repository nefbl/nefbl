export function toNode(tagname) {

    if (['svg', 'circle', 'path', 'rect', 'ellipse', 'line', 'polyline', 'polygon', 'text'].indexOf(tagname) > -1) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagname);
    } else {
        return document.createElement(tagname);
    }

}
