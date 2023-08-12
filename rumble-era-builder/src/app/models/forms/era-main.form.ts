import { Color } from "@angular-material-components/color-picker";
import { alphaNumeric, maxLength, prop, required, trim } from "@rxweb/reactive-form-validators";

export class EraMainForm {
    @prop()
    @trim()
    @required({ message: "Era name is required" })
    @alphaNumeric({ message: "Era name cannot contain any special characters" })
    @maxLength({ value: 30, message: "Era name must be shorter than 30 characters" })
    public name = "";

    @prop()
    @required({ message: "Era colour is required" })
    public colour: Color = new Color(0, 119, 255);

    @prop()
    public icon = "";

    @prop()
    public emoji = "";
}
