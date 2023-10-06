import { z } from "zod";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(12);

// user-side
setupForm({
  form: document.querySelector("#login-form"),
  fields: {
    email: emailSchema,
    password: passwordSchema,
  },
  onSubmit(data) {
    console.log("onSubmit", data);
  },
});

// library-side
function setupForm({ form, fields, onSubmit }) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {};
    const errors = {};
    let valid = true;
    Object.keys(fields).forEach((key) => {
      const value = form[key].value;
      const schema = fields[key];
      const result = schema.safeParse(value);
      if (!result.success) {
        valid = false;
        errors[key] = result.error;
      }
      data[key] = value;
    });

    if (valid) {
      onSubmit(data);
    } else {
      console.log("error", errors);
    }
  });
}
