'use strict';
const forEach = require('ramda/src/forEach');
const find = require('ramda/src/find');
const reject = require('ramda/src/reject');
const addIndex = require('ramda/src/addIndex');
const map = require('ramda/src/map');
const HtmlParser = require('htmlparser2').Parser;
const DomHandler = require('domhandler').DomHandler;
const ProcessingInstructions = require('./processing-instructions');
const IsValidNodeDefinitions = require('./is-valid-node-definitions');
const utils = require('./utils');

function Html2ReactParser(options) {
  function parseHtmlToTree(html) {
    options = options || {};
    options.decodeEntities = true;
    const handler = new DomHandler();
    const parser = new HtmlParser(handler, options);
    parser.parseComplete(html);
    return handler.dom.filter(function (element) {
      return element.type !== 'directive';
    });
  };

  function traverseDom(node, isValidNode, processingInstructions, preprocessingInstructions,
    index) {
    if (isValidNode(node)) {
      forEach(function (preprocessingInstruction) {
        if (preprocessingInstruction.shouldPreprocessNode(node)) {
          preprocessingInstruction.preprocessNode(node, index);
        }
      }, preprocessingInstructions || []);

      const processingInstruction = find(function (processingInstruction) {
        return processingInstruction.shouldProcessNode(node);
      }, processingInstructions || []);
      if (processingInstruction != null) {
        const children = reject(function (x) {return x == null || x === false;},
          addIndex(map)(function (child, i) {
            return traverseDom(child, isValidNode, processingInstructions,
              preprocessingInstructions, i);
          }, node.children || []));

        if (processingInstruction.replaceChildren) {
          return utils.createElement(node, index, node.data, [
            processingInstruction.processNode(node, children, index),
          ]);
        } else {
          return processingInstruction.processNode(node, children, index);
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  function parseWithInstructions(html, isValidNode, processingInstructions,
      preprocessingInstructions) {
    const domTree = parseHtmlToTree(html);
    const list = domTree.map(function (domTreeItem, index) {
      return traverseDom(domTreeItem, isValidNode, processingInstructions,
        preprocessingInstructions, index);
    });
    return list.length <= 1 ? list[0] : list;
  };

  function parse(html) {
    const processingInstructions = new ProcessingInstructions();
    return parseWithInstructions(html,
      IsValidNodeDefinitions.alwaysValid,
      processingInstructions.defaultProcessingInstructions);
  };

  return {
    parse: parse,
    parseWithInstructions: parseWithInstructions,
  };
};

module.exports = Html2ReactParser;
