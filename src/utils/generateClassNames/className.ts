export const generateClassNames = (
  classNames: string | string[],
  styles: Record<string, string>,
): string => {
  if (Array.isArray(classNames)) {
    return classNames.map(name => styles[name]).join(' ');
  } else {
    return classNames
      .split(' ')
      .map(name => styles[name])
      .join(' ');
  }
};
