import { maxLength, pattern, prop, propArray, required, trim } from "@rxweb/reactive-form-validators";
import { PhraseForm } from "./phrase-form";

export class ItemForm {
    @prop()
    @trim()
    @required({ message: "Item name is required." })
    @pattern({ expression: { itemName: /^[A-Za-z0-9 ]+$/ } })
    @maxLength({ value: 30, message: "Item name must be shorter than 30 characters." })
    public name = "";

    @required({ message: "Item emoji is required." })
    @pattern({ expression: { discordEmoji: /^<(?:a)?:[a-zA-Z0-9_-]{1,30}:[0-9]{1,20}>$/ }, message: "Invalid Discord emoji format. Must be either <:name:id> or <a:name:id>." })
    public emoji: string;

    @propArray()
    public obtainPhrases: PhraseForm[] = [];

    @propArray()
    public killPhrases: PhraseForm[] = [];
}
