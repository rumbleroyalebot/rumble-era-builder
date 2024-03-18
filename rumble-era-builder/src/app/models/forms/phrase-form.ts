import { maxLength, prop, required } from "@rxweb/reactive-form-validators";

export class PhraseForm {
  @prop()
  @required({ message: "Phrase cannot be empty." })
  @maxLength({
    value: 200,
    message: "Phrase cannot be longer than 200 characters.",
  })
  phrase = "";
}
