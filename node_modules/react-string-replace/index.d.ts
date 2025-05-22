declare module 'react-string-replace' {
  function reactStringReplace(
    text?: string | React.ReactNodeArray, 
    regex?: string | RegExp, 
    cb?: (match: string, index: number, offset: number) => React.ReactNode
  ): React.ReactNodeArray;

  export default reactStringReplace;
}
