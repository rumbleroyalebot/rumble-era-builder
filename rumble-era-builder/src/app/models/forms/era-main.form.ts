import { Color } from "@angular-material-components/color-picker";
import { maxLength, prop, required } from "@rxweb/reactive-form-validators";

export class EraMainForm {
    @prop()
    @required({ message: "Era name is required" })
    @maxLength({ value: 30, message: "Era name must be shorter than 30 characters" })
    public name = "";

    @prop()
    private type = "custom";

    @prop()
    public colour: Color = new Color(0, 120, 255);

    @prop()
    public icon = "";

    @prop()
    public emoji = "";
}
