import { prop, required } from "@rxweb/reactive-form-validators";

export class PhraseForm {
    @prop()
    @required({message: "Phrase cannot be empty."})
    phrase = "";
}
