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

export class MassEventForm {
  @prop()
  @trim()
  @required({ message: "Event name is required." })
  @alphaNumeric({
    allowWhiteSpace: true,
    message: "Event name cannot contain any special characters.",
  })
  @maxLength({
    value: 30,
    message: "Event name must be shorter than 30 characters.",
  })
  public name = "";

  @prop()
  @pattern({
    expression: {
      imageLink: /^(https?:\/\/)?(www\.)?[\w.-]+(\/[\w.-]*)*\.(jpg|jpeg|png|webp|gif)$/,
    },
    message: "Link must point to a valid jpg, png, webp or gif image.",
  })
  @maxLength({ value: 120, message: "URL too long." })
  public image = "";

  @propArray(PhraseForm)
  public phrases: PhraseForm[] = [];
}
