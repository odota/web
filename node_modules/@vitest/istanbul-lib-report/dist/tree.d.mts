//#region src/tree.d.ts
/**
 * A partial visitor only having the functions of interest to the caller.
 *
 *   * `onStart(root, state)` - called before traversal begins
 *   * `onSummary(node, state)` - called for every summary node
 *   * `onDetail(node, state)` - called for every detail node
 *   * `onSummaryEnd(node, state)` - called after all children have been visited for
 *      a summary node.
 *   * `onEnd(root, state)` - called after traversal ends
 */
export interface PartialVisitor<N extends BaseNode = BaseNode> {
  onStart?(root: N, state?: any): void;
  onSummary?(node: N, state?: any): void;
  onDetail?(node: N, state?: any): void;
  onSummaryEnd?(node: N, state?: any): void;
  onEnd?(root: N, state?: any): void;
}
/**
 * An object with methods that are called during the traversal of the coverage tree.
 * A visitor has the following methods that are called during tree traversal.
 *
 *   * `onStart(root, state)` - called before traversal begins
 *   * `onSummary(node, state)` - called for every summary node
 *   * `onDetail(node, state)` - called for every detail node
 *   * `onSummaryEnd(node, state)` - called after all children have been visited for
 *      a summary node.
 *   * `onEnd(root, state)` - called after traversal ends
 *
 * @param delegate - a partial visitor that only implements the methods of interest
 *  The visitor object supplies the missing methods as noops. For example, reports
 *  that only need the final coverage summary need implement `onStart` and nothing
 *  else. Reports that use only detailed coverage information need implement `onDetail`
 *  and nothing else.
 * @constructor
 */
declare class Visitor<N extends BaseNode = BaseNode> {
  delegate: PartialVisitor<N> | Visitor<N> | undefined;
  onStart: (root: N, state?: any) => void;
  onSummary: (node: N, state?: any) => void;
  onDetail: (node: N, state?: any) => void;
  onSummaryEnd: (node: N, state?: any) => void;
  onEnd: (root: N, state?: any) => void;
  constructor(delegate?: PartialVisitor<N> | Visitor<N>);
}
declare class CompositeVisitor<N extends BaseNode = BaseNode> extends Visitor<N> {
  visitors: Visitor<N>[];
  constructor(visitors: (Visitor<N> | PartialVisitor<N>)[] | Visitor<N> | PartialVisitor<N>);
}
declare abstract class BaseNode {
  abstract getParent(): BaseNode | null;
  abstract getChildren(): BaseNode[];
  abstract isSummary(): boolean;
  isRoot(): boolean;
  /**
   * visit all nodes depth-first from this node down. Note that `onStart`
   * and `onEnd` are never called on the visitor even if the current
   * node is the root of the tree.
   * @param visitor a full visitor that is called during tree traversal
   * @param state optional state that is passed around
   */
  visit(visitor: Visitor<any>, state?: any): void;
}
/**
 * abstract base class for a coverage tree.
 * @constructor
 */
declare class BaseTree<N extends BaseNode = BaseNode> {
  root: N;
  constructor(root: N);
  /**
   * returns the root node of the tree
   */
  getRoot(): N;
  /**
   * visits the tree depth-first with the supplied partial visitor
   * @param visitor - a potentially partial visitor
   * @param state - the state to be passed around during tree traversal
   */
  visit(visitor: Visitor<N> | PartialVisitor<N>, state?: any): void;
}
//#endregion
export { BaseNode, BaseTree, CompositeVisitor, Visitor };