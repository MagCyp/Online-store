export const generateClassNames = (classNames, styles) => {
  return Array.isArray(classNames)
    ? classNames.map(name => styles[name]).join(' ')
    : classNames
        .split(' ')
        .map(name => styles[name])
        .join(' ');
};
