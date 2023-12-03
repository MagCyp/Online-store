export const generateClassNames = (classNames: string, styles: any) => {
  return Array.isArray(classNames)
    ? classNames.map(name => styles[name]).join(' ')
    : classNames
        .split(' ')
        .map(name => styles[name])
        .join(' ');
};
