import { Injectable } from "@angular/core";
import { EraMainForm } from "../models/forms/era-main-form";
import { PhraseForm } from "../models/forms/phrase-form";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ItemForm } from "../models/forms/item-form";
import { MassEventForm } from "../models/forms/mass-event-form";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

@Injectable({
  providedIn: "root",
})
export class EraJsonGeneratorService {
  constructor(private readonly httpClient: HttpClient) {}

  public generateEraJSON(era: EraMainForm): JSONObject {
    const items = era.items.map((x) => x.name);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const skins = {} as any;
    era.items.forEach((item) => (skins[item.name] = { normal: item.emoji }));

    const json: JSONObject = {
      name: era.name,
      type: "custom",
      colour: parseInt(era.colour.replace("#", ""), 16) ?? 0,
      icon: era.icon,
      emoji: era.emoji,
      starter_item: items,
      items: items,
      skins: skins,
      phrases: {
        loading: this.phraseFormsToJSONArray(era.loadingPhrases),
        default: {
          kill: this.phraseFormsToJSON(era.killPhrases),
          revive: this.phraseFormsToJSON(era.revivePhrases),
          death: this.phraseFormsToJSON(era.deathPhrases),
          life: this.phraseFormsToJSON(era.lifePhrases),
        },
      },
    };

    era.items.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (json as any).phrases.default[item.name] = this.phraseFormsToJSON(item.killPhrases);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (json as any).phrases.default["get_" + item.name] = this.phraseFormsToJSON(
        item.obtainPhrases,
      );
    });

    if (era.massKill && era.massRevive) {
      json["events"] = {
        mass_kill: {
          available: era.massKill.map((x) => x.name.toLowerCase()),
          phrases: era.massKill.reduce(
            (acc, { name, phrases }) => ({
              ...acc,
              [name.toLowerCase()]: phrases.map((x) => x.phrase),
            }),
            {},
          ),
          images: era.massKill.reduce(
            (acc, { name, image }) => ({ ...acc, [name.toLowerCase()]: image }),
            {},
          ),
        },
        mass_revive: {
          available: era.massRevive.map((x) => x.name.toLowerCase()),
          phrases: era.massRevive.reduce(
            (acc, { name, phrases }) => ({
              ...acc,
              [name.toLowerCase()]: phrases.map((x) => x.phrase),
            }),
            {},
          ),
          images: era.massRevive.reduce(
            (acc, { name, image }) => ({ ...acc, [name.toLowerCase()]: image }),
            {},
          ),
        },
      };
    }

    return json;
  }

  public parseJSON(json: string): EraMainForm | null {
    try {
      const parsed = JSON.parse(json);
      const era = new EraMainForm();
      era.name = parsed.name;
      era.colour = this.createColorStringFromNumber(parsed.colour);
      era.icon = parsed.icon;
      era.emoji = parsed.emoji;
      era.loadingPhrases = this.JSONtoPhraseForms(parsed.phrases.loading);
      era.killPhrases = this.JSONtoPhraseForms(parsed.phrases.default.kill);
      era.revivePhrases = this.JSONtoPhraseForms(parsed.phrases.default.revive);
      era.deathPhrases = this.JSONtoPhraseForms(parsed.phrases.default.death);
      era.lifePhrases = this.JSONtoPhraseForms(parsed.phrases.default.life);
      era.items = [];

      const items = parsed.items;
      const skins = parsed.skins;

      items.forEach((itemName: string) => {
        const item = new ItemForm();
        item.name = itemName;
        item.emoji = skins[itemName].normal;
        item.killPhrases = this.JSONtoPhraseForms(parsed.phrases.default[itemName]);
        item.obtainPhrases = this.JSONtoPhraseForms(parsed.phrases.default["get_" + itemName]);

        era.items.push(item);
      });

      if ("events" in parsed) {
        const massKill = parsed?.events?.mass_kill ?? { available: [] };
        massKill.available.forEach((eventName: string) => {
          const event = new MassEventForm();
          event.name = eventName;
          event.image = massKill.images[eventName];
          event.phrases = massKill.phrases[eventName].map((x: string) => {
            const p = new PhraseForm();
            p.phrase = x;
            return p;
          });
          era.massKill.push(event);
        });

        const massRevive = parsed?.events?.mass_revive ?? { available: [] };
        massRevive.available.forEach((eventName: string) => {
          const event = new MassEventForm();
          event.name = eventName;
          event.image = massRevive.images[eventName];
          event.phrases = massRevive.phrases[eventName].map((x: string) => {
            const p = new PhraseForm();
            p.phrase = x;
            return p;
          });
          era.massRevive.push(event);
        });
      }
      return era;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public loadSampleEra(): Observable<any> {
    return this.httpClient.get<object>("assets/eras/sample.json");
  }

  private createColorStringFromNumber(rgb: number): string {
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  private phraseFormsToJSON(phrases: PhraseForm[]): JSONObject {
    const object: JSONObject = {};

    phrases
      .map((p) => p.phrase)
      .forEach((phrase, i) => (object[i.toString()] = phrase.replace("'", "\u2019")));

    return object;
  }

  private phraseFormsToJSONArray(phrases: PhraseForm[]): JSONArray {
    const array: JSONArray = [];

    phrases.map((p) => p.phrase).forEach((phrase) => array.push(phrase));

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
