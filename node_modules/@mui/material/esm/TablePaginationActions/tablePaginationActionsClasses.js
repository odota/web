import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getTablePaginationActionsUtilityClass(slot) {
  return generateUtilityClass('MuiTablePaginationActions', slot);
}
const tablePaginationActionsClasses = generateUtilityClasses('MuiTablePaginationActions', ['root']);
export default tablePaginationActionsClasses;