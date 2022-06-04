import { defineRule, configure } from "vee-validate";
import { min, email, required } from "@vee-validate/rules";


export default {
    install() {
        function messages (context) {
            return {
                required: `The ${context.field} field is required.`,
                min: `Minimum length of the ${context.field} field is ${context.rule.params[0]}`,
                email: `Enter a valid email.`
            }
        }
        defineRule("required", required);
        defineRule("min", min);
        defineRule("email", email);

        configure({
            generateMessage: context => {
                return messages(context)[context.rule.name];
            }
        });
    }
}
