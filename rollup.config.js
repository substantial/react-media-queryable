import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

export default {
  entry: "src/index.js",
  targets: [
    { dest: "lib/index.cjs.js", format: "cjs" },
    { dest: "lib/index.es.js", format: "es" }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**"
    })
  ]
};
