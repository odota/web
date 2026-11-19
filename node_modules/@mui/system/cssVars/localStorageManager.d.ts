export interface StorageManager {
  (options: {
    key: string;
    storageWindow?: Window | null;
  }): {
    /**
     * Function to get the value from the storage
     * @param defaultValue The default value to be returned if the key is not found
     * @returns The value from the storage or the default value
     */
    get(defaultValue: any): any;
    /**
     * Function to set the value in the storage
     * @param value The value to be set
     * @returns void
     */
    set(value: any): void;
    /**
     * Function to subscribe to the value of the specified key triggered by external events
     * @param handler The function to be called when the value changes
     * @returns A function to unsubscribe the handler
     * @example
     * React.useEffect(() => {
     *  const unsubscribe = storageManager.subscribe((value) => {
     *    console.log(value);
     *  });
     *  return unsubscribe;
     * }, []);
     */
    subscribe(handler: (value: any) => void): () => void;
  };
}
declare const localStorageManager: StorageManager;
export default localStorageManager;