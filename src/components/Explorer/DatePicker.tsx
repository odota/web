import React, { useEffect, useRef } from "react";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import { TextField } from '@mui/material';
import localeEn from 'air-datepicker/locale/en';

export function DatePicker(props: { id: string, label: string, value: string[], onChange: ({ date, formattedDate, datepicker }: { date: Date | Date[] | undefined; formattedDate?: string | string[]; datepicker?: AirDatepicker<HTMLDivElement>; }) => void }) {
  let dp = useRef<AirDatepicker<HTMLDivElement>>();

  const getProps = () => ({ startDate: props.value?.[0], onSelect: props.onChange, locale: localeEn });
  
  // Start init
  useEffect(() => {
    // Save instance for the further update
    dp.current = new AirDatepicker('#' + props.id, getProps());
  }, []);

  useEffect(() => {
    // Update if props are changed
    // dp.current?.update(getProps());
  }, [props]);

  return <TextField size="small" sx={{ width: '250px' }} onChange={(e) => props.onChange({ date: undefined })} id={props.id} label={props.label} value={props.value?.[0] || ''} />;
}

export default DatePicker;
