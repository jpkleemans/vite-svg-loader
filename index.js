const fs = require("fs").promises;
const { compileTemplate } = require("@vue/compiler-sfc");
const { optimize: optimizeSvg } = require("svgo");

module.exports = function svgLoader(options = {}) {
  const { svgoConfig, svgo } = options;

  const svgRegex = /\.svg(\?(raw|component))?$/;

  return {
    name: "svg-loader",
    enforce: "pre",

    resolveid(id) {
      if (id.match(svgRegex)) {
        return id;
      }
    },

    async load(id) {
      if (!id.match(svgRegex)) {
        return;
      }

      const [path, query] = id.split("?", 2);

      let svg = await fs.readFile(path, "utf-8");

      if (query === "raw") {
        return `export default ${JSON.stringify(svg)}`;
      }

      let deletePath = false;
      if (svgoConfig && !svgoConfig.path) {
        svgoConfig.path = path;
        deletePath = true;
      }

      if (svgo !== false) {
        svg = optimizeSvg(svg, svgoConfig).data;
      }

      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: svg,
        filename: path,
        transformAssetUrls: false
      });

      if (deletePath) {
        delete svgoConfig.path;
      }

      return `${code}\nexport default { render: render }`;
    }
  };
};

module.exports.default = module.exports;

