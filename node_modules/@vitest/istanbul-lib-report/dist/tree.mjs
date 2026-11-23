//#region src/tree.ts
var Visitor = class {
	constructor(e) {
		this.delegate = e;
	}
};
[
	"Start",
	"End",
	"Summary",
	"SummaryEnd",
	"Detail"
].map((e) => `on${e}`).forEach((e) => {
	Object.defineProperty(Visitor.prototype, e, {
		writable: !0,
		value(t, n) {
			let r = this.delegate;
			typeof r[e] == "function" && r[e](t, n);
		}
	});
});
var CompositeVisitor = class extends Visitor {
	constructor(e) {
		super(), Array.isArray(e) || (e = [e]), this.visitors = e.map((e) => e instanceof Visitor ? e : new Visitor(e));
	}
};
[
	"Start",
	"Summary",
	"SummaryEnd",
	"Detail",
	"End"
].map((e) => `on${e}`).forEach((e) => {
	Object.defineProperty(CompositeVisitor.prototype, e, { value(t, n) {
		this.visitors.forEach((r) => {
			r[e](t, n);
		});
	} });
});
var BaseNode = class {
	isRoot() {
		return !this.getParent();
	}
	visit(e, t) {
		this.isSummary() ? e.onSummary(this, t) : e.onDetail(this, t), this.getChildren().forEach((n) => {
			n.visit(e, t);
		}), this.isSummary() && e.onSummaryEnd(this, t);
	}
}, BaseTree = class {
	constructor(e) {
		this.root = e;
	}
	getRoot() {
		return this.root;
	}
	visit(e, t) {
		let n = e instanceof Visitor ? e : new Visitor(e);
		n.onStart(this.getRoot(), t), this.getRoot().visit(n, t), n.onEnd(this.getRoot(), t);
	}
};
//#endregion
export { BaseNode, BaseTree, CompositeVisitor, Visitor };
