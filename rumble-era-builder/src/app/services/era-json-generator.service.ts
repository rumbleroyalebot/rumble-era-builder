import { Injectable } from "@angular/core";
import { EraMainForm } from "../models/forms/era-main-form";
import { Color } from "@angular-material-components/color-picker";
import { PhraseForm } from "../models/forms/phrase-form";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];


@Injectable({
  providedIn: "root"
})
export class EraJsonGeneratorService {
  public generateEraJSON(era: EraMainForm): JSONObject {
    const json: JSONObject = {
      name: era.name,
      type: "custom",
      colour: parseInt(era.colour?.toHex(), 16) ?? 0,
      icon: era.icon,
      emoji: era.emoji,
      phrases: {
        loading: this.phraseFormsToJSONArray(era.loadingPhrases),
        default: {
          kill: this.phraseFormsToJSON(era.killPhrases),
          revive: this.phraseFormsToJSON(era.revivePhrases)
        }
      }
    };
    return json;
  }

  public parseJSON(json: string): EraMainForm {
    try {
      const parsed = JSON.parse(json);
      const era = new EraMainForm();
      era.name = parsed.name;
      era.colour = this.createColorFromNumber(parsed.colour);
      era.icon = parsed.icon;
      era.emoji = parsed.emoji;
      era.loadingPhrases = this.JSONtoPhraseForms(parsed.phrases.loading);
      era.killPhrases = this.JSONtoPhraseForms(parsed.phrases.default.kill);
      era.revivePhrases = this.JSONtoPhraseForms(parsed.phrases.default.revive);
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

  private phraseFormsToJSON(phrases: PhraseForm[]): JSONObject {
    const object: JSONObject = {};

    phrases.map(p => p.phrase).forEach((phrase, i) => object[i.toString()] = phrase);

    return object;

  }

  private phraseFormsToJSONArray(phrases: PhraseForm[]): JSONArray {
    const array: JSONArray = [];

    phrases.map(p => p.phrase).forEach((phrase) => array.push(phrase));

    return array;
  }

  private JSONtoPhraseForms(phrases: { [key: string]: string }): PhraseForm[] {
    const forms: PhraseForm[] = [];

    for (const value of Object.values(phrases)) {
      const p = new PhraseForm();
      p.phrase = value;
      forms.push(p);
    }

    return forms;
  }
}
