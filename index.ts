import { promises as fs } from 'fs';
import { compileTemplate } from 'vue/compiler-sfc';
import { optimize as optimizeSvg } from 'svgo';
import { Plugin } from 'vite'
import _debug from 'debug';

const debug = _debug('vite-svg-loader');

export interface SvgLoaderOptions {
  svgoConfig?: any;
  svgo?: boolean;
  defaultImport?: 'raw' | 'component' | 'url' | 'uri';
}

export default function svgLoader(options: SvgLoaderOptions = {}): Plugin {
  const { svgoConfig, svgo, defaultImport } = options;

  const svgRegex = /\.svg(\?(raw|component|skipsvgo|uri))?$/;

  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load(id: string) {
      if (!id.match(svgRegex)) {
        return;
      }

      const [path, query] = id.split('?', 2);

      const importType = query || defaultImport;

      if (importType === 'url') {
        return; // Use default svg loader
      }

      let svg: string;

      try {
        svg = await fs.readFile(path, 'utf-8');
      } catch (ex) {
        debug('\n', `${id} couldn't be loaded by vite-svg-loader, fallback to default loader`)

        return;
      }

      // If URI format is requested
      if (importType === 'uri') {
        // Optimize SVG if svgo is enabled
        if (svgo !== false && query !== 'skipsvgo') {
          svg = optimizeSvg(svg, {
            ...svgoConfig,
            path
          }).data;
        }
        
        // Convert SVG to data URI
        const encodedSvg = svg
          .trim()
          .replace(/"/g, "'")
          .replace(/%/g, '%25')
          .replace(/#/g, '%23')
          .replace(/{/g, '%7B')
          .replace(/}/g, '%7D')
          .replace(/</g, '%3c')
          .replace(/>/g, '%3e')
          .replace(/\s+/g, ' ');

        const dataUri = `data:image/svg+xml,${encodedSvg}`;
        return `export default ${JSON.stringify(dataUri)}`;
      }

      if (importType === 'raw') {
        return `export default ${JSON.stringify(svg)}`;
      }

      if (svgo !== false && query !== 'skipsvgo') {
        svg = optimizeSvg(svg, {
          ...svgoConfig,
          path
        }).data;
      }

      // To prevent compileTemplate from removing the style tag
      svg = svg.replace(/<style/g, '<component is="style"').replace(/<\/style/g, '</component');

      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: svg,
        filename: path,
        transformAssetUrls: false
      });

      return `${code}\nexport default { render: render }`;
    }
  };
}
