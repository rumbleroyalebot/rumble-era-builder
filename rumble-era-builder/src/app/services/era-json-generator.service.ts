import { Injectable } from "@angular/core";
import { EraMainForm } from "../models/forms/era-main.form";
import { Color } from "@angular-material-components/color-picker";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];


@Injectable({
  providedIn: "root"
})
export class EraJsonGeneratorService {
  public generateEraJSON(era: EraMainForm): JSONObject {
    console.log(era);
    const json: JSONObject = {
      name: era.name,
      type: "custom",
      colour: parseInt(era.colour?.toHex(), 16) ?? 0,
    };
    return json;
  }

  public parseJSON(json: string): EraMainForm {
    try {
      const parsed = JSON.parse(json);
      const era = new EraMainForm();
      era.name = parsed.name;
      era.colour = this.createColorFromNumber(parsed.colour);
      return era;
    } catch (e) {
      return new EraMainForm();
    }
  }

  private createColorFromNumber(rgb: number): Color {
    // Extract the red, green, and blue components using bitwise operations
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
  
    // Create and return a new Color object
    return new Color(r, g, b);
  }
}
