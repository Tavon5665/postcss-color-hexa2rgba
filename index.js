function hexToRgba(oldColor) {
  // 去除 # 号
  const hexColor = oldColor.replace('#', '');

  // 分离颜色值和透明度值
  const color = hexColor.substring(0, 6);
  const alpha = hexColor.substring(6, 8);

  // 将十六进制颜色转换为十进制
  const red = parseInt(color.substring(0, 2), 16);
  const green = parseInt(color.substring(2, 4), 16);
  const blue = parseInt(color.substring(4, 6), 16);

  // 将十六进制透明度转换为十进制
  const opacity = parseInt(alpha, 16) / 255;

  // 返回RGBA格式的字符串
  return `rgba(${red}, ${green}, ${blue}, ${opacity.toFixed(2)})`;
}

function isIncludeFile(include, file) {
  const typeString = Object.prototype.toString.call(include);
  if (typeString === '[object String]') {
    return file.indexOf(include) > -1;
  }
  if (typeString === '[object RegExp]') {
    return include.test(file);
  }
  if (typeString === '[object Array]') {
    return include.filter((p) => {
      const pType = Object.prototype.toString.call(p);
      if (pType === '[object RegExp]') {
        return p.test(file);
      }
      if (pType === '[object String]') {
        return file.indexOf(include) > -1;
      }
      return false;
    });
  }
}

const plugin = (options = {}) => ({
  postcssPlugin: 'postcss-plugin-hexa2rgba',
  prepare(result) {
    const file = result.root && result.root.source && result.root.source.input.file;
    const { include = '' } = options;
    if (include) {
      const isInclude = isIncludeFile(include, file);
      if (!isInclude) return;
    }
    return {
      Declaration(decl) {
        if (/#[A-Fa-f0-9]{8}/.test(decl.value)) {
          decl.value = decl.value.replace(/(#)[A-Fa-f0-9]{8}/g, (matchStr) => hexToRgba(matchStr));
        }
      },
    };
  },
});

module.exports = plugin;
module.exports.postcss = true;
