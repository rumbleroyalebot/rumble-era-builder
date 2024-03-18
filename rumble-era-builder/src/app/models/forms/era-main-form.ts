import {
  alphaNumeric,
  maxLength,
  pattern,
  prop,
  propArray,
  required,
  trim,
} from "@rxweb/reactive-form-validators";
import { ItemForm } from "./item-form";
import { PhraseForm } from "./phrase-form";

export class EraMainForm {
  @prop()
  @trim()
  @required({ message: "Era name is required." })
  @alphaNumeric({
    allowWhiteSpace: true,
    message: "Era name cannot contain any special characters.",
  })
  @pattern({
    expression: { noSpaces: /^[^\s]+(\s+[^\s]+)*$/ },
    message: "Era name cannot contain spaces at the start or the end.",
  })
  @maxLength({
    value: 30,
    message: "Era name must be shorter than 30 characters.",
  })
  public name = "";

  @prop()
  @required({ message: "Era colour is required." })
  public colour: string = "#0077ff";

  @prop()
  // @url({ message: "Icon must be a valid link to an image" })
  @pattern({
    expression: {
      imageLink:
        /^(https?:\/\/)?(www\.)?[\w.-]+(\/[\w.-]*)*\.(jpg|jpeg|png|webp|gif)$/,
    },
    message: "Link must point to a valid jpg, png, webp or gif image.",
  })
  @maxLength({ value: 120, message: "URL too long." })
  public icon = "";

  @prop()
  @required({ message: "Era emoji is required." })
  @pattern({
    expression: {
      discordEmoji:
        /^<(?:a)?:[a-zA-Z0-9_-]{1,30}:[0-9]{1,20}>$|^(\p{Emoji}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji_Modifier_Base}\p{Emoji_Modifier})$/u,
    },
    message:
      "Invalid format. Must be either <:name:id>, <a:name:id>, or a Unicode emoji.",
  })
  public emoji = "";

  @propArray(PhraseForm)
  public loadingPhrases: PhraseForm[] = [];

  @propArray(PhraseForm)
  public killPhrases: PhraseForm[] = [];

  @propArray(PhraseForm)
  public revivePhrases: PhraseForm[] = [];

  @propArray(PhraseForm)
  public deathPhrases: PhraseForm[] = [];

  @propArray(PhraseForm)
  public lifePhrases: PhraseForm[] = [];

  @propArray(ItemForm)
  public items: ItemForm[] = [];
}
