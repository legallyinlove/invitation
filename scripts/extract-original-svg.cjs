const fs = require('fs');
const path = require('path');

const source = path.join(
  __dirname,
  '..',
  'public',
  'assets',
  'invite',
  'page-9d8dd47c887ceb3f.js.завантаження',
);
const outDir = path.join(__dirname, '..', 'public', 'assets', 'invite', 'original-svg');
const bundle = fs.readFileSync(source, 'utf8');

const targets = {
  a: 'first-card.svg',
  c: 'calendar.svg',
  i: 'calendar-heart.svg',
  l: 'music-pause.svg',
  n: 'location-building.svg',
  o: 'music-play.svg',
  x: 'rings.svg',
  u: 'telegram-button.svg',
  v: 'final-card.svg',
  w: 'timing-guests.svg',
  S: 'timing-ceremony.svg',
  N: 'timing-banquet.svg',
  b: 'timing-cake.svg',
  y: 'timing-finish.svg',
  E: 'timing-line.svg',
};

function findArrowExpression(name) {
  const marker = `${name}=()=>`;
  const start = bundle.indexOf(marker);
  if (start === -1) {
    throw new Error(`Could not find component ${name}`);
  }

  let depth = 0;
  let quote = '';
  let escaped = false;

  for (let i = start + marker.length; i < bundle.length; i += 1) {
    const ch = bundle[i];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === quote) {
        quote = '';
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }

    if (ch === '(' || ch === '[' || ch === '{') {
      depth += 1;
      continue;
    }

    if (ch === ')' || ch === ']' || ch === '}') {
      depth -= 1;
      continue;
    }

    if (ch === ',' && depth === 0) {
      return bundle.slice(start + marker.length, i);
    }
  }

  throw new Error(`Could not parse component ${name}`);
}

const reactStub = {
  jsx(type, props) {
    return { type, props: props || {} };
  },
  jsxs(type, props) {
    return { type, props: props || {} };
  },
};

const attrMap = {
  className: 'class',
  fillRule: 'fill-rule',
  clipRule: 'clip-rule',
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  viewBox: 'viewBox',
};

const skipAttrs = new Set(['children', 'key', 'ref']);

function toKebab(name) {
  return attrMap[name] || name.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function childArray(children) {
  if (children === undefined || children === null || children === false) {
    return [];
  }
  return Array.isArray(children) ? children : [children];
}

function nodeToSvg(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return escapeAttr(node);
  }

  if (!node || typeof node.type !== 'string') {
    return '';
  }

  const props = node.props || {};
  const attrs = Object.entries(props)
    .filter(([name, value]) => !skipAttrs.has(name) && value !== undefined && value !== null && value !== false)
    .map(([name, value]) => (value === true ? toKebab(name) : `${toKebab(name)}="${escapeAttr(value)}"`))
    .join(' ');
  const children = childArray(props.children).map(nodeToSvg).join('');
  const open = attrs ? `<${node.type} ${attrs}>` : `<${node.type}>`;

  return `${open}${children}</${node.type}>`;
}

function findSvgNode(node) {
  if (!node || typeof node !== 'object') {
    return null;
  }

  if (node.type === 'svg') {
    return node;
  }

  for (const child of childArray(node.props?.children)) {
    const found = findSvgNode(child);
    if (found) {
      return found;
    }
  }

  return null;
}

fs.mkdirSync(outDir, { recursive: true });

for (const [componentName, filename] of Object.entries(targets)) {
  const expression = findArrowExpression(componentName);
  const factory = new Function('Z', 'H', `return ${expression};`);
  const tree = findSvgNode(factory(reactStub, reactStub));
  const svg = nodeToSvg(tree);

  if (!svg.startsWith('<svg')) {
    throw new Error(`${componentName} did not produce an svg`);
  }

  fs.writeFileSync(path.join(outDir, filename), `${svg}\n`, 'utf8');
  console.log(`Extracted ${componentName} -> ${filename}`);
}
