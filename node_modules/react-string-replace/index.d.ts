declare module "react-string-replace" {
  function reactStringReplace(
    text?: string | React.ReactNode[],
    regex?: string | RegExp,
    cb?: (match: string, index: number, offset: number) => React.ReactNode,
    count?: number
  ): React.ReactNode[];

  export default reactStringReplace;
}
