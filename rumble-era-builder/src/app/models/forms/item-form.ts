import {
  alphaNumeric,
  maxLength,
  pattern,
  prop,
  propArray,
  required,
  trim,
} from "@rxweb/reactive-form-validators";
import { PhraseForm } from "./phrase-form";

export class ItemForm {
  @prop()
  @trim()
  @required({ message: "Item name is required." })
  @alphaNumeric({
    allowWhiteSpace: true,
    message: "Item name cannot contain any special characters.",
  })
  @pattern({
    expression: { noSpaces: /^[^\s]+(\s+[^\s]+)*$/ },
    message: "Item name cannot contain spaces at the start or the end.",
  })
  @maxLength({
    value: 30,
    message: "Item name must be shorter than 30 characters.",
  })
  public name = "";

  @required({ message: "Item emoji is required." })
  @pattern({
    expression: {
      discordEmoji:
        /^<(?:a)?:[a-zA-Z0-9_-]{1,30}:[0-9]{1,20}>$|^(\p{Emoji}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji_Modifier_Base}\p{Emoji_Modifier})$/u,
    },
    message: "Invalid format. Must be either <:name:id>, <a:name:id>, or a Unicode emoji.",
  })
  public emoji: string;

  @propArray(PhraseForm)
  public obtainPhrases: PhraseForm[] = [];

  @propArray(PhraseForm)
  public killPhrases: PhraseForm[] = [];
}
