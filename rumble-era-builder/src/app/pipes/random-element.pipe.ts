import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "randomElement"
})
export class RandomElementPipe implements PipeTransform {

  transform(array: unknown[]): unknown | undefined {
    if (array?.length === 0) {
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

}
