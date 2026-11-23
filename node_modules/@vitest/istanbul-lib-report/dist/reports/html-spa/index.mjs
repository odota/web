import e from "../../report-base.mjs";
import t from "../html/index.mjs";
import n from "node:path";
import r from "node:fs";
//#region src/reports/html-spa/index.ts
const i = {
	getPath(e) {
		if (typeof e == "string") return e;
		let t = e.getQualifiedName();
		return e.isSummary() ? t === "" ? t = "index.html" : t += "/index.html" : t += ".html", t;
	},
	relativePath(e, t) {
		let r = this.getPath(t), i = n.dirname(this.getPath(e));
		return n.relative(i, r);
	},
	assetPath(e, t) {
		return this.relativePath(this.getPath(e), t);
	}
};
var HtmlSpaReport = class extends e {
	constructor(e = {}) {
		super({ summarizer: "nested" }), this.verbose = e.verbose || !1, this.linkMapper = e.linkMapper || i, this.subdir = e.subdir || "", this.date = Date(), this.skipEmpty = e.skipEmpty, this.htmlReport = new t(e), this.htmlReport.getBreadcrumbHtml = function() {
			return "<a href=\"javascript:history.back()\">Back</a>";
		}, this.htmlReport.theme = "legacy", this.metricsToShow = e.metricsToShow || [
			"lines",
			"branches",
			"functions"
		];
	}
	getWriter(e) {
		return this.subdir ? e.writer.writerForDir(this.subdir) : e.writer;
	}
	onStart(e, t) {
		this.htmlReport.onStart(e, t);
		let i = this.getWriter(t), a = n.resolve(import.meta.dirname, "./assets");
		r.readdirSync(a).forEach((e) => {
			let t = n.resolve(a, e), o = r.statSync(t), s;
			o.isFile() && (s = "./" + e, this.verbose && console.log("Write asset: " + s), i.copyFile(t, s));
		});
	}
	onDetail(e, t) {
		this.htmlReport.onDetail(e, t);
	}
	getMetric(e, t, n) {
		let r = e.total === 0;
		return {
			total: e.total,
			covered: e.covered,
			skipped: e.skipped,
			missed: e.total - e.covered,
			pct: r ? 0 : e.pct,
			classForPercent: r ? "empty" : n.classForPercent(t, typeof e.pct == "number" ? e.pct : NaN)
		};
	}
	toDataStructure(e, t) {
		let n = e.getCoverageSummary(), r = {
			statements: this.getMetric(n.statements, "statements", t),
			branches: this.getMetric(n.branches, "branches", t),
			functions: this.getMetric(n.functions, "functions", t),
			lines: this.getMetric(n.lines, "lines", t)
		};
		return {
			file: e.getRelativeName(),
			isEmpty: n.isEmpty(),
			metrics: r,
			children: e.isSummary() && e.getChildren().map((e) => this.toDataStructure(e, t))
		};
	}
	onEnd(e, t) {
		let n = this.toDataStructure(e, t), r = this.getWriter(t).writeFile(this.linkMapper.getPath(e));
		r.write(`<!doctype html>
            <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <link rel="stylesheet" href="spa.css" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                </head>
                <body>
                    <div id="app" class="app"></div>
                    <script>
                        window.data = ${JSON.stringify(n)};
                        window.generatedDatetime = ${JSON.stringify(String(Date()))};
                        window.metricsToShow = ${JSON.stringify(this.metricsToShow)};
                    <\/script>
                    <script src="bundle.js"><\/script>
                </body>
            </html>`), r.close();
	}
};
//#endregion
export { HtmlSpaReport as default };
