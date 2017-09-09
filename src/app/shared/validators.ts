import { FormControl } from '@angular/forms';

export function validDate(control: FormControl): any {
  const parsedDate = Date.parse(control.value);
  return !isNaN(parsedDate);
}
